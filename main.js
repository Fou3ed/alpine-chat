export let connectUsers = [];
import Event from "./lib_client/client_2.js";
export const socketLib = new Event();
export let agentClicked = "";
export let PhoneNumberValidation = false;
// let userCountry;
export let newData =
  getCookie("myData") !== undefined ? JSON.parse(getCookie("myData")) : null;
  const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
export const timeString =
  hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");

// Save user information in local storage
import {
  accountId, message_limit,
} from "./env.js";
export let allConversation = [];
export let totalBalance;
export let totalFreeBalance

import { getTranslationValue, lan } from "./utils/traduction.js";
import { getCookie } from "./utils/getCookie.js";
import { checkForExpertMessages, getExperts } from "./general/getConnectedAgents.js";
import { selectExpert } from "./general/selectExpert.js";
import { handleConversationClick } from "./conversationActions/conversationClick.js";
import { notifyMe } from "./utils/notificationSound.js";
import { showEmoji } from "./conversationActions/showEmoji.js";
import { getPlans } from "./general/getPlans.js";
import { showSpinner } from "./components/spinner.js";
import { loadChatInformation } from "./utils/appInfo.js";
import { changeTitle } from "./utils/changeTitle.js";
import { verifyPassword } from "./utils/changePassword.js";
import { logOut } from "./utils/logOut.js";
import { getContactInfo  } from "./utils/sideBarFrom.js";
import { userCountry } from "./utils/getUserCountry.js";
import { verifyFormProfile } from "./utils/verifyFormProfile.js";

// Components
// The message input is where the user types their message
const messageInput = document.querySelector("#message-input");

// get the conversation container
export const conversationHeaderStatus = document
  .getElementById("conversation-name")
  .parentNode.querySelector(".text-xs");
const modal = document.getElementById("ModalPlan");

  

window.connected = () => {};

// Global variables
export let conversationId;
export let senderName;
export let expert;
export let notifyNumber = 0;
export let limitCode=3
export let initialFormData = {};

/**state management  */
export function updateConversationId(conversation){
  conversationId=conversation

}
export function updateConnectUsers(users){
  connectUsers=users
}
export function updateAllConversations(conversations){
  allConversation=conversations

}
export function updateTotalBalance(newBalance){
  totalBalance=newBalance

}
export function updateTotalFreeBalance(newBalance){
  totalFreeBalance=newBalance

}
export function updateNotifyNumber(number){
  if (number !== 0) {
    notifyNumber = notifyNumber + number;
  }
}


export function updatePhNValidation (bool){
  PhoneNumberValidation =bool
}
export function updateExpert(agent){
  expert = agent;

}

export function updateAgentClicked(agent){
  agentClicked = agent;
}
export function updateAgentName(agentName){
  senderName = agentName;
}

export function updateNewData(data){
  newData=data
}
export function updateFormData(data){
  initialFormData.first_name = data.firstname || null;
  initialFormData.last_name = data.lastname || null;
  initialFormData.email = data.email || null;
  initialFormData.country = data.country || null;
  initialFormData.phone = data.phone || null;
  initialFormData.gender = data.gender || null;
  initialFormData.date_birth = data.date_birth || null ;
  
}

// main.js

export function loadNewData() {
  return getCookie("myData") !== undefined ? JSON.parse(getCookie("myData")) : null;
}
export function updateCodeLimit(data) {
limitCode=data-1
}



export const displayedUsers = new Set();

$(document).ready(async function () {
  loadChatInformation()
  let params = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );
  showSpinner();
  getPlans();

  socketLib.connect(() => {
    if(params.action=="login"){
      socketLib.socket.emit(
        "login",
        {
          language:lan,
          browser: navigator.userAgent,
          platform: navigator.platform,
          accountId: params.account_id,
          username:params.username,
          profile_id:params.profile_id,
          contact_id:params.contact_id,
          action:params.action
        },
        (error) => {}
      );
      return;
    }
    if (
      !newData ||
      (params?.source == "gocc" &&
        (params?.contact || params?.lead) &&
        (params?.contact || params?.lead) != newData.sourceId)
    ) {
      socketLib.socket.emit(
        "createGuest",
        {
          language:lan,
          browser: navigator.userAgent,
          platform: navigator.platform,
          accountId: accountId,
          free_balance:message_limit,
          ...(params.contact
            ? { source: "gocc", contact_id: params.contact }
            : {}),
          ...(params.lead ? { source: "gocc", lead_id: params.lead } : {}),
        },
        (error) => {}
      );
      params = {};
    } else {
      socketLib.socket.emit("user-connected", {
        app_id: accountId,
        user: newData.contact,
        contact: newData.contact,
        action: "user-connected",
        metaData: {
          app_id: accountId,
          api_token: "123456789123456",
          user_id: newData?.user,
        },
        device: {
          ip: "123.213.121",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        },
      });
    }
  });

  function waitForConversationId(callback) {
    const maxAttempts = 20; 
    let attempts = 0;
  
    function checkConversationId() {
      if (conversationId !== undefined) {
        callback();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkConversationId, 600); 
      } else {
        console.error('Timed out waiting for conversationId');
      }
    }
  
    checkConversationId();
  }
 
  if(params.response && window.opener){
    window.opener.location=window.location
    window.close()
  }

  if (params.response === "ok") {
    waitForConversationId(function () {
      // Send event success purchase
      socketLib.saleSucceeded({
        id_company:newData.accountId,
        id_shop:params.id_shop,
        amount:params.amount,
        currency:params.currency,
        id_sale: params.id_sale,
        first_name:params.first_name,
        last_name:params.last_name,
        email:params.email,
        date_end: new Date(),
        contact: newData.contact,
        conversationId: conversationId,
        userId: newData.user,
        accountId: newData.accountId,
        messageId:params.message_id
      });
    });
  } else if (params.response === "ko") {
    waitForConversationId(function () {
      // Send event fail purchase
      // Update sale in the database status=params.status, id_sale=params.id_sale, reason=params.reason, date_end=DataNow()
      socketLib.saleFailed({
        id_sale: params?.id_sale,
        id_shop:params.id_shop,
        amount:params.amount,
        first_name:params.first_name,
        last_name:params.last_name,
        email:params.email,
        currency:params.currency,
        reason: params?.error_code,
        id_company: newData.accountId,
        date_end: new Date(),
      });

      try {
        modal.classList.add("hidden");

        // Create the modal container
        const modalContainer = document.createElement("div");
        modalContainer.className =
          "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5";
  
        // Create the background overlay
        const backgroundOverlay = document.createElement("div");
        backgroundOverlay.className =
          "absolute inset-0 bg-slate-900/60 transition-opacity duration-300";
  
        // Create the modal content
        const modalContent = document.createElement("div");
        modalContent.className =
          "relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5";
  
        // Add your modal content (replace data.balance and newBalance with actual values)
        modalContent.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <div class="mt-4" style="344px">
          <h2 class="text-2xl text-slate-700 dark:text-navy-100">
          ${getTranslationValue("modal.error")}
          </h2>
          <p class="mt-2">
          ${getTranslationValue("modal.fail")}
          </p>
          <button id="closeModal" class="btn mt-6 bg-error font-medium text-white hover:bg-success-focus focus:bg-error-focus active:bg-error-focus/90">
          ${getTranslationValue("modal.close")}
          </button>
        </div>
      `;
        
        // Append the elements to the modal container
        modalContainer.appendChild(backgroundOverlay);
        modalContainer.appendChild(modalContent);
  
        // Append the modal container to the document body
        document.body.appendChild(modalContainer);
  
        // Close modal event listener
        const closeModalButton = modalContent.querySelector("#closeModal");
        closeModalButton.addEventListener("click", function () {
          document.body.removeChild(modalContainer);
        });
      } catch (error) {
        console.error("Error displaying modal:", error);
      }
      //add log
    });
  }
  $(document).on('visibilitychange', function() {
    if (document.visibilityState === "visible") {
      changeTitle(0);
    }
  });
  

  



    // Get the current URL

let url = new URL(window.location.href);
url.search = ''; 
let newURL = url.toString(); 

// Update the browser's address bar
window.history.replaceState({}, document.title, newURL);

  socketLib.getAvailableAgent();
  socketLib.onDisconnected();
  socketLib.onConnected();
  //get all the connected user (the agents)
  socketLib.getUserPresntations(accountId);
  //Select Expert to chat with
  selectExpert();
  //get all the  conversations the user have
  //inform the other users except the sender about the new connection
  socketLib.userConnection();
  // on message sent , create a new message div and save it to the data base
  socketLib.onMessageSent();
  // when the message is being delivered
  socketLib.onMessageDelivered();
  //when the user receive a message
  socketLib.receiveMessage();
  //join member to conversation
  socketLib.joinMembers();
  //update conversation status , updated at ...
  socketLib.onConversationUpdated();
  notifyMe();
  //receive reaction
  socketLib.onReactMsg();
  //delete a reaction
  socketLib.onUnReactMsg();
  //receive pin message
  socketLib.onPinnedMsg();
  socketLib.onUnPinnedMsg();
  socketLib.accountExist()
  //unPin message
  socketLib.onUnPinnedMsg();
  //on Read message
  socketLib.onMessageRead();
  socketLib.onMessageDeleted();
  socketLib.onMessageUpdated();
  socketLib.onTypingStarted();
  socketLib.onBalanceStat();
  socketLib.onTypingStopped();
  socketLib.onGuestCreated();
  socketLib.planBought();
  socketLib.joinedDone();
  socketLib.onConversationStart();
  socketLib.conversationStatusUpdated();
  socketLib.linkClicked();
  socketLib.onConnectedError();
  socketLib.onGetUserPresntations();
  socketLib.onCheckConversation();
  socketLib.saleAdded();
  socketLib.onConnectedUserError()
  socketLib.onUserLogin()
  socketLib.wrongCode()
  socketLib.failedEmail()
  socketLib.successMail()
  document
    .querySelector("emoji-picker")
    .addEventListener("emoji-click", (event) => {
      messageInput.value = messageInput.value + event.detail.unicode;
    });
    
  socketLib.savedFormData();
  socketLib.failGuest();
  socketLib.mergeConversation();
  // socketLib.displayRobotAvatar();
  socketLib.getMessages();
  await getExperts();
  checkForExpertMessages()
  socketLib.formProfileResult()
  socketLib.displayAgentsMessage();
  socketLib.passwordResult()
  $(document).on("click", ".conversation-click", handleConversationClick);
  $(document).on("click", ".mini-conversation-click", handleConversationClick);
  $(document).on("click", "#emoji-button", showEmoji);
  $(document).on("click",'#button_password',verifyPassword)
  $(document).on("click",'#logOutButton',logOut)
  $(document).on("click",'#profileButton',verifyFormProfile)
if(newData){
  getContactInfo()
}




  

});
