import io from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";


import {
  receiveMessage,
  sentMessage,
  getExperts,
  onReadMsg,
  reactDisplay,
  messageDeleted,
  updateMessage,
  startTyping,
  stopTyping,
  pinMessage,
  unpinMessage,
  userDisconnection,
  userConnection,
  reactHide,
  updateUserBalance,
  guestCreated,
  getTotalBalance,
  ableInputArea,
  sendFirstMessage,
  sendBuyMessage,
  submitFormStatus,
  removeExpert,
  getAllConversations,
  displayExpert,

} from "../main.js";
let messagesContainer = document.getElementById("big-container-message");
const loader = document.querySelector(".app-preloader1");

export let role = ""
export default class event {
  constructor() {

    this.socket = io("ws://192.168.1.23:3000", {
      transports: ['websocket']
    });
  }
  // In the onConnected function:
  // In the index.html page:
  // Retrieve the newData value from localStorage


  /**
   * on connect
   */

  //receive a connect  event from the socket 

  connect = (userId, contact) => {
    this.socket.on("connect", () => {
      this.socket.emit("user-connected", {
        app_id: "638dc76312488c6bf67e8fc0",
        user: contact,
        contact: contact,
        action: "user-connected",
        metaData: {
          app_id: "638dc76312488c6bf67e8fc0",
          api_token: "123456789123456",
          user_id: userId
        },
        "device": {
          "ip": "123.213.121",
          "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          "platform": navigator.platform,
          "userAgent": navigator.userAgent
        }
      });
    });
  }
  onConnected = function () {
    this.socket.on("onConnected", (userData, balance) => {
      console.log("new data connection ", userData, balance);
      role = userData.status == 0 ? "GUEST" : "CLIENT";
      const usernameLink = document.getElementById("usernameLink");
      if (usernameLink) {
        usernameLink.textContent = userData.full_name;
      }
        getAllConversations()
        getTotalBalance(balance);

      loader.style.display = "none";
    });
  };


  //receive user connection (other user)

  userConnection = () => {
    this.socket.on("user-connection", (user) => {
        if (user?.role === "AGENT") {
          console.log("ai'nt here",user)
          displayExpert(user)
        }
        userConnection(user)
    })
  }

  onDisconnected = () => {
    this.socket.on("onDisconnected", (reason,user) => {
      if(user?.role==="AGENT"){
         removeExpert(user._id)
      }
      userDisconnection(user.socketId)
    })
  }
  


  /**
   * on disconnect
   */
  disconnect = (data) => {
    this.socket.emit('onDisconnect', data, error => {
      if (error) {
        setError(error)
      }
    })
  }


  /**
   * on reconnect
   */
  reconnect = (data) => {
    this.socket.io.on("reconnect", () => {
      console.log("socket reconnected", data)
    });
  }
  onReconnected = () => {
    this.socket.on("onReconnected", (data, error) => {
      console.log("recon")
    })
  }


  /**
   * create room 
   */
  createRoom = (data) => {
    this.socket.emit("joinRoom", data, error => {
      if (error) {
        setError(error)
      }
    })
  }

  /**
   *                                        Conversation Events
   */

  /**
   * 
   *  create conversation 
   */
  createConversation = (data) => {
    this.socket.emit('onConversationStart', data, error => {
      console.log("onConversationStart", data)
    })
  }

  onConversationStart = () => {
    return new Promise((resolve, reject) => {
      this.socket.on("onConversationStarted", (conversationId, guest) => {
        resolve(conversationId)
        if (!guest) {
          sendFirstMessage(conversationId)
        }

      })
    })
  }


  /**
   * 
   * update conversation 
   */

  updateConversation = (data) => {
    this.socket.emit('onConversationUpdated', data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationUpdated = (data) => {
    this.socket.on("onConversationUpdated", async (data, newData) => {

    })
  }

  conversationStatusUpdated = (data) => {
    this.socket.on("conversationStatusUpdated",  (data, status) => {
      let parentDiv = $('[data-conversation-id="' + data._id + '"]');

      let activeUser = parentDiv.find('#active-user')[0];
      if(status==1){
      activeUser.classList.remove("bg-slate-300");  
      activeUser.classList.add("bg-success");

      this.socket.emit("joinRoom", data._id)
   
      }else {
        activeUser.classList.remove("bg-success");

        activeUser.classList.add("bg-slate-300");

      }
    })
  }

  /**
   *  delete Conversation  
   */

  deleteConversation = (data) => {
    this.socket.emit('onConversationDeleted', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  onConversationDeleted = (data) => {
    this.socket.on("onConversationDeleted", (newData) => {
      console.log(newData)
    })
  }

  /**
   * end conversation 
   */
  conversationEnd = (data) => {
    this.socket.emit('onConversationEnd', data, error => {

      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation ended");
      console.log('====================================');
    })
  }
  onConversationEnd = (data) => {
    this.socket.on("onConversationEnd", (newData) => {
      console.log(newData)
    })
  }

  /**
   *                       Conversation Members
   */


  /***
   * add member to a conversation 
   */
  joinMembers = () => {
    //data=conversationId
    this.socket.on('joinConversationMember', (conversationId, error) => {
      this.socket.emit("onConversationMemberJoined", conversationId)

    })
  }
  updateConversation = () => {
    //data=conversationId
    this.socket.on('joinConversationMember', (conversationId, error) => {
      this.socket.emit("onConversationMemberJoined", conversationId)

    })
  }



  buyPlan = (data) => {
    this.socket.emit('buyPlan', data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onBalanceStat = () => {
    this.socket.on('updatedBalance', (data, error) => {
      console.log("updated balance", data)
      // updateUserBalance(data)
    })
  }

  // onConversationMemberJoined = () => {
  //   this.socket.on("JoinConversationMember", (socket_id, info, conversationId) => {
  //     console.log("conversation member join request sent ")
  //     this.socket.emit("onConversationMemberJoined", socket_id, info, conversationId)
  //   })
  // }
planBought = () => {
  this.socket.on('planBought', (data, newBalance) => {
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
      <div class="modal-bought" id="modal-bought">
        <div class="modal-content bg-light-gray">
          <h2 class="modal-title">Congratulations</h2>
          <p class="modal-text">You bought ${data.balance} messages.<br>Your new balance: <i>${newBalance}</i></p>
          <button class="modal-button bg-soft-color" id="confirmButton">Confirm</button>
        </div>
      </div>
    `;
    role = "CLIENT";

    // Hide the modal when the Confirm button is pressed
    const confirmButton = modalDiv.querySelector("#confirmButton");
    confirmButton.addEventListener("click", () => {
      modalDiv.style.display = "none";
    });

    document.body.appendChild(modalDiv);
    getTotalBalance(newBalance);
    ableInputArea();
    console.log("Data balance: ", data, newBalance);
  });
};

  
  
  
  
  joinedDone = () => {
    this.socket.on('memberJoinedDone', (data) => {})
  }

  createMembers = (data) => {
    this.socket.emit('onConversationMemberCreate', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log(" member created into the conversation ");
      console.log('====================================')
    })
  }
  onConversationMemberCreated = (data) => {
    this.socket.on("onConversationMemberCreated", (data) => {
      console.log(data)
    })
  }

  /**
   *  request member to join a  conversation 
   */
  //data:conversation_id/user_id
  conversationMemberRequest = (data) => {
    this.socket.emit('onConversationMemberRequest', data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationMemberRequest = () => {
    this.socket.on("onConversationMemberRequest", (data, error) => {
      console.log("onConversationMemberRequest", data)
    })
  }

  /**
   * update member in a conversation 
   */
  updateMember = (data) => {
    this.socket.emit('onConversationMemberUpdated', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  onMemberUpdated = (data) => {
    this.socket.on("onMemberUpdated", () => {

    })
  }

  /**
   * delete member in a conversation 
   */
  deleteMembers = (data) => {
    this.socket.emit('onConversationMemberDeleted', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  onMemberDeleted = (data) => {
    this.socket.on("onMemberDeleted", () => {

    })
  }


  /**
   * conversation member left
   */
  conversationMemberLeft = (data) => {
    this.socket.emit('conversationMemberLeft', data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationMemberLeft = () => {
    this.socket.on("onConversationMemberLeft", data => {
      console.log("member left the conversation ", data)
    })
  }

  /**  
   * conversation ban member
   */
  conversationMemberBan = (data) => {
    this.socket.emit("conversationMemberBan", data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationMemberBanned = (data) => {
    this.socket.on("onConversationMemberBanned", () => {

    })
  }

  /**
   * 
   * conversation member unBan  
   */
  conversationMemberUnBan = (data) => {
    this.socket.emit("conversationMemberUnBan", data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationMemberUnbanned = (data) => {
    this.socket.on("onConversationMemberUnbanned", () => {

    })
  }


  /**
   * 
   *                                    Message Events              

  /**
   *  send  message 
   */
  onCreateMessage = (data) => {

    this.socket.emit('onMessageCreated', data, error => {

      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("message created");
      console.log('====================================');
    })

  }
  onCreateForm = (data) => {
    this.socket.emit('onMessageFormCreated', data, error => {

      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("message Form  created");
      console.log('====================================');
    })
  }


  onMessageSent = async () => {
    await this.socket.on('onMessageSent', async (data, online, error) => {
      await sentMessage(data)
      if(data?.type==="MSG" ){
        updateUserBalance()

      }
    })
  }

  receiveMessage = async () => {
    const leftConversationContainer = document.getElementById('left-conversation');
    await this.socket.on('onMessageReceived', async (data, error) => {
      
      const msgDiv = document.getElementById(`left-conversation-${data.messageData.conversation}`);
      if (msgDiv) {
        const msgText = msgDiv.querySelector("p#last-message")
        if (data.messageData.type === "log") {
          // const log = JSON.parse(data.messageData.content)
          // let userLog = ""
          // switch (log.action) {
          //   case "fill":
          //     userLog = `${data.senderName} filled on the form.`;
          //     break;
          //   case "focus":
          //     userLog = `${data.senderName}  focus on the form.`;
          //     break;
          //   case "purchase":
          //     userLog = `${data.senderName}  purchased the <b> ${log.plan_name} </b>plan.`;
          //     break;
          //   case "start form":
          //     userLog = `${data.senderName}  start submit the form.`;
          //     break;
          //   case "end form":
          //     userLog = `${data.senderName}  end submit the form.`;
          //     break;
          //   case "start purchase":
          //     userLog = `${data.senderName}  start purchase a plan.`;
          //     break;
          //   case "link click":
          //     userLog = `${data.senderName} click to link.`;
          //     break;
          //   default:
          //     userLog = `hello`;
          //     break;
          // }
          // msgText.textContent = userLog
          console.log("here")
        } else
          msgText.textContent = data.messageData.type === "plan" ? data.senderName + " sent a plan" : data.messageData.type === "form" ? data.senderName + " sent a form" : data.messageData.type === "link" ? data.senderName + " sent a link" : data.messageData.content
        leftConversationContainer.insertBefore(msgDiv, leftConversationContainer.firstChild)

      }


      // Check if the message was sent by the current user
      receiveMessage(data)
    })
  }




  onMessageDelivered = () => {
    this.socket.on('onMessageDelivered', (data, error) => {


      console.log("message Delivered : ", data)
    })
  }

  onMessageDelivered = () => {
    this.socket.on('onMessageDelivered', (data, error) => {


      console.log("message Delivered : ", data)
    })
  }

  /**
   * update message
   */

  updateMessage = (data) => {
    this.socket.emit('updateMessage', data, error => {})
  }

  onMessageUpdated = (data) => {
    this.socket.on('onMessageUpdated', (data, error) => {
      updateMessage(data)
    })
  }
  /**
   * 
   *  delete message 
   */

  deleteMessage = (data) => {
    this.socket.emit('onMessageDeleted', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }

  onMessageDeleted = () => {
    this.socket.on('onMessageDeleted', (data, error) => {
      messageDeleted(data)
    })
  }

  /**
   * mark message as read 
   *   */
  markMessageAsRead = (data) => {
    this.socket.emit('onMessageRead', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  onMessageRead = () => {
    this.socket.on('onMessageRead', (data, error) => {
      console.log("message read",data)
      onReadMsg()


    })
  }
  /**
   * 
   * Start typing event  
   */
  startTyping = (data) => {
    this.socket.emit('onTypingStart', data, error => {})
  }
  onTypingStarted = (data) => {
    this.socket.on('onTypingStarted', (data, error) => {
      startTyping(data)
    })
  }

  /**
   * 
   * stop typing event  
   */

  stopTyping = (data) => {
    this.socket.emit('onTypingStop', data, error => {

    })
  }


  onTypingStopped = (data) => {
    this.socket.on('onTypingStopped', (data, error) => {
      stopTyping(data)

    })
  }



  /**
   * pin message event
   */
  pinMsg = (data) => {
    this.socket.emit('pinMsg', data, (error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onPinnedMsg = (data) => {
    this.socket.on('onMsgPinned', (data, error) => {
      pinMessage(data)
    })
  }

  /**
   * unPin message event 
   */
  unPinMsg = (data) => {
    this.socket.emit('unPinMsg', data, (error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onUnPinnedMsg = () => {
    this.socket.on('onMsgUnPinned', (data, error) => {
      unpinMessage(data)
    })
  }

  /**
   * react message event 
   */

  reactMsg = (data) => {
    this.socket.emit('reactMsg', data, (error) => {
      if (error) {
        setError(error)
      }
    })
  }

  onReactMsg = () => {
    this.socket.on('onMsgReacted', (data, error) => {
      console.log("data react",data)
      reactDisplay(data)
    })
  }


  /**
   * unReact message event 
   */
  unReactMsg = (data) => {
    this.socket.emit('unReactMsg', data, (error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onUnReactMsg = () => {
    this.socket.on('onUnReactMsg', (data, error) => {
      reactHide(data)
    })
  }

  /**
   * mention request event 
   */
  mentionRequest = (data) => {
    this.socket.emit('requestMention', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMentionRequest = (data) => {
    this.socket.on('requestMention', (data, error) => {

    })
  }
  /**
   * delete mention event
   */
  mentionDelete = (data) => {
    this.socket.emit('mentionDelete', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMentionDelete = (data) => {
    this.socket.on('mentionDelete', (data, error) => {
      console.log(data)
    })
  }

  /**
   * receive mention event
   */
  mentionReceive = (data) => {
    this.socket.emit('mentionReceive', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMentionReceive = (data) => {
    this.socket.on('onMentionReceive', (data, error) => {
      console.log(data)
    })
  }



  /**
   * forward a message
   */
  forwardMessage = (data) => {
    this.socket.emit('forwardMessage', data, error => {

    })
  }
  onMessageForwarded = () => {
    this.socket.on('onMessageForwarded', (data, error) => {

    })
  }
  /**
   * delete media event 
   */
  deleteMedia = (data) => {
    this.socket.emit('deleteMedia', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMediaDelete = (data) => {
    this.socket.on('deletedMedia', (data, error) => {
      console.log(data)
    })
  }
  /**
   * receive media event 
   */
  receiveMedia = (data) => {
    this.socket.emit('receiveMedia', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMediaReceive = (data) => {
    this.socket.on('receivedMedia', (data, error) => {
      console.log(data)
    })
  }
  /**
   * create media event 
   */
  createMedia = (data) => {
    this.socket.emit('createMedia', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMediaCreated = (data) => {
    this.socket.on('createdMedia', (data, error) => {
      console.log(data)
    })
  }

  /**
   * reject transfer conversation 
   */
  conversationTransferReject = (data) => {
    this.socket.emit('rejectCnvTransfer', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationTransferReject = (data) => {
    this.socket.on('onRejectCnvTransfer', (data, error) => {
      console.log(data)
    })
  }





  /**
   * accept transfer conversation 
   */
  conversationTransferAccept = (data) => {
    this.socket.emit('transferConversation', data, error => {

    })
  }
  onConversationTransferAccept = async () => {
    await this.socket.on('onConversationTransferAccept', (conversationId, error) => {
      console.log("conversation Transfer", conversationId)
      this.socket.emit('onConversationTransferAccepted', conversationId)
    })
  }

  onConversationTransferAcceptedJoined = async () => {
    await this.socket.on('onConversationTransferAcceptedJoined', (user_id, socket_id, error) => {
      console.log(user_id, "joined to the conversation", socket_id)
    })
  }




  /**
   * 
   * conversation transfer request 
   */
  conversationTransferRequest = (data) => {
    this.socket.emit('requestCnvTransfer', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationTransferRequest = (data) => {
    this.socket.on('onRequestCnvTransfer', (data, error) => {
      console.log(data)
    })
  }

  /**
   * conversation member list 
   */
  conversationMembersList = (data) => {
    this.socket.emit('cnvMemberList', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationMembersList = (data) => {
    this.socket.on('onCnvMemberList', (data, error) => {
      console.log(data)
    })
  }
  /**
   *                  user Events
   */

  /**
   * 
   * login user  
   */
  loginUser = (data) => {

    this.socket.emit('onUserLogin', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("user login successfully ");
      console.log('====================================');
    })
  }
  onUserLogin = (data) => {
    this.socket.on('onUserLogin', (data, error) => {

    })
  }

  /**
   * log out user
   **/

  logoutUser = (data) => {
    this.socket.emit('onUserLogOut', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("user logout");
      console.log('====================================');
    })
  }
  onUserLogOut = (data) => {
    this.socket.on('onUserLogOut', (data, error) => {

    })
  }


  createGuestAccount = (data) => {
    this.socket.emit('createGuest', data, error => {

    })
  }

  onGuestCreated = (data) => {
    this.socket.on('guestCreated', (data) => {
      role="GUEST"
      guestCreated(data)
      this.socket.emit("user-connected", {
        app_id: "1",
        user: data.contact,
        contact: data.contact,
        action: "user-connected",
        metaData: {
          app_id: "638dc76312488c6bf67e8fc0",
          api_token: "123456789123456",
          user_id: data.user
        },
        "device": {
          "ip": "123.213.121",
          "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          "platform": navigator.platform,
          "userAgent": navigator.userAgent
        }
      });
      loader.style.display = "none";
       getTotalBalance()
    })
  }


  saveFormData = (data) => {
    this.socket.emit('saveForm', data, error => {

    })
  }

  savedFormData = () => {
    this.socket.on('formSaved', (bool) => {
      const formContainer = document.querySelector('.form-container');
      const statusMessage = document.createElement('p');
      statusMessage.classList.add('status-message');
      formContainer.appendChild(statusMessage);
      statusMessage.textContent = "saving form data went wrong,Try again";
      if (bool) {
        
        formContainer.classList.add('f-success');
        formContainer.classList.remove('f-error');
        // Update the status message for success
        statusMessage.textContent = "Form saved successfully";
        statusMessage.style.color = "#22A699";
        // Open modal for success submit form
        submitFormStatus("1");
      } else {
        formContainer.classList.add('f-error');
        formContainer.classList.remove('f-success');
        // Update the status message for failure

        statusMessage.textContent = "saving form data went wrong,Try again";
        statusMessage.style.color = "#F24C3D";
        // Open modal for fail submit form
        submitFormStatus();
      }
    });
  };
  
  


  updateBalance = (data) => {
    console.log("data", data)
    this.socket.emit('updateTotalBalance', data, (error) => {

    });
  };

  linkClick=(data)=>{
    this.socket.emit('linkClick',data,(error)=>{

    })
  }
  linkClicked = () => {
    this.socket.on('linkClicked', (data, error) => {
      const msg = messagesContainer.querySelector(`#message-content-${data._id}`);
      if (msg) {
        const eyeIcon = document.createElement('i');
        eyeIcon.className = 'fas fa-eye text-blue-500 ml-1';
        msg.appendChild(eyeIcon);
      }
    });
  };
  
// The failGuest function
failGuest = () => {
  this.socket.on('createGuestFailed', (data) => {
    console.log("failed creating guest", data);
    loader.style.display = "none";


    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const alertText = document.createElement('p');
    alertText.classList.add('alert-text');
    alertText.textContent = 'fail creating guest,Press reload to try again ';

    const reloadButton = document.createElement('button');
    reloadButton.classList.add('reload-button');
    reloadButton.textContent = 'Reload';

    reloadButton.addEventListener('click', () => {
      location.reload(); 
    });

    // Assemble the modal content
    modalContent.appendChild(alertText);
    modalContent.appendChild(reloadButton);

    // Assemble the modal overlay
    modalOverlay.appendChild(modalContent);

    // Append the modal overlay to the body
    document.body.appendChild(modalOverlay);
  });
}
// JavaScript
conversationStatusUpdated = () => {
  this.socket.on('conversationStatusUpdated', (conversation, status) => {
    const fullConversationContainers = document.querySelectorAll(`[data-conversation-id="${conversation._id}"]`)
        //select the given conversation and change it names 
        const agentFullNames = conversation.member_details
        .filter((member) => member.role === 'AGENT' || member.role==='BOT')
        .map((agent) => agent.full_name);


    fullConversationContainers.forEach((container) => {
      const activeUserDiv = container.querySelector('#active-user');
      // activeUserDiv.classList.remove('bg-slate-300', 'bg-success');
      if (status === 0) {
        activeUserDiv?.classList?.add('bg-slate-300');
      } else if (status === 1) {
        activeUserDiv?.classList?.add('bg-success');
      }
    });
    const minimizedConversationContainer = document.getElementById(`left-mini-conversation-${conversation._id}`);
    if (minimizedConversationContainer) {
      minimizedConversationContainer.dataset.name = agentFullNames;
      const activeUserDiv = minimizedConversationContainer.querySelector('#active-user');
      activeUserDiv.classList.remove('bg-slate-300', 'bg-success');
      if (status === 0) {
        activeUserDiv?.classList?.add('bg-slate-300');
      } else if (status === 1) {
        activeUserDiv?.classList?.add('bg-success');
      }
    }
  });
};

}