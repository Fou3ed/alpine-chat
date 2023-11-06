import { accountId } from "../env.js";
import { conversationId, newData, socketLib } from "../main.js";

export async function getEditButtons() {
    const allEditButtons = document.querySelectorAll("#edit-message");
    allEditButtons.forEach((editButton) => {
      editButton.onclick = function () {
        editMessage(this);
      };
    });
  }
  
  // click to update message
  export async function editMessage(button) {
    let messageId = button.dataset.messageId;
    const messageEdited = document.getElementById(`message-content-${messageId}`);
    const reactContent = document.querySelector(`#react-content-${messageId}`);
    if (reactContent)
      document.querySelector(`#react-content-${messageId}`).remove();
    const input = document.createElement("input");
    input.value = messageEdited.textContent.trim();
    input.style.width = "500px";
    input.classList.add(
      "rounded-2xl",
      "rounded-tr-none",
      "p-3",
      "shadow-sm",
      "dark:text-white",
      "relative",
      "bg-info",
      "text-white",
      "dark:bg-accent-focus"
    );
    messageEdited.replaceWith(input);
    input.focus();
    input.id = `edit-input-${messageId}`;
    input.addEventListener("keydown", function (event) {
      if (event.keyCode === 13) {
        const newContent = this.value.trim();
        const onMessageUpdate = {
          app: accountId,
          user: newData.user,
          action: "message.update",
          metaData: {
            conversation: conversationId,
            message: messageId,
            fields: {
              content: newContent,
            },
          },
        };
        socketLib.updateMessage(onMessageUpdate);
      }
    });
    // messageEdited.innerHTML=`<input class="bg-transparent border-none "  value="${messageEdited.textContent.trim()} "    >`
  }


  export async function updateMessage(data) {
    const date = new Date(data.res.updated_at);
    const today = new Date();
    let timeMsg = "";
    if (date.toDateString() === today.toDateString()) {
      const timeString = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      timeMsg = timeString;
    } else {
      const dateString = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeString = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      const formattedString = `${dateString} ${timeString}`;
      timeMsg = formattedString;
    }
  
    if (data.res.user === newData.user) {
      const input = document.getElementById(`edit-input-${data.res._id}`);
      const newMessage = document.createElement("div");
      newMessage.id = `message-content-${data?.res._id}`;
      newMessage.classList.add(
        "rounded-2xl",
        "rounded-tr-none",
        "p-3",
        "shadow-sm",
        "dark:text-white",
        "relative",
        "bg-info",
        "text-white",
        "dark:bg-accent-focus"
      );
      newMessage.textContent = data.res.message;
      const leftConversation = document.querySelector(
        `[data-conversation-id="${data.res.conversation_id}"]`
      );
      const pElement = leftConversation.querySelector(".conversationLeftMsg p");
      pElement.textContent = `${data.res.message} `;
      input.replaceWith(newMessage);
      newMessage
        .closest(`#message-${data.res._id}`)
        .querySelector("#date_msg").textContent = "(Updated) " + timeMsg;
      newMessage.innerHTML += ` <div id="pin-div" class=" ${
        data.res.pinned === 0 || data.res.status === 0 ? "hidden" : "flex"
      } ${"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>`;
      if (data.res.reacts.length > 0) {
        let messageReactions = data.res.reacts.map((react) => {
          return `
        <a id="react-${react._id}" ${
            newData.user !== react.user_id ? 'style="pointer-events: none"' : ""
          }> ${react.path}</a>
          `;
        });
  
        newMessage.innerHTML += `<div class="react-container bg-white  dark:bg-navy-700" id="react-content-${
          data.res._id
        }" >${messageReactions.join("")} </div>`;
      }
    } else {
      const messageEdited = document.getElementById(
        `message-content-${data.res?._id}`
      );
      messageEdited.classList.add("bg-navy-100", "dark:bg-navy-500");
      messageEdited.textContent = data.res.message;
      const timeSpan = messageEdited.parentNode.querySelector("p");
      timeSpan.innerHTML = `(Updated) ${timeMsg}`;
      messageEdited.innerHTML += ` <div id="pin-div" class=" ${
        data.res.pinned === 0 || data.res.status === 0 ? "hidden" : "flex"
      } ${"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>`;
      if (data.res.reacts.length > 0) {
        let messageReactions = data.res.reacts.map((react) => {
          return `
        <a id="react-${react._id}" ${
            newData.user !== react.user_id ? 'style="pointer-events: none"' : ""
          }> ${react.path}</a>
          `;
        });
        messageEdited.innerHTML += `<div class="react-container bg-white  dark:bg-navy-700" id="react-content-${
          data.res._id
        }" >${messageReactions.join("")} </div>`;
      }
    }
  }
  // 