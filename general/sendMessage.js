import {
  msgButt
} from "../components/msgButton.js";
import {
  showEmptyConversation
} from "../conversationActions/conversationClick.js";
import {
  accountId,
  max_length_message
} from "../env.js";
import {
  conversationId,
  expert,
  newData,
  socketLib,
  totalBalance,
  totalFreeBalance,
  updateConversationId
} from "../main.js";
import {
  getDeleteButtons
} from "../messageActions/deleteMessage.js";
import {
  getEditButtons
} from "../messageActions/editMessage.js";
import {
  getPinButtons
} from "../messageActions/pinMessage.js";
import {
  reactions
} from "../messageActions/reactMessage.js";
import {
  changeTitle
} from "../utils/changeTitle.js";
import {
  resetMaxLength
} from "../utils/resetCnvMaxLength.js";
import {
  getTranslationValue
} from "../utils/traduction.js";
import {
  truncateMessage
} from "../utils/truncateMessage.js";
const sendButton = document.querySelector("#send-message");
const messageInput = document.querySelector("#message-input");

const emoji = document.querySelector("emoji-picker");

const leftConversationContainer = document.getElementById("left-conversation");
const conversationContainer = document.getElementById("conversation-container");
const minimizedSideBar = document.getElementById("mini-sidebar");

let messagesContainer = document.getElementById("big-container-message");

export async function sentMessage(data) {
  // Update IDs
  document.querySelector(`#message-${data.temporary_id}`)?.setAttribute('id', `message-${data.id}`);
  document.querySelector(`#message-content-${data.temporary_id}`)?.setAttribute('id', `message-content-${data.id}`);

  // Update data-message-id attributes
  document.querySelectorAll('[data-message-id]').forEach(element => {
    element.setAttribute('data-message-id', element.getAttribute('data-message-id').replace(`${data.temporary_id}`, data.id));
  });

  // Replace the spinner with the "fa-check" icon
  const spinnerElement = document.querySelector('.fa-spinner');
  if (spinnerElement) {
    spinnerElement.outerHTML = `<i class="fas fa-check ps-2" style="font-size:10px;"></i>`;
  }

  // Get buttons
  getDeleteButtons();
  getEditButtons();
  getPinButtons();
  reactions();
}





if (messageInput) {
  messageInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.maxHeight = "250px";
    this.style.height = this.scrollHeight + "px";
  });
  messageInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (messageInput.value !== "") sendMessage();
    }
  });
}

if (sendButton)
  sendButton.addEventListener("click", async () => {
    sendMessage();
  });


let isSendingMessage = false;

export async function sendMessage() {
  if (isSendingMessage) return;

  if (messageInput.value.trim() !== "") {
    isSendingMessage = true;

    if (!emoji.classList.contains("hidden")) emoji.classList.add("hidden");
    if (conversationId) {
      try {
        if (totalBalance > 0 || totalFreeBalance > 0) {
          const messageId = Math.floor(Math.random() * Date.now())

          displayMessageSent({
            content: messageInput.value,
            type: "MSG",
            messageId: messageId

          })

          socketLib.onCreateMessage({
            app: accountId,
            user: newData.user,
            action: "message.create",
            metaData: {
              type: "MSG",
              conversation_id: conversationId,
              user: newData.user,
              message: messageInput.value,
              data: "non other data",
              origin: "web",
              temporary_id: messageId

            },
            to: expert,
            // balance: totalBalance?.balance,
            // freeBalance:totalFreeBalance
          });
        }
        messageInput.value = "";
        isSendingMessage = false;
      } catch (error) {
        isSendingMessage = false;
        throw new Error("Failed to send message");
      }
    }
  }
}


async function displayMessageSent(data) {
  console.log(data)
  //data.conversation is conversationId
  showEmptyConversation(false);
  resetMaxLength(max_length_message);
  let conv = conversationContainer.dataset.conversationId;
  const isNotNewConversation = document.querySelector(
    `#left-conversation-${conversationId}`
  );


  //import time from getTime
  if (!isNotNewConversation) {

    const conversationActive = document.querySelectorAll(
      "div.conversation-click"
    );
    conversationActive.forEach((element) => {
      if (element.classList.contains("bg-slate-150"))
        element.classList.remove("bg-slate-150");
    });
  } else {
    const convMessage = isNotNewConversation.querySelector("#last-message");

  }

  if (conversationId === conv) {
    //temporary Id
    const messageContainer = document.getElementById(`message-${data.messageId}`);
    messagesContainer = document.getElementById("big-container-message");

    if (!messageContainer) {
      const timestamp = Date.now()
      const date = new Date(timestamp);
      const day = date.toLocaleString("en-us", {
        weekday: "long",
      });
      const hour = date.getHours();
      const minute = date.getMinutes().toString().padStart(2, "0");
      const time = `${hour}:${minute}`;
      const msgStyle = !data.paid ?
        `rounded-2xl break-words  rounded-tl-none bg-msg p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100` :
        `rounded-2xl break-words  rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white`;
      messagesContainer.style.display = "block";
      messagesContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div id="message-${data.messageId}" class="flex items-start justify-end space-x-2.5 sm:space-x-5">
        <div class="flex flex-col items-end space-y-3.5">
          <div class="flex flex-row">
            ${
           
                 msgButt(data.messageId, "justify-end" , data.pinned === 1)
                
            }
            <div class="ml-2 max-w-lg sm:ml-5">
              <div class="${msgStyle}" id="message-content-${data.messageId}">
                ${data.content} 
                <div id="pin-div" class="hidden 
                  pin-div
                justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
              </div>
            
            </div>
         
            
          </div>
          <p id="date_msg" data-direction="justify-end" class="mt-1 ml-10 text-left text-xs text-slate-400 dark:text-navy-300">
          ${time}
          <i class="fas fa-spinner fa-spin ps-2" style="font-size:10px;"></i>
        </p>
        
        </div>
    
      </div>
   
      </div>
      `
      );
      if (data.type === "MSG") {
        const messageElement = document.getElementById(
          `message-${data.messageId}`
        );
        const msgButtContainer = messageElement.querySelector(
          ".msg-butt-container"
        );
        const reactButtContainer = messageElement.querySelector(
          ".react-butt-container"
        );
        messageElement.addEventListener("mouseenter", () => {
          msgButtContainer.style.display = "block";
          reactButtContainer.style.display = "block";
        });

        messageElement.addEventListener("mouseleave", () => {
          msgButtContainer.style.display = "none";
          reactButtContainer.style.display = "none";
        });
      }

      changeTitle(0);
      const msgDiv = document.getElementById(
        `left-conversation-${conversationId}`
      );
      const msgDivMini = document.getElementById(
        `left-mini-conversation-${conversationId}`
      );
      if (msgDiv) {
        const msgText = msgDiv.querySelector("#last-message");
        msgText.textContent = `${getTranslationValue(
          "general.me"
        )} :  ${truncateMessage(data.content, 20)}`;
        leftConversationContainer.insertBefore(
          msgDiv,
          leftConversationContainer.firstChild
        );
      }
      if (msgDivMini) {
        minimizedSideBar.insertBefore(
          msgDivMini,
          minimizedSideBar.firstChild
        );
      }

    }
    if (data.type != "log") {
      conversationContainer.scrollTop = conversationContainer.scrollHeight;

    }


  }
}