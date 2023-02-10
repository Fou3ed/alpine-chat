import io from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";


export default class event {

  constructor() {

    this.socket = io("ws://localhost:3000", {
      transports: ['websocket']
    });
  }


  
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
    return new Promise((resolve, reject) => {
      this.socket.on("onConnected", (data, newData) => {
        resolve(newData);
      });
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
  createMessage = (data, recipient_id) => {
    this.socket.emit('onMessageCreated', data, recipient_id, error => {
      if (error) {
        setError(error)
      }
      console.log('====================================');
      console.log("conversation created");
      console.log('====================================');
    })
  }
  
  onMessageDelivered = () => {
    return new Promise((resolve,reject)=>{
    this.socket.on('onMessageDelivered', (data, error) => {
      console.log(data)
      resolve(data)
    })
    })

  }
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
   *   
   *  message received event 
   */
  messageReceived = (data) => {
    this.socket.emit('MessageReceived', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onMessageReceived = (data) => {
    this.socket.on('onMessageReceived', (data, error) => {
      console.log(data)
    })
  }

  /**
   * pin message event
   */
  pinMsg = (data) => {
    this.socket.emit('pinMsg', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onPinnedMsg = (data) => {
    this.socket.on('onMsgPinned', (data, error) => {
      console.log(data)
    })
  }

  /**
   * unPin message event 
   */
  unPinMsg = (data) => {
    this.socket.emit('unPinMsg', (data, error) => {
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
    this.socket.emit('reactMsg', (data, error) => {
      if (error) {
        setError(error)
      }
    })
  }
  onReactMsg = (data) => {
    this.socket.on('onMsgReacted', (data, error) => {
      console.log(data)
    })
  }


  /**
   * unReact message event 
   */
  unReactMsg = (data) => {
    this.socket.emit('unReactMsg', (data, error) => {
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