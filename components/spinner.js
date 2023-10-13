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
    <div
    class="ConversationSpinner h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-r-primary dark:border-accent/30 dark:border-r-accent"
  ></div>    </div>
  
  `;
  return spinner
        
  }


  export function buyButtonSpinner(){
    const buyButtonSpinner= `
    <div class="d-flex align-items-center" style="height: 20px;" ><span class="loader2"></span></div>
  
  `;
  return  buyButtonSpinner
        
  }