import { connectUsers, socketLib, newData, updateAgentClicked, updateAgentName, updateExpert, traduction } from "../main.js";
import { getAgentPresentation } from "./getAgentPresentation.js";
let messagesContainer = document.getElementById("big-container-message");
const conversationHeaderStatus = document
  .getElementById("conversation-name")
  .parentNode.querySelector(".text-xs");
export async function selectExpert() {
  
    $(".swiper-wrapper").on("click", ".swiper-slide", async function () {
      if (newData.status == "1") {
        // messagesContainer.innerHTML = "";
        // Get the unique ID of the agent clicked
        const agent = $(this).attr("id");
        const name = $(this).data("name");
        const agentContactId = connectUsers.find((user) => user._id === agent);
        if (name === "Robot" || name === "Rosie") {
          getAgentPresentation("0", true);
        } else {
          getAgentPresentation(agentContactId.id, true);
        }
        updateAgentName(name)
        updateExpert(agent)
        updateAgentClicked(agent)
        

        const $conversationContainer = $("#conversation-container");
        // Check if they both have conversation, if yes, just handle click to left conversation
        if (newData.user) {
          // const response = await axios.get(
          //   `https://socketLib.local.itwise.pro/socket_api/conversation/?user1=${newData.user}&user2=${agent}`
          // );
          socketLib.checkConversation({
            userId: newData.user,
            agentId: agent,
            accountId: newData.accountId,
          });
          conversationHeaderStatus.dataset.translation = connectUsers.find(
            (user) => user._id === agent
          )
            ? "general.online"
            : "general.offline";
          conversationHeaderStatus.textContent =
            traduction[conversationHeaderStatus.dataset.translation];
  
          const activeUser = document.getElementById("active-user-header");
          activeUser.classList.remove("bg-slate-300");
          activeUser.classList.add("bg-success");
          // if (!response.data.data) {
          //   conversationId = "";
          //   messagesContainer.innerHTML = "";
  
          //   let activeChat = {
          //     chatId: conversationId,
          //     name: name,
          //     avatar_url: `images/avatar/avatar-${agentContactId.id}` + ".jpg",
          //   };
          //   window.dispatchEvent(
          //     new CustomEvent("change-active-chat", {
          //       detail: activeChat,
          //     })
          //   );
  
          //   $conversationContainer.attr("data-conversation-id", null);
          // } else {
          //   conversationId = !response.data.data.conversation
          //     ? response.data.data[0]._id
          //     : response.data.data.conversation[0]._id;
          //   // Update the active chat with the conversation data
          //   window.dispatchEvent(
          //     new CustomEvent("change-active-chat", {
          //       detail: {
          //         chatId: conversationId,
          //         name: name,
          //         avatar_url:
          //           `images/avatar/avatar-${agentContactId.id}` + ".jpg",
          //       },
          //     })
          //   );
          //   expert = agent;
          //   $conversationContainer.attr("data-conversation-id", conversationId);
          //   // Load the first page of messages on page load
          //   let currentPage = 1;
          //   socketLib.loadMessages({
          //     page: currentPage,
          //     conversationId: conversationId,
          //   });
          // }
        }
      } else {
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `
      <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
        <div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
        <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
  
          <div class="mt-4" style="width:344px" >
            <h2 class="text-2xl text-slate-700 dark:text-navy-100">
              Welcome to Dellastro
            </h2>
            <p class="mt-2">
              Please feel free to fill the form .
            </p>
            <button @click="showModal = false" class="btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90">
              Close
            </button>
          </div>
        </div>
      </div>
      `;
  
        // Hide the modal when the Close button is pressed
        const closeButton = modalDiv.querySelector("button");
        closeButton.addEventListener("click", () => {
          document.body.removeChild(modalDiv);
        });
        document.body.appendChild(modalDiv);
      }
    });
  }