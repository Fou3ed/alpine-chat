import { getTranslationValue } from "./traduction.js";

export function displayBuyModal() {
    const BuyButton = document.querySelector("#buyMessagesTool");
  
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
      <div id="modal-bought-block" class="modal-bought fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
        <div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
        <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
  
          <div class="mt-4">
            <h2 class="text-2xl text-slate-700 dark:text-navy-100">
              Alert!
            </h2>
            <p class="mt-2" data-translation="container.balance_message">
              ${getTranslationValue("container.balance_message")}
            </p>
            <button class="modal-button btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90" id="buyButtonBalance">
              Buy
            </button>
          </div>
        </div>
      </div>
    `;
  
    document.body.appendChild(modalDiv);
  
    const confirmButton = modalDiv.querySelector("#buyButtonBalance");
  
    confirmButton.addEventListener("click", () => {
      BuyButton.click();

    });

  }
  
  

  