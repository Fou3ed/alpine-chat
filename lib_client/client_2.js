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

} from "../main.js";
let messagesContainer = document.getElementById("big-container-message");
const loader = document.querySelector(".app-preloader1");

export let role=""
export default class event {
  constructor() {

   this.socket = io("ws://192.168.1.16:3000", {
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

  connect = (userId,contact) => {
    this.socket.on("connect", () => {
      this.socket.emit("user-connected", {
        app_id: "638dc76312488c6bf67e8fc0",
        user: contact,
        contact:contact,
        action: "user-connected",
        metaData: {
          app_id: "638dc76312488c6bf67e8fc0",
          api_token: "123456789123456",
          user_id:userId
          
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
  onConnected = function() {
  console.log(loader)
    this.socket.on("onConnected", (userData, balance) => {
      console.log("new data connection ", userData, balance);
      role = userData.status == 0 ? "GUEST" : "CLIENT";
      const usernameLink = document.getElementById("usernameLink");
      if (usernameLink) {
        usernameLink.textContent = userData.full_name;
      }
      if (balance) {
        getTotalBalance(balance);
      } else {
        alert("error");
      }
  
       loader.style.display = "none"; 
    });
  };
  




  //receive user connection (other user)

  userConnection = () => {
    this.socket.on("user-connection", (user) => {
      if(user?.role==="AGENT"){
        const html = `
        <div id="${user._id}" data-name="${user.full_name}" class="swiper-slide flex w-13 shrink-0 flex-col items-center justify-center">
          <div class="h-13 w-13 p-0.5">
            <img class="h-full w-full dark:border-slate-700 mask is-squircle" src="images/avatar/unkown.jpg" alt="avatar"/>
          </div>
          <p class="mt-1 w-14 break-words text-center text-xs text-slate-600 line-clamp-1 dark:text-navy-100">${user.full_name}</p>
        </div>`;
      $(".swiper-wrapper").append(html);
      


      }
 
      userConnection(user)
    })
  }


  onDisconnected = () => {
    this.socket.on("onDisconnected", (reason, socket_id) => {
      console.log("userDiscon",socket_id)
      getExperts()
      userDisconnection(socket_id)
    })
  }
d


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
      this.socket.on("onConversationStarted", (conversationId,guest) => {
        resolve(conversationId)
        if(!guest){
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
    this.socket.on("conversationStatusUpdated", async (data, newData) => {
        this.socket.emit("joinConversationRoom",data._id)
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
      console.log("updated balance",data)
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
    this.socket.on('planBought',(data,error)=>{
      const newDivMsg = document.createElement("div");
      newDivMsg.innerHTML = ` <div
      class="flex justify-center items-center w-100 m-2"
      id="msg-${data._id}"
      >
      <span class="logs-notification">
      You bought a plan
      </span>
      </div>`
      let typingBlock = document.getElementById("typing-block-message");
      messagesContainer.insertBefore(newDivMsg, typingBlock);
      getTotalBalance(data.Total_balance[0])
      ableInputArea()
      role="CLIENT"
       sendBuyMessage(data)
    })
  }
  
  joinedDone = () => {
    this.socket.on('memberJoinedDone', (data) => {
      console.log("last station", data)
    })
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
  onCreateForm=(data)=>{
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
      console.log("message sent ")
        await sentMessage(data)
        updateUserBalance()
  })
  }

  receiveMessage = async () => {
    const leftConversationContainer = document.getElementById('left-conversation');
    await this.socket.on('onMessageReceived', async (data, error) => {
      const msgDiv = document.getElementById(`left-conversation-${data.messageData.conversation}`);
      if (msgDiv) {
        const msgText = msgDiv.querySelector("p#last-message")
        if (data.messageData.type === "log") {
          const log = JSON.parse(data.messageData.content)
          let userLog = ""
          switch (log.action) {
            case "fill":
              userLog = `${data.senderName} filled on the form.`;
              break;
            case "focus":
              userLog = `${data.senderName}  focus on the form.`;
              break;
            case "purchase":
              userLog = `${data.senderName}  purchased the <b> ${log.plan_name} </b>plan.`;
              break;
            case "start form":
              userLog = `${data.senderName}  start submit the form.`;
              break;
            case "end form":
              userLog = `${data.senderName}  end submit the form.`;
              break;
            case "start purchase":
              userLog = `${data.senderName}  start purchase a plan.`;
              break;
            case "link click":
              userLog = `${data.senderName} click to link.`;
              break;
            default:
              userLog = `hello`;
              break;
          }
          msgText.textContent = userLog
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
    this.socket.emit('updateMessage', data, error => {
    })
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

      console.log('Message deleted:', data)
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
      onReadMsg()


    })
  }
  /**
   * 
   * Start typing event  
   */
  startTyping = (data) => {
    this.socket.emit('onTypingStart', data, error => {
    })
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
      console.log("onTypingStopped")
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


  createGuestAccount=(data)=>{
this.socket.emit('createGuest',data,error=>{

})
  }

onGuestCreated=(data)=>{
  this.socket.on('guestCreated',(data)=>{

    guestCreated(data)  
    loader.style.display = "none"; 

  })
}
saveFormData=(data)=>{
  this.socket.emit('saveForm',data,error=>{
  
  })
    }

    updateBalance = (data) => {
      console.log("data",data)
      this.socket.emit('updateTotalBalance', data, (error) => {
       
      });
    };
}
