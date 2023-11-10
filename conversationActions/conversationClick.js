import { MY_API_ADDRESS, accountId } from "../env.js";
import { getAgentPresentation } from "../general/getAgentPresentation.js";
import { allConversation, conversationHeaderStatus, conversationId, newData, socketLib, updateAgentClicked, updateAllConversations, updateConversationId, updateExpert } from "../main.js";
import { markMessageAsSeen } from "../messageActions/readMessage.js";
import { inputLEngth } from "../utils/resetCnvMaxLength.js";
import { getTranslationValue } from "../utils/traduction.js";
let messagesContainer = document.getElementById("big-container-message");
const $conversationContainer = $("#conversation-container");
const conversationContainer = document.getElementById("conversation-container");

export async function handleConversationClick() {
    updateAgentClicked($(this).parent().parent().data("user-id"))
    updateExpert($(this).parent().parent().data("user-id"))
  
    messagesContainer.innerHTML = "";
    
    const conversationActive = document.querySelectorAll(
      "div.conversation-click"
    );
  
    document.getElementById("big-container-message").style.display = "block";
    const conversation_id = $(this).data("conversation-id");
    updateConversationId(conversation_id)
  
    $conversationContainer.attr("data-conversation-id", conversationId);
  
    const name = this.dataset.name;
    let exist = allConversation.find(
      (conversation) => conversation._id == conversationId
    );
    if (!exist && conversation_id) {
      //get conversation_id  details with member_details
      const conversationsResponse = await axios.get(
        `${MY_API_ADDRESS}/conversation/${accountId}/?user_id=${newData.user}`
      );
  
      if (conversationsResponse.data.data.length > 0) {
        const conversations = conversationsResponse.data.data;
        updateAllConversations(conversations)
        exist = conversations.find(
          (conversation) => conversation._id === conversationId
        );
      }
    }
    inputLEngth(exist?.max_length_message);
    conversationActive.forEach((element) => {
      if (element.classList.contains("bg-slate-150"))
        element.classList.remove("bg-slate-150");
    });
  
    $(this).addClass("bg-slate-150");
    let agentContactId = exist.member_details
      .filter((member) => member.role == "AGENT" || member.role == "BOT")
      .map((agent) => agent.id);
    if (exist?.status == 1) {
      conversationHeaderStatus.dataset.translation = "general.online";
      conversationHeaderStatus.textContent =
        getTranslationValue("general.online");
  
      const activeUser = document.getElementById("active-user-header");
      activeUser.classList.remove("bg-slate-300");
      activeUser.classList.add("bg-success");
      getAgentPresentation(agentContactId[0], true);
    } else {
      conversationHeaderStatus.dataset.translation = "general.offline";
      conversationHeaderStatus.textContent =
        getTranslationValue("general.offline");
  
      const activeUser = document.getElementById("active-user-header");
      activeUser.classList.remove("bg-success");
      getAgentPresentation(agentContactId[0], false);
    }
    // Set the conversation ID as an attribute of the conversation container element
    const conversationName = document.getElementById("conversation-name");
    conversationName.textContent = name;
  
    // Load the first page of messages on page load
    let currentPage = 1;
  
    socketLib.loadMessages({ page: currentPage, conversationId: conversationId });
    // Update the active chat with the conversation data
  
    let activeChat = {
      chatId: conversationId,
      name: name,
      avatar_url: "images/avatar/avatar-" + agentContactId[0] + ".jpg",
    };
  
    window.dispatchEvent(
      new CustomEvent("change-active-chat", {
        detail: activeChat,
      })
    );
  
    markMessageAsSeen(conversationId);
  }


  export function showEmptyConversation(show = true) {
    conversationContainer.classList.toggle("has-not-messages", show);
  }
  
  