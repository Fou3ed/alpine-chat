import { agentClicked, allConversation, connectUsers, conversationHeaderStatus, conversationId, traduction } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";

export function userConnection(data) {
    if (data.role === "AGENT") {
      allConversation.map((conv) => {
        const conversationCard = document.getElementById(
          `left-conversation-${conv._id}`
        );
        const leftConversationId = conversationCard.getAttribute('data-conversation-id');
  
        const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_on">${getTranslationValue(
          "left_side.experts_on"
        )}</span>`;
        $("#expert-msg").empty().append(html);
        const statusConv = conversationCard.querySelector("#active-user");
        const isConnected = conv.members.find(
          (user) => user.user_id === data._id
        );
        if(conversationId==leftConversationId){
            conversationHeaderStatus.textContent=getTranslationValue("general.online")
          conversationHeaderStatus.dataset.translation = "general.online";
  
        }
        
        if (isConnected) {
          statusConv.classList.remove("bg-slate-300");
          statusConv.classList.add("bg-success");
        }
      });
    }
  }
  //when an agent disconnect remove the card in the online agents block
  export function userDisconnection(data) {
    let conversationCard;
    allConversation.map((conv) => {
       conversationCard = document.getElementById(
        `left-conversation-${conv._id}`
      );
      const isConnected = conv.members.find((user) => user.user_id === data?._id);
  
      if (isConnected) {
        const agentCard = document.getElementById(`${data?._id}`);
        if (agentCard) agentCard.remove();
        document
          .querySelectorAll(
            `#left-conversation-${conv._id} #active-user, #left-mini-conversation-${conv._id} #active-user`
          )
          .forEach((statusConv) => {
            statusConv.classList.remove("bg-success");
            statusConv.classList.add("bg-slate-300");
          });
      }
    });
    const leftConversationId = conversationCard.getAttribute('data-conversation-id');
    if(conversationId==leftConversationId){
      
      conversationHeaderStatus.textContent=getTranslationValue("general.offline")
  
      conversationHeaderStatus.dataset.translation = "general.offline";
    }
    
    const agentCard = document.getElementById(`${data?._id}`);
    if (agentCard) {
      agentCard.remove();
    }
    if (agentClicked == data._id) {
      conversationHeaderStatus.dataset.translation = "lastSeen";
      conversationHeaderStatus.textContent = traduction.lastSeen;
    }
  }

  export function removeConnectUser(id) {
    connectUsers = connectUsers.filter(
      (connectedUser) => connectedUser._id !== id
    );
  }