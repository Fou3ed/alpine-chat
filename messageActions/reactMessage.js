import { accountId } from "../env.js";
import { conversationId, newData } from "../main.js";


const conversationContainer = document.getElementById("conversation-container");


export async function getReactButton() {
  const toUnReact = document.querySelectorAll(".react-container");

  for (const reactContainer of toUnReact) {
    const allReacts = reactContainer.querySelectorAll("a");
    allReacts.forEach((react) => {
      if (!react.hasAttribute("data-event-listener")) {
        react.onclick = function () {
          onUnReactToMessage(this);
        };
        react.setAttribute("data-event-listener", true);
      }
    });
  }
}

export async function reactions() {
    if (conversationContainer.dataset.conversationId === conversationId) {
      let reactButtons = conversationContainer.querySelectorAll("#react-message");
      reactButtons.forEach((reactButton) => {
        // Check if event listener is already attached
        if (!reactButton.hasAttribute("data-event-listener")) {
          reactButton.addEventListener("click", function () {
            onReactToMessage(this);
          });
          reactButton.setAttribute("data-event-listener", true); // Set flag indicating the event listener is attached
        }
      });
    }
    getReactButton();
  }


  function onReactToMessage(button) {
    let reaction = button.parentNode;
    let messageId = reaction.parentNode.parentNode.dataset.messageId;
    let react = button.textContent;
  
    const onMessageReact = {
      app: accountId,
      user: newData.user,
      action: "message.react",
      metaData: {
        conversation: conversationId,
        message_id: messageId,
        type: "react",
        user_id: newData.user,
        path: react,
      },
    };
    socketLib.reactMsg(onMessageReact);
    playNotificationSound();
  }



  async function onUnReactToMessage(button) {
    let messageId = button.id.replace("react-", "");
    let react = button.textContent;
    // Construct metadata for removing the reaction
    // Call the UnReact function with the metadata object
    socketLib.unReactMsg({
      app: accountId,
      user: newData.user,
      action: "message.Unreact",
      metaData: {
        conversation: conversationId,
        message_id: messageId,
        type: "unReact",
        user_id: newData.user,
        path: react,
      },
    });
  }
  
  export async function reactHide(data) {
    if (data.user_id === newData.user) {
      const reactElement = document.getElementById(`react-${data._id}`);
      if (reactElement) reactElement.remove();
    }
  }
  
  export async function reactDisplay(data) {
    const reactData = data.metaData ? data.metaData : data;
    const msgReacted = messagesContainer.querySelector(
      `#message-content-${reactData.message_id}`
    );
    let react = document.getElementById(`react-${reactData._id}`);
    let reactContent = document.getElementById(
      `react-content-${reactData.message_id}`
    );
  
    if (reactContent) {
      if (react) {
        react.innerHTML = reactData.path;
      } else {
        reactContent.innerHTML += `<a id="react-${reactData._id}" ${
          newData.user !== reactData.user_id ? 'style="pointer-events: none"' : ""
        }> ${reactData.path}</a>`;
      }
    } else {
      msgReacted.innerHTML += `<div id="react-content-${
        reactData.message_id
      }" class="react-container bg-white  dark:bg-navy-700" > <a   id="react-${
        reactData._id
      }" ${
        newData.user !== reactData.user_id ? 'style="pointer-events: none"' : ""
      }> ${reactData.path}</a> </div>`;
      let react = document.getElementById(`react-${reactData._id}`);
      react.innerHTML = reactData.path;
    }
    getReactButton();
  }
  