// The message input is where the user types their message
const messageInput = document.querySelector("#message-input");
// The send message button
const sendButton = document.querySelector("#send-message");
export function ableInputArea() {
    messageInput.disabled = false;
    sendButton.disabled = false;
  }
  