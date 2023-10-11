import { conversationId } from "../main.js";

export function changeHeaderPicture(cnv, agent, status) {
    if (conversationId == cnv) {
      const headerIconDiv = document.querySelector("#conversation-header-icon");
      const activeUserHeader = document.querySelector("#active-user-header");
  
      const conversationName = document.getElementById("conversation-name");
      conversationName.textContent = agent.full_name;
  
      if (headerIconDiv) {
        const imgElement = headerIconDiv.querySelector("img");
  
        if (imgElement) {
          imgElement.src = `images/avatar/avatar-${agent.id}.jpg`;
        }
      }
      if (activeUserHeader) {
        activeUserHeader.classList.remove("bg-slate-300", "bg-success");
  
        if (status === 0) {
          activeUserHeader?.classList?.add("bg-slate-300");
        } else if (status === 1) {
          activeUserHeader?.classList?.add("bg-success");
        }
      }
    }
  }