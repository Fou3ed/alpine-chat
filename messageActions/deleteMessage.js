import { accountId } from "../env.js";
import { conversationId, newData, socketLib } from "../main.js";

export async function getDeleteButtons() {
    const allDeleteButtons = document.querySelectorAll("#delete-message");
    allDeleteButtons.forEach((deleteButton) => {
      deleteButton.onclick = function () {
        deleteMessage(this);
      };
    });
  }
  
export async function deleteMessage(button) {
    const dropDown = button.parentNode.parentNode.parentNode;
    dropDown.classList.add("hidden");
    let modal = document.getElementById("myModal");
    let span = modal.querySelector(".close");
    let closeModal = modal.querySelector("#closeModal");
    let deleteButton = modal.querySelector("#deleteButton");
    span.onclick = function () {
      modal.classList.add("hidden");
    };
    closeModal.onclick = function () {
      modal.classList.add("hidden");
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.classList.add("hidden");
      }
    };
  
    modal.classList.remove("hidden");
    deleteButton.onclick = function () {
      let messageId = button.dataset.messageId;
      const onMessageDelete = {
        app: accountId,
        user: newData.user,
        action: "message.delete",
        metaData: {
          conversation: conversationId,
          message: messageId,
        },
      };
      socketLib.deleteMessage(onMessageDelete);
      modal.classList.add("hidden");
    };
  }
  

  export async function messageDeleted(data) {
    const messageDeleted = document.getElementById(
      `message-content-${data.result._id}`
    );
    messageDeleted.innerHTML = `${data.userData.full_name} unsent a message`;
    messageDeleted.classList.add(
      "bg-transparent",
      "border-2",
      "border-info/10",
      "dark:border-navy-700"
    );
  
    const leftConversation = document.querySelector(
      `[data-conversation-id="${data.result.conversation_id}"]`
    );
    const pElement = leftConversation.querySelector(".conversationLeftMsg p");
    pElement.textContent = `${data.userData.full_name} unsent a message`;
  
    const direction = messageDeleted.parentNode.querySelector("p").dataset.direction;
  
    if (direction == "justify-end") {
      messageDeleted.classList.remove("bg-info/10", "dark:bg-accent");
      messageDeleted.innerHTML = `You unsent a message`;
    } else {
      messageDeleted.innerHTML = `${data.userData.full_name} unsent a message`;
      messageDeleted.classList.remove("bg-white", "dark:bg-navy-700");
    }
  
    const parentDiv = document.getElementById(`message-${data.result._id}`);
    if (parentDiv) {
      const messageOptionsDivs = parentDiv.querySelectorAll("#message-options");
      messageOptionsDivs.forEach((div) => div.remove());
    }
  }
  
  