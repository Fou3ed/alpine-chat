import { conversationId, newData, socketLib } from "../main.js";
import { playNotificationSound } from "../utils/notificationSound.js";

export async function getPinButtons() {
    const allPinButtons = document.querySelectorAll("#pin-message");
    allPinButtons.forEach((pinButton) => {
      pinButton.onclick = function () {
        onPinMessage(this);
      };
    });
  
    const allUnPinButtons = document.querySelectorAll("#unpin-message");
    allUnPinButtons.forEach((unpinButton) => {
      unpinButton.onclick = function () {
        onUnpinMessage(this);
      };
    });
  }
  
  export async function pinMessage(data) {
    const messagePinned = document.getElementById(`message-${data._id}`);
    const pinIcon = messagePinned.querySelector("#pin-div");
    const pinnedButton = messagePinned.querySelector("#pin-message");
    pinIcon.classList.add("flex");
    pinIcon.classList.remove("hidden");
    pinnedButton.id = "unpin-message";
    pinnedButton.innerHTML = `Unpin`;
    pinnedButton.onclick = function () {
      onUnpinMessage(this);
    };
  }
  
  function onUnpinMessage(button) {
    let pinned = button;
    let messageId = pinned.dataset.messageId;
    const onMessageUnpin = {
      app: "ID",
      user: newData.user,
      action: "message.unpin",
      metaData: {
        conversation: conversationId,
        message_id: messageId,
        user_id: newData.user,
      },
    };
    socketLib.unPinMsg(onMessageUnpin);
  }
  
  export function unpinMessage(data) {
    const messagePinned = document.getElementById(`message-${data._id}`);
    const unpinnedButton = messagePinned.querySelector("#unpin-message");
    const pinIcon = messagePinned.querySelector("#pin-div");
    pinIcon.classList.remove("flex");
    pinIcon.classList.add("hidden");
    if (unpinnedButton) {
      unpinnedButton.innerHTML = `Pin`;
      unpinnedButton.id = "pin-message";
      unpinnedButton.onclick = function () {
        onPinMessage(this);
      };
    }
  }
  
  function onPinMessage(button) {
    let pinned = button.parentNode.querySelector("a");
    let messageId = pinned.dataset.messageId;
  
    const onMessagePin = {
      app: "ID",
      user: newData.user,
      action: "message.pin",
      metaData: {
        conversation: conversationId,
        message_id: messageId,
        user_id: newData.user,
        type: "pinned",
      },
    };
    socketLib.pinMsg(onMessagePin);
    playNotificationSound();
  }
  