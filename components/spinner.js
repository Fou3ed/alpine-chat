const leftConversationContainer = document.getElementById("left-conversation");

export function showSpinner() {
  
    const spinnerContainer = document.createElement("div");
    spinnerContainer.classList.add("spinner-container");
  
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-left-conversation");
    spinnerContainer.appendChild(spinner);
    leftConversationContainer.innerHTML = "";
    leftConversationContainer.appendChild(spinnerContainer);
  
  }