import { max_length_message } from "../env.js";
import { timeString, updateConversationId, updateExpert, updateNewData } from "../main.js";
import { inputLEngth } from "../utils/resetCnvMaxLength.js";
const leftConversationContainer = document.getElementById("left-conversation");

export async function guestCreated(data) {
    const newUser = {
      user: data.user,
      contact: data.contact,
      accountId: data.accountId,
      status: 0,
      ...(data.goccContactId && { goccContactId: data.goccContactId }),
      ...(data.goccLeadId && { goccLeadId: data.goccLeadId }),
    };

    updateNewData(newUser)
    document.cookie =
      "myData=" +
      JSON.stringify(newUser) +
      "; expires=Tue, 31 Dec 9999 23:59:59 GMT; path=/";
  
    const usernameLink = document.querySelector("#userName");
    const clientIdElement = document.querySelector("#clientId");
    if (usernameLink) {
      usernameLink.textContent = `Guest #${data.contact}`;
      clientIdElement.textContent = `Client ID : #${data.contact}`;
    }
    updateExpert(data.availableAgent)
    updateConversationId(data.conversationId)
   
    const html = `
    <div class="conversationItem conversation bg-slate-150" data-conversation-id="${
      data.conversationId
    }" data-name=${
      data.senderName
    } data-timestamp=${timeString} id="left-conversation-${
      data.conversationId
    }" data-user-id="${data.availableAgent}">
      <div class="is-scrollbar-hidden mt-3 flex grow flex-col overflow-y-auto">
        <div
          class="conversation-click flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600"
          data-conversation-id="${data.conversationId}"
          data-name=${data.senderName}>
          <div class="avatar h-10 w-10">
            <img class="rounded-full" src=images/avatar/avatar-${
              data.user.id
            }.jpg alt="avatar" />
            <div
            id="active-user"
              class="absolute right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-navy-700">
            </div>
          </div>
          <div class="flex flex-1 flex-col">
            <div class="flex items-baseline justify-between space-x-1.5">
              <p  ${
                data.role === "BOT" ? "data-robot" : ""
              } data-conversation-name class="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
              ${data.senderName}
              </p>
              <span class="text-tiny+ text-slate-400 dark:text-navy-300">${timeString}</span>
            </div>
            <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftMsg"> 
              <p class="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300" id="last-message">
                Contact form 
              </p>
         
            </div>
            
  
            <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftTyping"> 
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
    const newConvDiv = document.createElement("div");
    inputLEngth(max_length_message);
    // Append the HTML to the container
    newConvDiv.innerHTML = html;
    leftConversationContainer.insertBefore(
      newConvDiv,
      leftConversationContainer.firstChild
    );
  }