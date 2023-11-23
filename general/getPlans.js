import { API_KEY, SQL_API, accountId } from "../env.js";
import { conversationId, newData, socketLib } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";

export async function getPlans() {
    try {
      const response = await axios.get(`${SQL_API}/plan_client`, {
        headers: {
          key: `${API_KEY}`,
        },
      });
      if (response) {
        response.data.data.forEach((plan) => {
          document.getElementById("plans").insertAdjacentHTML(
            "afterbegin",
            `
          <div class='pricing-item  '>
                      <div  class='pricing-deco' id="balance-plan-${plan.id}">
                        <svg class='pricing-deco-img' enable-background='new 0 0 300 100' height='100px' id='Layer_1'
                          preserveAspectRatio='none' version='1.1' viewBox='0 0 300 100' width='300px' x='0px'
                          xml:space='preserve' xmlns:xlink='http://www.w3.org/1999/xlink'
                          xmlns='http://www.w3.org/2000/svg' y='0px'>
                          <path class='deco-layer deco-layer--1'
                            d='M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729&#x000A;	c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z'
                            fill='#FFFFFF' opacity='0.6'></path>
                          <path class='deco-layer deco-layer--2'
                            d='M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729&#x000A;	c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z'
                            fill='#FFFFFF' opacity='0.6'></path>
                          <path class='deco-layer deco-layer--3'
                            d='M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716&#x000A;	H42.401L43.415,98.342z'
                            fill='#FFFFFF' opacity='0.7'></path>
                          <path class='deco-layer deco-layer--4'
                            d='M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428&#x000A;	c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z'
                            fill='#FFFFFF'></path>
                        </svg>
                        <div class='pricing-price'><span class='pricing-currency'>${plan.currency}</span>${plan.tariff}
                        </div>
                        <h3 class='pricing-title'>${plan.name}</h3>
                      </div>
                      <ul class='pricing-feature-list'>
                        <li class='pricing-feature'>${plan.billing_volume} Messages</li>
                      </ul>
                      <button id="startChatButton" class='plan-btn pricing-action button-with-min-width' data-plan="${plan.id}" name="${plan.name}">
                      <span class="button-text" data-translation="chat_plans.button">${getTranslationValue("chat_plans.button")}</span>
                      <div class="spinner-container d-none">
                        <div class="d-flex align-items-center" style="height: 20px;"><span class="loader2"></span></div>
                      </div>
                    </button>
                    
                    </div>         
        `
          );
        });
  
        // Add event listeners to the buy buttons
        const buyButtons = document.querySelectorAll(".plan-btn");
  
        buyButtons.forEach((buyButton) => {
          buyButton.addEventListener("click", function () {
            console.log("here")
            const selectedPlan = this.getAttribute("data-plan");
            const planName = this.getAttribute("name");
            // balanceSpinner.classList.remove("hidden");
            this.querySelector('.button-text').classList.add('d-none');
            this.querySelector('.spinner-container').classList.remove('d-none');
            socketLib.addSale({
              contact: newData.contact,
              user: newData.user,
              plan: selectedPlan,
              payment_method: "1",
              provider_id: "1",
              conversationId: conversationId,
              planName: planName,
              sale_status: 0,
              accountId:accountId
            });
            setTimeout(() => {
              this.querySelector('.button-text').classList.remove('d-none');
              this.querySelector('.spinner-container').classList.add('d-none');
            }, 2000)
          });
    
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  $(document).ready(function () {
    $("#buyMoreButton").on("click", function () {
      $("#planmodalButton").trigger("click");
    });
  });
  
  
//   const failButton = document.getElementById("closeModalPlan");
  
//   failButton.addEventListener("click", function () {
//     try {
//       modal.classList.add("hidden");
  
//       // Create the modal container
//       const modalContainer = document.createElement("div");
//       modalContainer.className =
//         "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5";
  
//       // Create the background overlay
//       const backgroundOverlay = document.createElement("div");
//       backgroundOverlay.className =
//         "absolute inset-0 bg-slate-900/60 transition-opacity duration-300";
  
//       // Create the modal content
//       const modalContent = document.createElement("div");
//       modalContent.className =
//         "relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5";
  
//       // Add your modal content (replace data.balance and newBalance with actual values)
//       modalContent.innerHTML = `
//         <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  
//         </svg>
//         <div class="mt-4" style="344px">
//           <h2 class="text-2xl text-slate-700 dark:text-navy-100">
//             Error
//           </h2>
//           <p class="mt-2">
//           ${getTranslationValue("modal.fail")}
//           </p>
//           <button id="closeModal" class="btn mt-6 bg-error font-medium text-white hover:bg-success-focus focus:bg-error-focus active:bg-error-focus/90">
//           ${getTranslationValue("modal.close")}
//           </button>
//         </div>
//       `;
  
//       // Append the elements to the modal container
//       modalContainer.appendChild(backgroundOverlay);
//       modalContainer.appendChild(modalContent);
  
//       // Append the modal container to the document body
//       document.body.appendChild(modalContainer);
  
//       // Close modal event listener
//       const closeModalButton = modalContent.querySelector("#closeModal");
//       closeModalButton.addEventListener("click", function () {
//         document.body.removeChild(modalContainer);
//       });
//     } catch (error) {
//       console.error("Error displaying modal:", error);
//     }
//   });
  
//   const successButton = document.getElementById("buyPlanBtn");
//   successButton.addEventListener("click", async function () {
//     const selectedPlan = this.getAttribute("data-plan");
//     // const balanceSpinner = document.querySelector(".balance-spinner");
  
//     const planName = this.getAttribute("name");
//     const msgId = this.getAttribute("message-id");
//     try {
//       // balanceSpinner.classList.remove("hidden");
//       socketLib.addSale({
//         contact: newData.contact,
//         user: newData.user,
//         plan: selectedPlan,
//         payment_method: "1",
//         provider_id: "1",
//         messageId: msgId,
//         conversationId: conversationId,
//         senderName: senderName,
//         planName: planName,
//         sale_status: 0,
//       });
//     } catch (error) {
//       console.error("Error adding sale:", error);
//     }
//   });
  