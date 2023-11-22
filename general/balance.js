import { freeBalance } from "../components/freeBalanceComp.js";
import { totalBalance, totalFreeBalance, updateTotalBalance, updateTotalFreeBalance } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-message");

export function getTotalBalance(balance,free_balance,role) {
    const balanceNumber = document.querySelector(".balance-value");
    const balanceSpinner = document.querySelector(".balance-spinner");
    const messageInput = document.querySelector("#message-input");
    const sendButton = document.querySelector("#send-message");
    // Show spinner
    balanceSpinner.classList.remove("hidden");
    if(free_balance > 0){
      freeBalance(free_balance)
    }else{
      messageInput.dataset.translation = "container.write_message";
      messageInput.placeholder = getTranslationValue(
        "container.write_message"
      );

      messageInput.disabled = false;
      sendButton.disabled = false;
    }
    updateTotalBalance(balance)
    if(free_balance !== undefined){
      updateTotalFreeBalance(free_balance)

    }
    setTimeout(() => {
      // Hide spinner
      balanceSpinner.classList.add("hidden");
  
      if (balance == null && role == "GUEST") {
        // balanceNumber.dataset.translation = "header.free";
        // balanceNumber.textContent = getTranslationValue("header.free");
        balanceNumber.textContent=0
      } else {
        balanceNumber.textContent = balance;
        if (balance > 4) {
          balanceNumber.style.color = "";
          balanceNumber.style.color = "#000000";
        } else if (balance < 3 && balance > 1) {
          balanceNumber.style.color = "#F94C10";
        } else {
          balanceNumber.style.color = "";
          balanceNumber.style.color = "#C70039";
        }  

        if (balance == 0) {
          // Disable input and button if balance is 0
          messageInput.dataset.translation="container.balance_message"
          messageInput.placeholder =
            getTranslationValue("container.balance_message");
          messageInput.disabled = true;
          sendButton.disabled = true;
          balanceNumber.style.color = "";
          balanceNumber.style.color = "#C70039";
        } else {
          messageInput.dataset.translation = "container.write_message";
          messageInput.placeholder = getTranslationValue(
            "container.write_message"
          );
  
          messageInput.disabled = false;
          sendButton.disabled = false;
        }
      }
    }, 2000);
  }
  
  export function updateUserBalance() {
    const BuyButton = document.querySelector("#buyMessagesTool");
    
    if(totalFreeBalance){
      updateTotalFreeBalance(Number(totalFreeBalance) - 1)
      const balanceNumber = document.querySelector(".free-balance-value");
      balanceNumber.textContent = totalFreeBalance ;
      if (totalFreeBalance === 0) {
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `
        <div id="modal-bought" class="modal-bought fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
        <div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
        <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
  
          <div class="mt-4">
            <h2 class="text-2xl text-slate-700 dark:text-navy-100">
              Alert !
            </h2>
            <p class="mt-2" data-translation="container.balance_message">
             ${getTranslationValue("container.balance_message")}
            </p>
            <button @click="showModal = false" class="modal-button btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90" id="confirmButton">
              Close
            </button>
          </div>
        </div>
      </div>
        `;
       
        // const freeBalanceCard = document.querySelector(".free-balance-card");
        // freeBalanceCard.remove();

        const confirmButton = modalDiv.querySelector("#confirmButton");
        
        confirmButton.addEventListener("click", () => {
          confirmButton.click();
          modalDiv.style.display = "none";
          BuyButton.click()
        
        });
        console.log(totalBalance)
          if(totalBalance === 0 || !totalBalance ) {
            messageInput.dataset.translation="container.balance_message"
            messageInput.placeholder =
              getTranslationValue("container.balance_message");
            document.body.appendChild(modalDiv);
            messageInput.disabled = true;
            sendButton.disabled = true;
            
          } 
       
      }
      return;
    }

    if (totalBalance) {
      updateTotalBalance(Number(totalBalance) - 1)
      
      const balanceNumber = document.querySelector(".balance-value");
      balanceNumber.textContent = totalBalance;
      if (totalBalance > 4) {
        balanceNumber.style.color = "";
        balanceNumber.style.color = "#C8E4B2";
      } else if (totalBalance <= 4 && totalBalance >= 2) {
        balanceNumber.style.color = "";
        balanceNumber.style.color = "#F94C10";
      } else {
        balanceNumber.style.color = "";
        balanceNumber.style.color = "#C70039";
      }
  
      if (totalBalance === 0 ) {
        const modalDiv = document.createElement("div");
        modalDiv.innerHTML = `
        <div id="modal-bought" class="modal-bought fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
        <div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
        <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
  
          <div class="mt-4">
            <h2 class="text-2xl text-slate-700 dark:text-navy-100">
              Alert !
            </h2>
            <p class="mt-2" data-translation="container.balance_message">
             ${getTranslationValue("container.balance_message")}
            </p>
            <button @click="showModal = false" class="modal-button btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90" id="confirmButton">
              ${getTranslationValue("modal.close")}
            </button>
          </div>
        </div>
      </div>
        `;
        balanceNumber.style.color = "";
        balanceNumber.style.color = "#C70039";
  
        const confirmButton = modalDiv.querySelector("#confirmButton");
  
        confirmButton.addEventListener("click", () => {
          confirmButton.click();
          modalDiv.style.display = "none";
          BuyButton.click()

        });
        messageInput.dataset.translation="container.balance_message"
        messageInput.placeholder =
          getTranslationValue("container.balance_message");
        document.body.appendChild(modalDiv);
        messageInput.disabled = true;
        sendButton.disabled = true;
      }
    }
  }