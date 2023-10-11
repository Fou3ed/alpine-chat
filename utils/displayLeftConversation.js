import { connectUsers, timeString } from "../main.js";
import { getTranslationValue } from "./traduction.js";
const leftConversationContainer = document.getElementById("left-conversation");
const minimizedSideBar = document.getElementById("mini-sidebar");

export function displayLeftConversation(data) {
    const isNotNewConversation = document.querySelector(
      `#left-conversation-${data.conversationId}`
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
      const newConvDiv = document.createElement("div");
      const newminiconDiv = document.createElement("div");
  
      const conversationActive = document.querySelectorAll(
        "div.conversation-click"
      );
      conversationActive.forEach((element) => {
        if (element.classList.contains("bg-slate-150"))
          element.classList.remove("bg-slate-150");
      });
      const agentContactId = connectUsers.find(
        (user) => user._id === data.agentId
      );
      const html = `
      <div class="conversationItem conversation bg-slate-150" data-conversation-id="${
        data.conversationId
      }" data-name=${
        data.senderName
      } data-timestamp=${timeString} id="left-conversation-${
        data.conversationId
      }" data-user-id="${data.agentId}">
        <div class="is-scrollbar-hidden mt-3 flex grow flex-col overflow-y-auto">
          <div
            class="conversation-click flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600"
            data-conversation-id="${data.conversationId}"
            data-name=${data.senderName}>
            <div class="avatar h-10 w-10">
              <img class="rounded-full"  src=images/avatar/avatar-${
                data.contactAgentId
              }.jpg alt="image" />
              <div
              id=${data.agentId}
                class="absolute right-0 h-3 w-3 rounded-full border-2 border-white ${
                  agentContactId?.is_active ? "bg-success" : "bg-slate-300"
                } dark:border-navy-700">
              </div>
            </div>
            <div class="flex flex-1 flex-col">
              <div class="flex items-baseline justify-between space-x-1.5">
                <p  data-conversation-name class="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
                ${data.senderName}
                </p>
                <span class="text-tiny+ text-slate-400 dark:text-navy-300">${timeString}</span>
              </div>
              <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftMsg"> 
                <p class="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300" id="last-message" data-translation="left_side.tab_1.sent_form">
                 ${getTranslationValue("left_side.tab_1.sent_form")}
                </p>
           
              </div>
              <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftTyping "> 
              
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
              </div>
           
              </div>
            </div>
          </div>
        </div>
      </div>`;
      newConvDiv.innerHTML = html;
      leftConversationContainer.insertBefore(
        newConvDiv,
        leftConversationContainer.firstChild
      );
      const minimizedHtmlSideBar = `
      <div class="mini-conversation-click flex cursor-pointer items-center justify-center py-2.5 hover:bg-slate-150 dark:hover:bg-navy-600 conversation " data-conversation-id="${
        data.conversationId
      }" data-user-id="${data.agentId}" data-name="${
        data.senderName
      }" data-timestamp="${timestamp}" id="left-mini-conversation-${
        data.conversationId
      }">
                      <div class=" avatar h-10 w-10" >
                        <img class="rounded-full" src=images/avatar/avatar-${
                          data.contactAgentId
                        }.jpg alt="image">
                        <div id="active-user" class="absolute right-0 h-3 w-3 rounded-full border-2 border-white ${
                          agentContactId?.is_active
                            ? "bg-success"
                            : "bg-slate-300"
                        }  dark:border-navy-700"></div>
                      </div>
                    </div>
      `;
  
      const existingElement = document.querySelector(
        `#left-mini-conversation-${data.conversation}`
      );
  
      if (!existingElement) {
        newminiconDiv.innerHTML = minimizedHtmlSideBar;
        minimizedSideBar.insertBefore(newminiconDiv, minimizedSideBar.firstChild);
      }
    }
  }