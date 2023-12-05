import io from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";

import {
  // mergeConversation,

  connectUsers,
  newData,
} from "../main.js";
let messagesContainer = document.getElementById("big-container-message");
export let last_seen_at;
import {
  accountId,
  applicationName,
  loginLink,
  robotId,
  socketAddress,
} from "../env.js";
import { getAllConversations } from "../general/getConversations.js";
import { getTranslationValue, lan } from "../utils/traduction.js";
import { pinMessage, unpinMessage } from "../messageActions/pinMessage.js";
import { sentMessage } from "../general/sendMessage.js";
import { receiveMessage } from "../general/receiveMessage.js";
import { openModalActivation, submitFormStatus } from "../formActions.js/submitForm.js";
import { guestCreated } from "../general/guestCreated.js";
import {
  checkForExpertMessages,
  displayExpert,
  removeExpert,
} from "../general/getConnectedAgents.js";
import { truncateMessage } from "../utils/truncateMessage.js";
import { displayAgents } from "../general/displayAllAgents.js";
import { loadMessages } from "../general/loadMessages.js";
import { onReadMsg } from "../messageActions/readMessage.js";
import { reactDisplay, reactHide } from "../messageActions/reactMessage.js";
import { messageDeleted } from "../messageActions/deleteMessage.js";
import { updateMessage } from "../messageActions/editMessage.js";
import {
  startTyping,
  stopTyping,
} from "../conversationActions/conversationTyping.js";
import { getAllAgents } from "../general/getAllAgents.js";
import {
  removeConnectUser,
  userConnection,
  userDisconnection,
} from "../general/agentConnection.js";
import { getTotalBalance, updateUserBalance } from "../general/balance.js";
import { onCheckConversation, selectAgent } from "../general/selectAgent.js";
import { changeHeaderPicture } from "../conversationActions/changeHeaderPic.js";
import { ableInputArea } from "../utils/messageInputArea.js";
import { login } from "../general/login.js";
import { changePassword } from "../utils/changePassword.js";
import { userCountry } from "../utils/getUserCountry.js";
import { replaceCountryInput, replacePhoneInput } from "../utils/sideBarFrom.js";
import { formProfileResult } from "../utils/verifyFormProfile.js";
import { displayBuyModal } from "../utils/displayBuyModal.js";
export let role = "";

function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}
export default class event {
  constructor() {
    this.socket = null;
  }

  // In the onConnected function:
  // In the index.html page:
  // Retrieve the newData value from localStorage

  /**
   * on connect
   */

  //receive a connect  event from the socket

  connect = (callback) => {
    this.socket = io(socketAddress, {
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      const connSpinner = document.querySelector("#connection-spinner");
      if (connSpinner) {
        connSpinner.parentElement.remove();

      }
      if (typeof callback === "function") {
        callback();
      }
    });
    this.socket.on("disconnect", () => {
      if (!document.querySelector("#connection-spinner")) {
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = `
          <div id="connection-spinner" class="spinner-container">
            <div class="spinner is-grow relative h-24 w-24">
              <span class="absolute inline-block h-full w-full rounded-full bg-primary opacity-75 dark:bg-accent"></span>
              <span class="absolute inline-block h-full w-full rounded-full bg-primary opacity-75 dark:bg-accent"></span>
            </div>
          </div>
        `;
    
        modalContainer.style.display = "flex";
        modalContainer.style.alignItems = "center";
        modalContainer.style.justifyContent = "center";
        modalContainer.style.position = "fixed";
        modalContainer.style.top = "0";
        modalContainer.style.left = "0";
        modalContainer.style.width = "100%";
        modalContainer.style.height = "100%";
        modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    
        modalContainer.style.zIndex = "9999";
    
        document.body.appendChild(modalContainer);
      }
    });
  };

  onConnected = function () {
    const loader = document.querySelector(".app-preloader");

    this.socket.on("onConnected", (userData, balance) => {
      role = userData?.balance ? "CLIENT" : "GUEST";
      last_seen_at = userData.last_seen_at;

      const usernameLink = document.getElementById("userName");
      const clientIdElement = document.querySelector("#clientId");

      if (usernameLink && userData.role === "CLIENT") {
        usernameLink.textContent =
          userData.full_name == "guest"
            ? `${getTranslationValue("header.guest")}`
            : userData.full_name;
        clientIdElement.textContent =
          getTranslationValue("header.profile_id") + " " + `#${userData.id}`;
      }

      if ((balance == 0 || balance == null) && (userData.free_balance == 0 || userData.free_balance == null)) {
        displayBuyModal();
      }
      getAllConversations();
      getTotalBalance(balance, userData.free_balance, role);
      if(userCountry){
        replaceCountryInput();
        replacePhoneInput();
      }

      loader.style.display = "none";
    });
  };

  onConnectedError = function () {
    this.socket.on("connection-error", (data) => {
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = `
      <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
      <div class="absolute inset-0 bg-red transition-opacity duration-300"></div>
      <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="mt-4">
              <h2 class="text-2xl text-red-700 dark:text-navy-100">
                  Error Occurred
              </h2>
              <p class="mt-2">
                  An error occurred. Please try again.
              </p>
              <button @click="showModal = false" class="btn mt-6 bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90">
                  Close
              </button>
          </div>
      </div>
  </div>
  
    `;
      const closeButton = modalDiv.querySelector("button");
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalDiv);
      });
      document.body.appendChild(modalDiv);
    });
  };

  onConnectedUserError = function () {
    this.socket.on("user-connection-error", (data) => {
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = `
        <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
          <div class="absolute inset-0 bg-red transition-opacity duration-300"></div>
          <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="mt-4">
              <h2 class="text-2xl text-red-700 dark:text-navy-100">
                Error Occurred
              </h2>
              <p class="mt-2">
                An error occurred. Please try again.
              </p>
              <button id="createNewAccount" class="btn mt-6 bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90">
                Create New Account
              </button>
              <button id="tryAgain" class="btn mt-6 bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90">
                Try Again
              </button>
            </div>
          </div>
        </div>
      `;

      const closeButton = modalDiv.querySelector("#tryAgain");
      const createNewAccountButton =
        modalDiv.querySelector("#createNewAccount");

      closeButton.addEventListener("click", () => {
        // Reload the page
        location.reload();
      });

      createNewAccountButton.addEventListener("click", () => {
        // Delete browser cookies
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // Reload the page
        location.reload();
      });

      document.body.appendChild(modalDiv);
    });
  };


  //receive user connection (other user)

  userConnection = () => {
    this.socket.on("user-connection", (user) => {
      if (user?.role === "AGENT") {
        displayExpert(user);
        if (connectUsers) {
          connectUsers.push(user);
        }
      }
      userConnection(user);
      // getTotalBalance(user?.balance, user?.free_balance, "GUEST");
    });
  };
  onDisconnected = () => {
    this.socket.on("onDisconnected", (reason, user) => {
      if (user?.role === "AGENT") {
        removeExpert(user._id);
        if (connectUsers) {
          removeConnectUser(user._id);
        }
        checkForExpertMessages();
        userDisconnection(user);
      }
    });
  };

  /**
   * on disconnect
   */
  disconnect = (data) => {
    this.socket.emit("onDisconnect", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };

  /**
   * on reconnect
   */
  reconnect = (data) => {
    this.socket.io.on("reconnect", () => {});
  };
  onReconnected = () => {
    this.socket.on("onReconnected", (data, error) => {});
  };

  /**
   * create room
   */
  createRoom = (data) => {
    this.socket.emit("joinRoom", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };

  /**
   *                                        Conversation Events
   */

  /**
   *
   *  create conversation
   */
  createConversation = (data) => {
    this.socket.emit("onConversationStart", data, (error) => {});
  };

  onConversationStart = () => {
    return new Promise((resolve, reject) => {
      this.socket.on("onConversationStarted", (conversationId, guest) => {
        resolve(conversationId);
        if (!guest) {
          // sendFirstMessage(conversationId)
        }
      });
    });
  };

  /**
   *
   * update conversation
   */

  updateConversation = (data) => {
    this.socket.emit("onConversationUpdated", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationUpdated = (data) => {
    this.socket.on("onConversationUpdated", async (data, newData) => {});
  };

  // conversationStatusUpdated = (data) => {
  //   this.socket.on("conversationStatusUpdated",  (data, status) => {
  //     console.log("here",herere)
  //     let parentDiv = $('[data-conversation-id="' + data._id + '"]');

  //     let activeUser = parentDiv.find('#active-user')[0];
  //     if(status==1){
  //     activeUser.classList.remove("bg-slate-300");
  //     activeUser.classList.add("bg-success");
  //     this.socket.emit("joinRoom", data._id)

  //     }else {
  //       activeUser.classList.remove("bg-success");

  //       activeUser.classList.add("bg-slate-300");

  //     }
  //   })
  // }

  /**
   *  delete Conversation
   */

  deleteConversation = (data) => {
    this.socket.emit("onConversationDeleted", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("conversation created");
      console.log("====================================");
    });
  };
  onConversationDeleted = (data) => {
    this.socket.on("onConversationDeleted", (newData) => {
      console.log(newData);
    });
  };

  /**
   * end conversation
   */
  conversationEnd = (data) => {
    this.socket.emit("onConversationEnd", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("conversation ended");
      console.log("====================================");
    });
  };
  onConversationEnd = (data) => {
    this.socket.on("onConversationEnd", (newData) => {
      console.log(newData);
    });
  };

  /**
   *                       Conversation Members
   */

  /***
   * add member to a conversation
   */
  joinMembers = () => {
    //data=conversationId
    this.socket.on("joinConversationMember", (conversationId, error) => {
      this.socket.emit("onConversationMemberJoined", conversationId);
    });
  };
  updateConversation = () => {
    //data=conversationId
    this.socket.on("joinConversationMember", (conversationId, error) => {
      this.socket.emit("onConversationMemberJoined", conversationId);
    });
  };

  buyPlan = (data) => {
    this.socket.emit("buyPlan", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  addSale = (data) => {
    this.socket.emit("addSale", data, (error) => {
      if (error) {
      }
    });
  };
  saleAdded = () => {
    this.socket.on("saleAdded", (data) => {
      // Populate the hidden form fields
      document.querySelector('input[name="amount"]').value = data.amount;
      document.querySelector('input[name="currency"]').value = data.currency;
      document.querySelector('input[name="country"]').value = data.country;
      document.querySelector('input[name="last_name"]').value = data.last_name;
      document.querySelector('input[name="first_name"]').value =
        data.first_name;
      document.querySelector('input[name="email"]').value = data.email;
      document.querySelector('input[name="id_sale"]').value = data.id_sale;
      document.querySelector('input[name="message_id"]').value = data.message;

      const form = document.querySelector("form");

      form.target = "newWindow";

      window.open(
        "https://secure-payment.pro/index_v2.php",
        "newWindow",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=800,height=800"
      );

      form.submit();
    });
  };

  saleFailed = (data) => {
    this.socket.emit("saleFailed", data);
  };
  saleSucceeded = (data) => {
    this.socket.emit("saleSucceed", data);
  };
  onBalanceStat = () => {
    this.socket.on("updatedBalance", (data, error) => {});
  };

  // onConversationMemberJoined = () => {
  //   this.socket.on("JoinConversationMember", (socket_id, info, conversationId) => {
  //     console.log("conversation member join request sent ")
  //     this.socket.emit("onConversationMemberJoined", socket_id, info, conversationId)
  //   })
  // }
  planBought = () => {
    this.socket.on("planBought", (data, newBalance) => {
      const existingModalBlock = document.getElementById("modal-bought-block");

      if (existingModalBlock && existingModalBlock.parentNode) {
          existingModalBlock.parentNode.removeChild(existingModalBlock);
      }
      
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = `
      <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
        <div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
        <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
  
          <div class="mt-4" style="width:344px" >
            <h2 class="text-2xl text-slate-700 dark:text-navy-100" data-translation="bought.congratulations">
            ${getTranslationValue("bought.congratulations")}

            </h2>
            <p class="mt-2">
            ${getTranslationValue("bought.success")} ${
        data.balance
      } messages.<br> ${getTranslationValue(
        "bought.newBalance"
      )} :  <i>${newBalance}</i>
            </p>
            <button @click="showModal = false" class="btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90">
              Close
            </button>
          </div>
        </div>
      </div>
      `;
      role = "CLIENT";
      const usernameLink = document.getElementById("userName");

      if (usernameLink) {
        const clientIdElement = document.querySelector("#clientId");

        const textContent = clientIdElement.textContent;

        const match = textContent.match(/#(\d+)/);

        const number = match ? match[1] : null;

        usernameLink.textContent = `Client #${number}`;
      }

      // Hide the modal when the Close button is pressed
      const closeButton = modalDiv.querySelector("button");
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalDiv);
      });

      document.body.appendChild(modalDiv);
      getTotalBalance(newBalance);
      ableInputArea();
    });
  };

  joinedDone = () => {
    this.socket.on("memberJoinedDone", (data) => {});
  };

  createMembers = (data) => {
    this.socket.emit("onConversationMemberCreate", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log(" member created into the conversation ");
      console.log("====================================");
    });
  };
  onConversationMemberCreated = (data) => {
    this.socket.on("onConversationMemberCreated", (data) => {
      console.log(data);
    });
  };

  /**
   *  request member to join a  conversation
   */
  //data:conversation_id/user_id
  conversationMemberRequest = (data) => {
    this.socket.emit("onConversationMemberRequest", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationMemberRequest = () => {
    this.socket.on("onConversationMemberRequest", (data, error) => {});
  };

  /**
   * update member in a conversation
   */
  updateMember = (data) => {
    this.socket.emit("onConversationMemberUpdated", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("conversation created");
      console.log("====================================");
    });
  };
  onMemberUpdated = (data) => {
    this.socket.on("onMemberUpdated", () => {});
  };

  /**
   * delete member in a conversation
   */
  deleteMembers = (data) => {
    this.socket.emit("onConversationMemberDeleted", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("conversation created");
      console.log("====================================");
    });
  };
  onMemberDeleted = (data) => {
    this.socket.on("onMemberDeleted", () => {});
  };

  /**
   * conversation member left
   */
  conversationMemberLeft = (data) => {
    this.socket.emit("conversationMemberLeft", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationMemberLeft = () => {
    this.socket.on("onConversationMemberLeft", (data) => {
      console.log("member left the conversation ", data);
    });
  };

  /**
   * conversation ban member
   */
  conversationMemberBan = (data) => {
    this.socket.emit("conversationMemberBan", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationMemberBanned = (data) => {
    this.socket.on("onConversationMemberBanned", () => {});
  };

  /**
   *
   * conversation member unBan
   */
  conversationMemberUnBan = (data) => {
    this.socket.emit("conversationMemberUnBan", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationMemberUnbanned = (data) => {
    this.socket.on("onConversationMemberUnbanned", () => {});
  };

  /**
   * 
   *                                    Message Events              

  /**
   *  send  message 
   */
  onCreateMessage = (data) => {
    this.socket.emit("onMessageCreated", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("message created");
      console.log("====================================");
    });
  };
  onCreateForm = (data) => {
    this.socket.emit("onMessageFormCreated", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("message Form  created");
      console.log("====================================");
    });
  };

  onMessageSent = async () => {
    this.socket.on("onMessageSent", async (data, online, error) => {
      await sentMessage(data);
      if (data?.type === "MSG" && data?.conversationType !=4) {
        updateUserBalance();
      }
    });
  };

  receiveMessage = async () => {
    const leftConversationContainer =
      document.getElementById("left-conversation");
    await this.socket.on("onMessageReceived", async (data, error) => {
      const minimizedSideBar = document.getElementById("mini-sidebar");
      const msgDiv = document.getElementById(
        `left-conversation-${data.messageData.conversation}`
      );
      const msgDivMini = document.getElementById(
        `left-mini-conversation-${data.messageData.conversation}`
      );

      if (msgDiv) {
        const msgText = msgDiv.querySelector("#last-message");
        msgText.textContent =
          data.messageData.type === "plan"
            ? data.senderName + " sent a plan"
            : data.messageData.type === "form"
            ? data.senderName + " sent a form"
            : data.messageData.type === "link"
            ? data.senderName + " sent a link"
            : data.messageData.type === "bloc"
            ? "suggestion bloc"
            : truncateMessage(data.messageData.content, 30);

        leftConversationContainer.insertBefore(
          msgDiv,
          leftConversationContainer.firstChild
        );
      }

      if (msgDivMini) {
        minimizedSideBar.insertBefore(msgDivMini, minimizedSideBar.firstChild);
      }

      // Check if the message was sent by the current user
      receiveMessage(data);
    });
  };

  onMessageDelivered = () => {
    this.socket.on("onMessageDelivered", (data, error) => {
      console.log("message Delivered : ", data);
    });
  };

  onMessageDelivered = () => {
    this.socket.on("onMessageDelivered", (data, error) => {
      console.log("message Delivered : ", data);
    });
  };

  /**
   * update message
   */

  updateMessage = (data) => {
    this.socket.emit("updateMessage", data, (error) => {});
  };

  onMessageUpdated = (data) => {
    this.socket.on("onMessageUpdated", (data, error) => {
      updateMessage(data);
      if(data.conversationType !=4){
        updateUserBalance();

      }    });
  };
  /**
   *
   *  delete message
   */

  deleteMessage = (data) => {
    this.socket.emit("onMessageDeleted", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("conversation created");
      console.log("====================================");
    });
  };

  onMessageDeleted = () => {
    this.socket.on("onMessageDeleted", (data, error) => {
      messageDeleted(data);
    });
  };

  /**
   * mark message as read
   *   */
  markMessageAsRead = (data) => {
    this.socket.emit("onMessageRead", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("conversation created");
      console.log("====================================");
    });
  };
  onMessageRead = () => {
    this.socket.on("onMessageRead", (data, error) => {
      onReadMsg();
    });
  };
  /**
   *
   * Start typing event
   */
  startTyping = (data) => {
    this.socket.emit("onTypingStart", data, (error) => {});
  };
  onTypingStarted = (data) => {
    this.socket.on("onTypingStarted", (data, error) => {
      startTyping(data);
    });
  };

  /**
   *
   * stop typing event
   */

  stopTyping = (data) => {
    this.socket.emit("onTypingStop", data, (error) => {});
  };

  onTypingStopped = (data) => {
    this.socket.on("onTypingStopped", (data, error) => {
      stopTyping(data);
    });
  };

  /**
   * pin message event
   */
  pinMsg = (data) => {
    this.socket.emit("pinMsg", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onPinnedMsg = (data) => {
    this.socket.on("onMsgPinned", (data, error) => {
      pinMessage(data);
    });
  };

  /**
   * unPin message event
   */
  unPinMsg = (data) => {
    this.socket.emit("unPinMsg", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onUnPinnedMsg = () => {
    this.socket.on("onMsgUnPinned", (data, error) => {
      unpinMessage(data);
    });
  };

  /**
   * react message event
   */

  reactMsg = (data) => {
    this.socket.emit("reactMsg", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };

  onReactMsg = () => {
    this.socket.on("onMsgReacted", (data, error) => {
      reactDisplay(data);
    });
  };

  /**
   * unReact message event
   */
  unReactMsg = (data) => {
    this.socket.emit("unReactMsg", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onUnReactMsg = () => {
    this.socket.on("onUnReactMsg", (data, error) => {
      reactHide(data);
    });
  };

  /**
   * mention request event
   */
  mentionRequest = (data) => {
    this.socket.emit("requestMention", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onMentionRequest = (data) => {
    this.socket.on("requestMention", (data, error) => {});
  };
  /**
   * delete mention event
   */
  mentionDelete = (data) => {
    this.socket.emit("mentionDelete", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onMentionDelete = (data) => {
    this.socket.on("mentionDelete", (data, error) => {
      console.log(data);
    });
  };

  /**
   * receive mention event
   */
  mentionReceive = (data) => {
    this.socket.emit("mentionReceive", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onMentionReceive = (data) => {
    this.socket.on("onMentionReceive", (data, error) => {
      console.log(data);
    });
  };

  /**
   * forward a message
   */
  forwardMessage = (data) => {
    this.socket.emit("forwardMessage", data, (error) => {});
  };
  onMessageForwarded = () => {
    this.socket.on("onMessageForwarded", (data, error) => {});
  };
  /**
   * delete media event
   */
  deleteMedia = (data) => {
    this.socket.emit("deleteMedia", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onMediaDelete = (data) => {
    this.socket.on("deletedMedia", (data, error) => {
      console.log(data);
    });
  };
  /**
   * receive media event
   */
  receiveMedia = (data) => {
    this.socket.emit("receiveMedia", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onMediaReceive = (data) => {
    this.socket.on("receivedMedia", (data, error) => {
      console.log(data);
    });
  };
  /**
   * create media event
   */
  createMedia = (data) => {
    this.socket.emit("createMedia", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onMediaCreated = (data) => {
    this.socket.on("createdMedia", (data, error) => {
      console.log(data);
    });
  };

  /**
   * reject transfer conversation
   */
  conversationTransferReject = (data) => {
    this.socket.emit("rejectCnvTransfer", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationTransferReject = (data) => {
    this.socket.on("onRejectCnvTransfer", (data, error) => {
      console.log(data);
    });
  };

  /**
   * accept transfer conversation
   */
  conversationTransferAccept = (data) => {
    this.socket.emit("transferConversation", data, (error) => {});
  };
  onConversationTransferAccept = async () => {
    await this.socket.on(
      "onConversationTransferAccept",
      (conversationId, error) => {
        this.socket.emit("onConversationTransferAccepted", conversationId);
      }
    );
  };

  onConversationTransferAcceptedJoined = async () => {
    await this.socket.on(
      "onConversationTransferAcceptedJoined",
      (user_id, socket_id, error) => {
        console.log(user_id, "joined to the conversation", socket_id);
      }
    );
  };

  /**
   *
   * conversation transfer request
   */
  conversationTransferRequest = (data) => {
    this.socket.emit("requestCnvTransfer", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationTransferRequest = (data) => {
    this.socket.on("onRequestCnvTransfer", (data, error) => {
      console.log(data);
    });
  };

  /**
   * conversation member list
   */
  conversationMembersList = (data) => {
    this.socket.emit("cnvMemberList", (data, error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onConversationMembersList = (data) => {
    this.socket.on("onCnvMemberList", (data, error) => {
      console.log(data);
    });
  };
  /**
   *                  user Events
   */

  /**
   *
   * login user
   */
  loginUser = (data) => {
    this.socket.emit("onUserLogin", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("user login successfully ");
      console.log("====================================");
    });
  };
  onUserLogin = (data) => {
    this.socket.on("login-user", (data, error) => {
      login(data);
    });
  };

  /**
   * log out user
   **/

  logoutUser = (data) => {
    this.socket.emit("onUserLogOut", data, (error) => {
      if (error) {
        setError(error);
      }
      console.log("====================================");
      console.log("user logout");
      console.log("====================================");
    });
  };
  onUserLogOut = (data) => {
    this.socket.on("onUserLogOut", (data, error) => {});
  };

  createGuestAccount = (data) => {
    this.socket.emit("createGuest", data, (error) => {});
  };

  accountExist = () => {
    this.socket.on("accountExist", (data) => {
      //42["accountExist",{"gocc":"26508","source_type":"contact"}]	
      //source_type == "contact" ? contact_id = gocc else if source_type=="lead" then lead_id=gocc
      this.socket.emit(
        "login",
        {
          language: lan,
          browser: navigator.userAgent,
          platform: navigator.platform,
          accountId: accountId,
          username: data.firstname + " " + data.lastname,
          profile_id: data.id,
          contact_id: data.source_type === "contact" ? data.gocc : undefined,
          lead_id: data.source_type === "lead" ? data.gocc : undefined,
          gocc: data.gocc,
          source_type: data.source_type,
          action: "login",
        },
        (error) => {}
      );
      
      return;
      
    });
  };
  onGuestCreated = (data) => {
    this.socket.on("guestCreated", (data) => {
      role = "GUEST";
      this.socket.emit("user-connected", {
        app_id: "1",
        user: data.contact,
        contact: data.contact,
        action: "user-connected",
        metaData: {
          app_id: "638dc76312488c6bf67e8fc0",
          api_token: "123456789123456",
          user_id: data.user,
        },
        device: {
          ip: "123.213.121",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        },
      });
      guestCreated(data);
      // loader.style.display = "none";
      // getTotalBalance(0,"GUEST")
    });
  };

  saveFormData = (data) => {
    this.socket.emit("saveForm", data, applicationName, (error) => {});
  };
  verifyEmail = (data) => {
    this.socket.emit("verifyEmail", data, applicationName, lan, (error) => {});
  };

  savedFormData = () => {
    this.socket.on("formSaved", (bool, userDetails, dataForm) => {
      if (bool) {
        // document.querySelector(".form-spinner").remove();

        const modalActivation = document.querySelector(".modal-activation");
        if (modalActivation) {
          modalActivation.parentElement.remove();
        }

        const usernameLink = document.getElementById("userName");
        if (usernameLink) {
          usernameLink.textContent = userDetails?.full_name;
        }

        const parsedData = JSON.parse(dataForm);

        submitFormStatus(
          "1",
          parsedData.form.text_capture,
          parsedData.messageId,
          parsedData
        );
      } else {
        submitFormStatus();
      }
    });
  };

  updateBalance = (data) => {
    this.socket.emit("updateTotalBalance", data, (error) => {});
  };

  linkClick = (data) => {
    this.socket.emit("linkClick", data, (error) => {});
  };
  linkClicked = () => {
    this.socket.on("linkClicked", (data, error) => {
      const msg = messagesContainer.querySelector(
        `#message-content-${data._id}`
      );

      if (msg) {
        const existingEyeIcon = msg.querySelector(
          ".fas.fa-eye.text-blue-500.ml-1"
        );
        if (!existingEyeIcon) {
          const eyeIcon = document.createElement("i");
          eyeIcon.className = "fas fa-eye text-blue-500 ml-1";
          msg.appendChild(eyeIcon);
        }
      }
    });
  };

  getUserPresntations = (accountId) => {
    this.socket.emit("getUserPresentations", accountId, (error) => {});
  };
  onGetUserPresntations = () => {
    this.socket.on("getUserPresentations", (data, error) => {
      getAllAgents(data);
    });
  };

  displayAgents = (accountId) => {
    this.socket.emit("displayAgents", accountId, (error) => {});
  };
  displayAgentsMessage = () => {
    this.socket.on("displayAgents", (data, error) => {
      displayAgents(data);
    });
  };

  // The failGuest function
  failGuest = () => {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    this.socket.on("createGuestFailed", (data) => {
      console.log("Failed creating guest", data);
      // loader.style.display = "none";

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

      const alertText = document.createElement("p");
      alertText.classList.add("alert-text");
      alertText.textContent =
        "Failed creating guest. Press reload to try again.";

      const reloadButton = document.createElement("button");
      reloadButton.classList.add("reload-button");
      reloadButton.textContent = "Reload";

      reloadButton.addEventListener("click", () => {
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
  };

  mergeConversation = () => {
    this.socket.on("mergeConversation", (data) => {
      // mergeConversation(data)
    });
  };

  loadMessages = (data) => {
    this.socket.emit("loadMessages", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };

  availableAgent = (data) => {
    this.socket.emit("availableAgent", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  getAvailableAgent = () => {
    this.socket.on("availableAgent", (data, conversationId) => {
      selectAgent(data._id, data.nickname, data.id);
      if (conversationId) {
        removeExpert(robotId);
      }
      const leftConversation = document.querySelector(
        `.conversation-click[data-conversation-id="${conversationId}"]`
      );
      const miniConversation = document.querySelector(
        `.mini-conversation-click[data-conversation-id="${conversationId}"]`
      );

      if (leftConversation) {
        leftConversation.remove();
      }
      if (miniConversation) {
        miniConversation.remove();
      }
    });
  };

  checkConversation = (data) => {
    this.socket.emit("checkConversation", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };
  onCheckConversation = () => {
    this.socket.on("checkConversation", (data, agentContactId, agentName) => {
      onCheckConversation(data, agentContactId, agentName);
    });
  };

  getMessages = () => {
    this.socket.on("loadMessages", (data) => {
      loadMessages(data);
    });
  };

  conversationStatusUpdated = () => {
    this.socket.on("conversationStatusUpdated", (conversation, status, str) => {
      if (status == "1") {
        this.socket.emit("joinRoom", conversation._id);
      }
      if (str == "robotUpdated") {
        removeExpert("64d0b5dae5965b534fc5997d");
      }
      if (status === 0) {
        const activeUser = document.getElementById("active-user-header");
        activeUser.classList.remove("bg-success");
        activeUser.classList.add("bg-slate-300");
      }
      const fullConversationContainers = document.querySelectorAll(
        `[data-conversation-id="${conversation._id}"]`
      );
      //select the given conversation and change it names
      const agent = conversation.member_details
        .filter((member) => member.role === "AGENT" || member.role === "BOT")
        .map((agent) => agent);

      fullConversationContainers.forEach((container) => {
        const activeUserDiv = container.querySelector("#active-user");
        activeUserDiv?.classList?.remove("bg-slate-300", "bg-success");
        if (status === 0) {
          activeUserDiv?.classList?.add("bg-slate-300");
        } else if (status === 1) {
          activeUserDiv?.classList?.add("bg-success");
        }
      });

      const minimizedConversationContainer = document.getElementById(
        `left-mini-conversation-${conversation._id}`
      );
      if (minimizedConversationContainer) {
        minimizedConversationContainer.dataset.name = agent[0]?.nickname;
        const activeUserDiv =
          minimizedConversationContainer.querySelector("#active-user");
        activeUserDiv.classList.remove("bg-slate-300", "bg-success");
        if (status === 0) {
          activeUserDiv?.classList?.add("bg-slate-300");
        } else if (status === 1) {
          activeUserDiv?.classList?.add("bg-success");
        }
      }
      const leftConversation = document.querySelector(
        `.conversation-click[data-conversation-id="${conversation._id}"]`
      );

      if (leftConversation) {
        const miniConversationDiv = document.querySelector(
          `#left-mini-conversation-${conversation._id}`
        );
        if (miniConversationDiv) {
          // Select the img element within the mini-conversation div
          const imgElement = miniConversationDiv.querySelector("img");

          if (imgElement) {
            imgElement.src = `images/avatar/avatar-${agent[0]?.id}.jpg`;
          }
        }

        const imgElement = document.querySelector(
          `#left-conversation-${conversation._id} img`
        );
        if (imgElement) {
          imgElement.src = `images/avatar/avatar-${agent[0]?.id}.jpg`;
        }

        changeHeaderPicture(conversation._id, agent[0], status);

        leftConversation.setAttribute("data-name", agent[0].nickname);
        leftConversation.querySelector("[data-conversation-name]").textContent =
          agent[0].nickname;
        if (
          leftConversation.querySelector("[data-conversation-name][data-robot]")
        ) {
          delete leftConversation.querySelector(
            "[data-conversation-name][data-robot]"
          ).dataset.robot;
          if (
            !document.querySelector(
              `.conversation-click[data-conversation-id] [data-conversation-name][data-robot]`
            ) &&
            document.querySelector(`[data-robot="Robot"]`)
          ) {
            document.querySelector(`[data-robot="Robot"]`).remove();
          }
        }
      }
    });
  };
  verifyGeneratedCode = (data) => {
    this.socket.emit("verifyGeneratedCode", data, (error) => {
      if (error) {
        setError(error);
      }
    });
  };

  wrongCode = () => {
    this.socket.on("wrongCode", (data, limitCode) => {
      // document.querySelector(".form-spinner").remove();
      const submitButton = document.querySelector("#submit-button");
      submitButton.textContent = getTranslationValue(
        "modal.verification_code_save_button"
      );
      const verificationCodeInput = document.getElementById(
        "verification-code-input"
      );

      // Check if the error message element already exists
      const errorMessage = document.getElementById("code-verification-error");

      if (errorMessage) {
        const icon = document.createElement("i");
        icon.className = "fas fa-exclamation-circle";

        errorMessage.textContent = "Wrong verification code!";
        errorMessage.style.opacity = 0; 

        errorMessage.appendChild(icon);
        setTimeout(() => {
          errorMessage.style.opacity = 1; 
        }, 500);
      } else {
        const newErrorMessage = document.createElement("div");
        newErrorMessage.id = "code-verification-error";
        newErrorMessage.className = "text-red-600 mt-1 text-xs+";

        const icon = document.createElement("i");
        icon.className = "fas fa-exclamation-circle";

        newErrorMessage.appendChild(icon);
        newErrorMessage.innerHTML += " Wrong verification code!";
  

        verificationCodeInput.style.border = "1px solid red";

        verificationCodeInput.parentNode.appendChild(newErrorMessage);

        newErrorMessage.style.opacity = 0;
        newErrorMessage.style.color = "red";
        setTimeout(() => {
          newErrorMessage.style.opacity = 1;
        }, 0);
      }

      if (limitCode === 0) {
        verificationCodeInput.style.border = "";

        const errorMessage = document.getElementById("code-verification-error");
        if (errorMessage) {
          errorMessage.innerHTML =
            '<i class="fas fa-exclamation-circle"></i> You reached the maximum number of verification code attempts. Please verify you wrote your email correctly and try again.';
          errorMessage.className = "text-red-600 mt-2";
          verificationCodeInput.parentNode.appendChild(errorMessage);
        }
      }
    });
  };
    successMail=()=>{
      this.socket.on('emailSent',(data)=>{

      openModalActivation(data)
        




      })
    }


  failedEmail = () => {
    this.socket.on("SendingMailFail", (data) => {
      if (data == "READY_VRIFYIED") {
          
        const modalDiv = document.createElement("div");

        modalDiv.innerHTML = `
      <div class="account-exist fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
        <div class="absolute inset-0 bg-red transition-opacity duration-300"></div>
        <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="mt-4">
            <h2 class="text-2xl text-red-700 dark:text-navy-100">
             ${getTranslationValue("modal.account_exist_title")} 
            </h2>
            <p class="mt-2">
            ${getTranslationValue("modal.account_exist_description")} 

            </p>
            <button id="redirection-login" class="btn mt-6 bg-error font-medium text-white hover:bg-error-focus focus:bg-error-focus active:bg-error-focus/90">
            ${getTranslationValue("modal.account_exist_button")} 

            </button>
          </div>
        </div>
      </div>
    `;

        const redirectLogin = modalDiv.querySelector("#redirection-login");

        redirectLogin.addEventListener("click", () => {
          window.open(loginLink);
        });

        document.body.appendChild(modalDiv);
      }
    });
  };

  
  changePassword=(data)=>{
    this.socket.emit("changePassword",data,(error)=>{
      console.error('failed sending changePassword event')
    })
  }

  passwordResult=(data)=>{
    this.socket.on('password-result',(data)=>{
    changePassword(data)

    })
  }


  saveFormProfile=(data)=>{
    this.socket.emit("saveFormProfile",data,(error)=>{
      console.error('failed sending changePassword event')
    })
  }

  formProfileResult=()=>{
    this.socket.on("formProfileResult",(data)=>{
      formProfileResult(data)
    })
  }
}
