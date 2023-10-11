import { connectUsers, conversationHeaderStatus, conversationId, newData, socketLib, updateAgentClicked, updateAgentName, updateConversationId, updateExpert } from "../main.js";
const $conversationContainer = $("#conversation-container");

let messagesContainer = document.getElementById("big-container-message");

export async function selectAgent(agentId, agentName, UserID) {
    messagesContainer.innerHTML = "";
        updateExpert(agentId)
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
        ? "En ligne"
        : "last seen recently";
      const activeUser = document.getElementById("active-user-header");
      // activeUser.classList.remove("bg-slate-300")
      // activeUser.classList.add("bg-success")
      connectUsers.find((user) => user._id === agentId)
        ? activeUser.classList.add("bg-success")
        : activeUser.classList.remove("bg-success") &&
          activeUser.classList.add("bg-slate-300");
    }
  }
  
  export async function onCheckConversation(data, agentContactId, agentName) {
    if (!data.data) {
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
        let cnvId;
        cnvId = !data.data.conversation
        ? data.data[0]._id
        : data.data.conversation[0]._id;
        cnvId = data.data.conversation[0]._id;
        updateConversationId(cnvId)

      window.dispatchEvent(
        new CustomEvent("change-active-chat", {
          detail: {
            chatId: cnvId,
            name: agentName,
            avatar_url: `images/avatar/avatar-${agentContactId}` + ".jpg",
          },
        })
      );
      $conversationContainer.attr("data-conversation-id", conversationId);
      // Load the first page of messages on page load
      $(`.conversation-click[data-conversation-id="${conversationId}"]`).trigger(
        "click"
      );
      let currentPage = 1;
      socketLib.loadMessages({ page: currentPage, conversationId: conversationId });
    }
  }