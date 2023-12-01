
const messageInput = document.querySelector("#message-input");

export function resetMaxLength(initialMaxLength) {
  messageInput.setAttribute("maxlength", initialMaxLength);
  document.getElementById("max-length-value").textContent = `0 | ${initialMaxLength}`;
  messageInput.addEventListener("input", function () {
    document.getElementById("max-length-value").textContent = `${this.value.length} | ${initialMaxLength}`;
  });
}

export function inputLEngth(initialMaxLength) {
  resetMaxLength(initialMaxLength);
}

