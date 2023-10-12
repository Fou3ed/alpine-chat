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


  export function cnvBigSpinner(){
    const spinner= `
    <div class="flex justify-center items-center h-full">
      <div class="ConversationSpinner h-16 w-16 animate-spin rounded-full border-4 border-primary border-r-transparent dark:border-accent dark:border-r-transparent"></div>
    </div>
  `;
  return spinner
        
  }