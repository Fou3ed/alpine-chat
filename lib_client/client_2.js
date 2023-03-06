import io from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";

const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
const messagesContainer = document.getElementById("big-container-message")
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-message'); 
const butt=`<div x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex mt-2">
            <button x-ref="popperRef" @click="isShowPopper = !isShowPopper" class="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                </path>
              </svg>
            </button>       
            <div x-ref="popperRoot" class="popper-root" :class="isShowPopper &amp;&amp; 'show'" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-594px, 231px);" data-popper-placement="bottom-end">
              <div class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                <ul>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Edit</a>
                  </li>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Forward</a>
                  </li>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Copy</a>
                  </li>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Reply</a>
                  </li>
                </ul>
                <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                <ul>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>`




export default class event {

  constructor() {

    this.socket = io("ws://localhost:3000", {
      transports: ['websocket']
    });
  }
// In the onConnected function:

// In the index.html page:
// Retrieve the newData value from localStorage

  
  /**
   * on connect
   */
  connect = (data) => {
    this.socket.emit('onConnect', data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  
  onConnected = function() {
      this.socket.on("onConnected", (info,newData,data) => {
        if (newData) {   
          const concatenated = { ...info,...newData,...data };

          console.log(newData);
          // Store the newData value in localStorage
          localStorage.setItem('newData', JSON.stringify(concatenated));
          window.location.href = "./index.html";
        } else {
          alert("error");
        }
      });
  };

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

  onDisconnected = () => {
    this.socket.on("onDisconnected", (data) => {
      console.log(data)
    })
  }

  /**
   * on reconnect
   */
  reconnect = (data) => {
    this.socket.emit('onReconnect', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onReconnected = () => {
    this.socket.on("onReconnected", (data, error) => {
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
      if (error) {
        setError(error)
      }

    })
  }
  onConversationStart = () => {
    return new Promise((resolve,reject)=>{
      this.socket.on("onConversationStarted", (data, newData) => {
        console.log(data,newData)
       resolve(newData)
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
    this.socket.on("onConversationUpdated", (data, newData) => {
      console.log(data, newData)
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
  addMembers = (data) => {
    console.log(data)
    this.socket.emit('onConversationMemberJoin', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log(" member joined into the conversation ");
      console.log('====================================');
    })
  }
  onConversationMemberJoined = (data) => {
    this.socket.on("onConversationMemberJoined", (data) => {
        console.log(data)
    })
  }

  /**
   * update member in a conversation 
   *  
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
   *  request member to join a  conversation 
   */

  conversationMemberRequest = (data) => {
    this.socket.emit('conversationMemberRequest', data, error => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationMemberRequest = (data) => {
    this.socket.on("onConversationMemberRequest", () => {})
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
  onConversationMemberLeft = (data) => {
    this.socket.on("onConversationMemberLeft", () => {

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
   */

  /**
     *  send  message 
    */
  createMessage = (data) => {

    this.socket.emit('onMessageCreated', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
    
  }
  
  onMessageDelivered = () => {
    this.socket.on('onMessageDelivered', (data, error) => {
        console.log("message delivered : ",data)
        const messageId = data.id; 
        const messageContainer = document.getElementById(`message-${messageId}`);
        if (!messageContainer) {
           let direction = data.direction =="in" ?'justify-end' : '';
           const msgStyle=data.direction =="out" ? `rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100`:'rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white'
          messagesContainer.insertAdjacentHTML("beforeend", `
            <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
            <div class="flex flex-col items-end space-y-3.5">
            <div class="flex flex-row">
            ${data.direction =="in" ? butt :'' }
              <div class="ml-2 max-w-lg sm:ml-5">
                <div class="${msgStyle}">
                  ${data.content}
                </div>
                <p  id="date_msg" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
                      ${timeString}      
                </p>
              </div>
            ${data.direction =="out" ? butt :''}
            </div>
            <div class="flex flex-row">
                </div>
              </div>
            </div>
          </div>
            </div>
          `);
        }
    })
  
  }



onMessageReceived = () => {
  this.socket.on('onMessageReceived', (data, error) => {
    console.log("message received : ",data)
    const messageId = data.id; 
    const messageContainer = document.getElementById(`message-${messageId}`);
    if (!messageContainer) {
       let direction = data.direction =="in" ?'justify-end' : '';
       const msgStyle=data.direction =="out" ? `rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100`:'rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white'
      messagesContainer.insertAdjacentHTML("beforeend", `
        <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
        <div class="flex flex-col items-end space-y-3.5">
        <div class="flex flex-row">
        ${data.direction =="in" ? butt :'' }
          <div class="ml-2 max-w-lg sm:ml-5">
            <div class="${msgStyle}">
              ${data.content}
            </div>
            <p  id="date_msg" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
                  ${timeString}      
            </p>
          </div>
        ${data.direction =="out" ? butt :''}
        </div>
        <div class="flex flex-row">
            </div>
          </div>
        </div>
      </div>
        </div>
      `);
    }
  });
};












  
  /**
   * 
   * update message
   */

  updateMessage = (data) => {
    this.socket.emit('onMessageUpdated', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  onMessageUpdated = (data) => {

    this.socket.on('onMessageUpdated', (data, error) => {
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
  onMessageDeleted = (data) => {
    this.socket.on('onMessageDeleted', (data, error) => {

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
  onMessageRead = (data) => {
    this.socket.on('onMessageRead', (data, error) => {})
  }
  /**
   * 
   * Start typing event  
   */
  startTyping = (data) => {
    this.socket.emit('onTypingStarted', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  onTypingStarted = (data) => {
    this.socket.on('onTypingStarted', (data, error) => {
      console.log(data)
    })
  }
  /**
   * 
   * stop typing event  
   */

  stopTyping = (data) => {
    this.socket.emit('onTypingStopped', data, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }


  onTypingStopped = (data) => {
    this.socket.on('onTypingStopped', (data, error) => {

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
    this.socket.on('onMsgPinned',(data, error) => {
      console.log(data)
    })
  }

  /**
   * unPin message event 
   */
  unPinMsg = (data) => {
    this.socket.emit('unPinMsg', data,(error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onUnPinnedMsg = (data) => {
    this.socket.on('onMsgUnPinned', (data, error) => {
      console.log(data)
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
    this.socket.on('onMsgReacted',(data,error) => {
      console.log("reacted",data)
    })
  }


  /**
   * unReact message event 
   */
  unReactMsg = (data) => {
    this.socket.emit('unReactMsg', data,(error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onUnReactMsg = (data) => {
    this.socket.on('onUnReactMsg', (data, error) => {
      console.log(data)
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
      console.log(data)
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
    this.socket.emit('acceptCnvTransfer', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onConversationTransferAccept = (data) => {
    this.socket.on('onAcceptCnvTransfer', (data, error) => {
      console.log(data)
    })
  }

  /**
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
   *    */

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
}

// /**
//  * update user event 
//  */
// updateUser = (data) => {
//   this.socket.emit('onUserUpdated', data, error => {
//     if (error) {
//       setError(error)
//     }
//     console.log('====================================');
//     console.log("user updated");
//     console.log('====================================');
//   })
// }
// onUpdateUser = (data) => {
//   this.socket.on('onUserUpdated', data, error => {
//     if (error) {
//       setError(error)
//     }
//   })
// }
// /**
//  * delete user event 
//  */
// deleteUser = (data) => {
//   this.socket.emit('onUserDeleted', data, error => {
//     if (error) {
//       setError(error)
//     }
//     console.log('====================================');
//     console.log("user deleted");
//     console.log('====================================');
//   })
// }
// onUserDeleted = (data) => {
//   this.socket.on('onUserDeleted', data, error => {
//     if (error) {
//       setError(error)
//     }
//   })
// }