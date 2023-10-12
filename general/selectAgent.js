import { cnvBigSpinner } from "../components/spinner.js";
import { connectUsers, conversationHeaderStatus, conversationId, newData, socketLib, updateAgentClicked, updateAgentName, updateConversationId, updateExpert } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";
const $conversationContainer = $("#conversation-container");

let messagesContainer = document.getElementById("big-container-message");
export async function selectAgent(agentId, agentName, UserID) {
    messagesContainer.innerHTML = "";
    messagesContainer.innerHTML =cnvBigSpinner()
        updateAgentClicked(agentId)
        updateAgentName(agentName)

  
    if (newData.user) {
      socketLib.checkConversation({
        userId: newData.user,
        agentId: agentId,
        accountId: newData.accountId,
      });
  
      conversationHeaderStatus.textContent = connectUsers.find(
        (user) => user._id === agentId
      )
        ? getTranslationValue("general.online")
        : getTranslationValue("general.offline");
      const activeUser = document.getElementById("active-user-header");
      // activeUser.classList.remove("bg-slate-300")
      // activeUser.classList.add("bg-success")
      connectUsers.find((user) => user._id === agentId)
        ? activeUser.classList.add("bg-success")
        : activeUser.classList.remove("bg-success") &&
          activeUser.classList.add("bg-slate-300");
    }
  }
  
  export async function onCheckConversation(convId, agentContactId, agentName) {
    if (!convId) {
      updateConversationId("");
      messagesContainer.innerHTML = "";
      let activeChat = {
        chatId: conversationId,
        name: agentName,
        avatar_url: `images/avatar/avatar-${agentContactId}` + ".jpg",
      };
      window.dispatchEvent(
        new CustomEvent("change-active-chat", {
          detail: activeChat,
        })
      );
      $conversationContainer.attr("data-conversation-id", null);
      // showEmptyConversation();
    } else {
      messagesContainer.innerHTML = "";

        updateConversationId(convId)

      window.dispatchEvent(
        new CustomEvent("change-active-chat", {
          detail: {
            chatId: convId,
            name: agentName,
            avatar_url: `images/avatar/avatar-${agentContactId}` + ".jpg",
          },
        })
      );
      $conversationContainer.attr("data-conversation-id", convId);
      // Load the first page of messages on page load
      $(`.conversation-click[data-conversation-id="${convId}"]`).trigger(
        "click"
      );
      let currentPage = 1;
      socketLib.loadMessages({ page: currentPage, conversationId: convId });
    }
  }