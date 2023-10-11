import { onStopTyping } from "../conversationActions/conversationTyping.js";

const messageInput = document.querySelector("#message-input");

export function resetMaxLength(initialMaxLength) {
    onStopTyping();
  
    messageInput.setAttribute("maxlength", initialMaxLength);
    document.getElementById(
      "max-length-value"
    ).textContent = ` ${initialMaxLength}`;
  }
  


export  function inputLEngth(conversationMaxMsg) {
    if (conversationMaxMsg) {
      messageInput.setAttribute("maxlength", conversationMaxMsg);
      document.getElementById(
        "max-length-value"
      ).textContent = ` ${conversationMaxMsg} `;
      messageInput.addEventListener("input", function () {
        document.getElementById(
          "max-length-value"
        ).textContent = ` ${conversationMaxMsg} | ${
          conversationMaxMsg - this?.value.length
        }`;
      });
    }
  }