import { freeBalance } from "../components/freeBalanceComp.js";
import { totalBalance, totalFreeBalance, updateTotalBalance, updateTotalFreeBalance } from "../main.js";
import { displayBuyModal } from "../utils/displayBuyModal.js";
import { getTranslationValue } from "../utils/traduction.js";
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-message");

export function getTotalBalance(balance,free_balance,role) {
  if((balance == 0 || balance == null) && (free_balance == 0 || free_balance == null) ){
     displayBuyModal()
  }
    const balanceNumber = document.querySelector(".balance-value");
    const balanceSpinner = document.querySelector(".balance-spinner");
    const messageInput = document.querySelector("#message-input");
    const sendButton = document.querySelector("#send-message");
    // Show spinner
    balanceSpinner.classList.remove("hidden");
    if(free_balance > 0){
      freeBalance(free_balance)
    }else if(balance== null || balance ==0 ){
      messageInput.dataset.translation = "container.balance_message";
      messageInput.placeholder = getTranslationValue(
        "container.balance_message"
      );

      messageInput.disabled = true;
      sendButton.disabled = true;
    }else {
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
  
    if (totalFreeBalance) {
      updateTotalFreeBalance(Number(totalFreeBalance) - 1);
  
      const balanceNumber = document.querySelector(".free-balance-value");
      balanceNumber.textContent = totalFreeBalance;
  
      if (totalFreeBalance === 0) {
          displayBuyModal()
        // confirmButton.addEventListener("click", () => {
        //   confirmButton.click();
        //   modalDiv.style.display = "none";
        //   BuyButton.click();
        // });
  
       
      }
  
      return;
    }
  
    if ((totalBalance == 0 || totalBalance == null) && (totalFreeBalance == 0 || totalFreeBalance == null)) {
       displayBuyModal();
       const balanceNumber = document.querySelector(".balance-value");
       balanceNumber.style.color = "";
       balanceNumber.style.color = "#C70039";
 
       messageInput.dataset.translation = "container.balance_message";
       messageInput.placeholder = getTranslationValue(
         "container.balance_message"
       );
       messageInput.disabled = true;
       sendButton.disabled = true;

    }
  
    if (totalBalance) {
      updateTotalBalance(Number(totalBalance) - 1);
  
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
  
    }
  }
  
 