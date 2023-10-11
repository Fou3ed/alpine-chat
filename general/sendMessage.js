import { msgButt } from "../components/msgButton.js";
import { showEmptyConversation } from "../conversationActions/conversationClick.js";
import { max_length_message } from "../env.js";
import { role } from "../lib_client/client_2.js";
import { conversationId, expert, newData, senderName,  socketLib,  totalBalance,  updateConversationId } from "../main.js";
import { getDeleteButtons } from "../messageActions/deleteMessage.js";
import { getEditButtons } from "../messageActions/editMessage.js";
import { getPinButtons } from "../messageActions/pinMessage.js";
import { reactions } from "../messageActions/reactMessage.js";
import { changeTitle } from "../utils/changeTitle.js";
import { resetMaxLength } from "../utils/resetCnvMaxLength.js";
import { getTranslationValue } from "../utils/traduction.js";
import { truncateMessage } from "../utils/truncateMessage.js";
const sendButton = document.querySelector("#send-message");
const messageInput = document.querySelector("#message-input");

const emoji = document.querySelector("emoji-picker");

const leftConversationContainer = document.getElementById("left-conversation");
const conversationContainer = document.getElementById("conversation-container");
const minimizedSideBar = document.getElementById("mini-sidebar");

let messagesContainer = document.getElementById("big-container-message");

export async function sentMessage(data) {
    showEmptyConversation(false);
    resetMaxLength(max_length_message);
   
    updateConversationId(data.conversation)
    let conv = conversationContainer.dataset.conversationId;
    const isNotNewConversation = document.querySelector(
      `#left-conversation-${data.conversation}`
    );
    const timestamp = data.date;
    const date = new Date(timestamp);
    const day = date.toLocaleString("en-us", {
      weekday: "long",
    });
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, "0");
    const time = `${hour}:${minute}`;
    if (!isNotNewConversation) {
      // const newConvDiv = document.createElement("div");
      // const newminiconDiv = document.createElement("div");
  
      const conversationActive = document.querySelectorAll(
        "div.conversation-click"
      );
      conversationActive.forEach((element) => {
        if (element.classList.contains("bg-slate-150"))
          element.classList.remove("bg-slate-150");
      });
    } else {
      let userLog = "";
      const convMessage = isNotNewConversation.querySelector("#last-message");
      if (data.type === "log") {
        const log = JSON.parse(data.content);
        if (log.action === "purchase completed") {
          switch (log.action) {
            case "fill":
              userLog = `You filled on the form.`;
              break;
            case "focus":
              userLog = `You  focus on the form.`;
              break;
            case "purchase":
              userLog = `You  purchased the <b> ${log.plan_name} </b>plan.`;
              break;
            case "start form":
              userLog = `You  start submit the form.`;
              break;
            case "end form":
              userLog = `You  end submit the form.`;
              break;
            case "start purchase":
              userLog = `You  start purchase a plan.`;
              break;
            case "link click":
              userLog = `You click to link.`;
              break;
            case "purchase completed":
              userLog = `${getTranslationValue("bought.purchase")}`;
              break;
            case "purchase went wrong":
              userLog = `Purchase went  wrong.`;
              break;
          }
          convMessage.textContent = userLog;
        }
      } else convMessage.textContent = truncateMessage(data.content, 20);
    }
    if (data.conversation === conv) {
      const messageId = data.id;
      const messageContainer = document.getElementById(`message-${messageId}`);
      messagesContainer = document.getElementById("big-container-message");
      if (!messageContainer) {
        if (data.type === "log") {
          const log = JSON.parse(data.content);
          if (log.action === "purchase completed") {
            let userLog = "";
            switch (log.action) {
              case "fill":
                userLog = `You filled on the form.`;
                break;
              case "focus":
                userLog = `You focus on the form.`;
                break;
              case "purchase":
                userLog = `You purchased the <b> ${log.plan_name} </b>plan.`;
                break;
              case "start form":
                userLog = `You start submit the form.`;
                break;
              case "end form":
                userLog = `You end submit the form.`;
                break;
              case "start purchase":
                userLog = `You start purchase a plan.`;
                break;
              case "link click":
                userLog = `You click to link.`;
                break;
              case "purchase completed":
                userLog = `${getTranslationValue("bought.purchase")}`;
                break;
              case "purchase went wrong":
                userLog = `Purchase went wrong.`;
                break;
            }
            const newDivMsg = document.createElement("div");
            newDivMsg.innerHTML = ` <div
          class="flex justify-center items-center w-100 m-2"
          id="msg-${data._id}"
          >
          <span class="logs-notification">
          ${userLog}
          </span>
          </div>`;
            let typingBlock = document.getElementById("typing-block-message");
            messagesContainer.insertBefore(newDivMsg, typingBlock);
          }
        } else {
          let direction = data.direction == "in" ? "justify-end" : "";
          const msgStyle =
            role === "GUEST"
              ? `rounded-2xl break-words  rounded-tl-none bg-msg p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100`
              : `rounded-2xl break-words  rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white`;
          messagesContainer.style.display = "block";
          messagesContainer.insertAdjacentHTML(
            "beforeend",
            `
          <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
            <div class="flex flex-col items-end space-y-3.5">
              <div class="flex flex-row">
                ${
                  data.direction == "in"
                    ? msgButt(messageId, direction, data.pinned === 1)
                    : ""
                }
                <div class="ml-2 max-w-lg sm:ml-5">
                  <div class="${msgStyle}" id="message-content-${messageId}">
                    ${data.content} 
                    <div id="pin-div" class="hidden ${
                      direction == "justify-start" ? "pin-div-sender" : "pin-div"
                    } justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                  </div>
                
                </div>
             
                ${
                  data.direction == "out"
                    ? msgButt(messageId, direction, data.pinned === 1)
                    : ""
                }
              </div>
              <p id="date_msg" data-direction="${direction}" class="mt-1 ml-10 text-left text-xs text-slate-400 dark:text-navy-300"> <!-- Adjusted ml-10 -->
              ${
                time + `<i class="fas fa-check ps-2" style="font-size:10px;"></i>`
              }       
            </p>
            </div>
        
          </div>
       
          </div>
          `
          );
          if (data.type === "MSG") {
            const messageElement = document.getElementById(
              `message-${messageId}`
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
      }
      if(data.type !="log"){
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
      
      }    
      getDeleteButtons();
      getEditButtons();
      getPinButtons();
      reactions();
    }
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
    if (isSendingMessage) return; // If a message is already being sent, ignore the function call
  
    if (messageInput.value.trim() !== "") {
      isSendingMessage = true; // Set the sending state to true
  
      if (!emoji.classList.contains("hidden")) emoji.classList.add("hidden");
      if (conversationId == "") {
        try {
          socketLib.createConversation({
            app: "638dc76312488c6bf67e8fc0",
            user: newData.user,
            action: "conversation.create",
            metaData: {
              name: senderName,
              channel_url: "socketLib/test",
              conversation_type: "1",
              description: "private chat",
              owner_id: newData.accountId,
              members: [newData.user, expert],
              permissions: {},
              members_count: 2,
              status: "0",
              max_length_message: max_length_message,
            },
          });
        } catch (error) {
          console.log(error);
          isSendingMessage = false;
        }
      } else {
        try {
          if (role === "GUEST" || totalBalance > 0) {
            socketLib.onCreateMessage({
              app: "638dc76312488c6bf67e8fc0",
              user: newData.user,
              action: "message.create",
              metaData: {
                type: "MSG",
                conversation_id: conversationId,
                user: newData.user,
                message: messageInput.value,
                data: "non other data",
                origin: "web",
              },
              to: expert,
              balance: totalBalance?.balance,
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