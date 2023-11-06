import { accountId } from "../env.js";
import { conversationId, newData, socketLib } from "../main.js";
const messageInput = document.querySelector("#message-input");
let messagesContainer = document.getElementById("big-container-message");

let isFirstKeyPress = true; // flag to track the first key press

/* The above code is listening for the user to start typing and stop typing. */
if (messageInput) {
    messageInput.onkeydown = function () {
      if (isFirstKeyPress) {
        onStartTyping();
        isFirstKeyPress = false;
      }
    };
  
    // messageInput.onblur = function () {
    //   onStopTyping();
    // };
  }
  
function onStartTyping() {
    const onTypingStart = {
      app: accountId,
      user: newData.user,
      action: "typing.start",
      metaData: {
        conversation: conversationId,
      },
    };
    socketLib.startTyping(onTypingStart);
  }
  
  export function onStopTyping() {
    const onTypingStop = {
      app: accountId,
      user: newData?.user,
      action: "typing.stop",
      metaData: {
        conversation: conversationId,
      },
    };
    socketLib.stopTyping(onTypingStop);
    isFirstKeyPress = true; // Reset the flag for the next typing session
  }
  
  //start typing function
  let typingBlock = document.getElementById("typing-block-message");
  export function startTyping(data) {
    typingBlock = document.getElementById("typing-block-message");
    if (data.metaData.conversation == conversationId) {
      if (!typingBlock) {
        typingBlock = document.createElement("div");
        typingBlock.className = "w-100 p-3 d-flex";
        typingBlock.id = "typing-block-message";
        typingBlock.innerHTML = `
                        <div>
                          <div class="flex" class="pe-3">
                            <div
                              id="typing-display"
                              class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 relative "
                            >
                              <div class="d-flex">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="xMidYMid"
                                  style="background: none"
                                  width="45px"
                                  height="20px"
                                >
                                  <circle
                                    cy="62.5"
                                    fill="#C4C4C46b"
                                    r="20"
                                    cx="1.5"
                                  >
                                    <animate
                                      attributeName="cy"
                                      calcMode="spline"
                                      keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                                      repeatCount="indefinite"
                                      values="62.5;37.5;62.5;62.5"
                                      keyTimes="0;0.25;0.5;1"
                                      dur="1s"
                                      begin="-0.5s"
                                    ></animate>
                                  </circle>
                                  <circle
                                    cy="62.5"
                                    fill="#c4c4c498"
                                    r="20"
                                    cx="52.5"
                                  >
                                    <animate
                                      attributeName="cy"
                                      calcMode="spline"
                                      keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                                      repeatCount="indefinite"
                                      values="62.5;37.5;62.5;62.5"
                                      keyTimes="0;0.25;0.5;1"
                                      dur="1s"
                                      begin="-0.375s"
                                    ></animate>
                                  </circle>
                                  <circle
                                    cy="62.5"
                                    fill="#c4c4c4"
                                    r="20"
                                    cx="107.5"
                                  >
                                    <animate
                                      attributeName="cy"
                                      calcMode="spline"
                                      keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                                      repeatCount="indefinite"
                                      values="62.5;37.5;62.5;62.5"
                                      keyTimes="0;0.25;0.5;1"
                                      dur="1s"
                                      begin="-0.25s"
                                    ></animate>
                                  </circle>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>`;
        messagesContainer.appendChild(typingBlock);
      }
    }
    document
      .querySelector(
        `.conversationItem[data-conversation-id="${data.metaData.conversation}"]`
      )
      ?.classList.add("smallTyping");
  }
  
  export function stopTyping(data) {
    if (data.metaData.conversation === conversationId) {
      if (typingBlock) {
        typingBlock.remove();
      }
    }
    const typingBar = document.querySelector(
      `#left-conversation-${data.metaData.conversation}`
    );
    if (typingBar) {
      typingBar.classList.remove("smallTyping");
    }
  }