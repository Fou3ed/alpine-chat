import { totalBalance, updateTotalBalance } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-message");

export function getTotalBalance(balance, role) {
    const balanceNumber = document.querySelector(".balance-value");
    const balanceSpinner = document.querySelector(".balance-spinner");
    const messageInput = document.querySelector("#message-input");
    const sendButton = document.querySelector("#send-message");
    // Show spinner
    balanceSpinner.classList.remove("hidden");
    updateTotalBalance(balance)
    setTimeout(() => {
      // Hide spinner
      balanceSpinner.classList.add("hidden");
  
      if (balance == null && role === "GUEST") {
        balanceNumber.dataset.translation = "header.free";
        balanceNumber.textContent = getTranslationValue("header.free");
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
        if (balance === 0) {
          // Disable input and button if balance is 0
          messageInput.placeholder =
            "You need to buy a new plan to start chatting again";
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
    if (totalBalance) {
      totalBalance = Number(totalBalance) - 1;
      const balanceDiv = document.querySelector(".ballance-card");
      const balanceNumber = document.querySelector(".balance-value");
      const buyCreditsButton = document.querySelector("#btnPlansContainer");
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
  
      if (totalBalance === 0) {
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
            <p class="mt-2">
             You need to buy more Credits to keep chatting!!
            </p>
            <button @click="showModal = false" class="modal-button btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90" id="confirmButton">
              Close
            </button>
          </div>
        </div>
      </div>
        `;
        balanceNumber.style.color = "";
        balanceNumber.style.color = "#C70039";
  
        const confirmButton = modalDiv.querySelector("#confirmButton");
  
        confirmButton.addEventListener("click", () => {
          buyCreditsButton.click();
          modalDiv.style.display = "none";
        });
  
        messageInput.placeholder =
          "You need to buy a new plan to start chatting again";
        document.body.appendChild(modalDiv);
        messageInput.disabled = true;
        sendButton.disabled = true;
      }
    }
  }