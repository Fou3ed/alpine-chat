import { msgButt } from "../components/msgButton.js";
import { conversationId,  socketLib, newData, notifyNumber, timeString, updateNotifyNumber } from "../main.js";
import { getDeleteButtons } from "../messageActions/deleteMessage.js";
import { getEditButtons } from "../messageActions/editMessage.js";
import { getPinButtons } from "../messageActions/pinMessage.js";
import { getReactButton, reactions } from "../messageActions/reactMessage.js";
import { changeTitle } from "../utils/changeTitle.js";
import { displayLeftConversation } from "../utils/displayLeftConversation.js";
import { generateCountryOptions } from "../utils/generateCountryOptions.js";
import { playNotificationSound } from "../utils/notificationSound.js";
let messagesContainer = document.getElementById("big-container-message");
import { markMessageAsSeen } from "../messageActions/readMessage.js";
import { compareFields } from "../utils/compareFields.js";
import { userCountry } from "../utils/getUserCountry.js";
import { phoneList } from "../utils/getPhoneList.js";
import { addLogs } from "../utils/addLogs.js";
import { getTranslationValue, lan } from "../utils/traduction.js";
import { Countries } from "../countries.js";
import { insertLineBreaks } from "../utils/truncateMessage.js";
const conversationContainer = document.getElementById("conversation-container");

export async function receiveMessage(data) {

  let messageId;

    // if (firstConv && firstConv === data.messageData.conversation) {
    //   $(`.conversation-click[data-conversation-id="${firstConv}"]`).trigger(
    //     "click"
    //   );
    //   firstConv = "";
    // }
    playNotificationSound();
 
  
    let tableRows = "";
    messageId = data.messageData.id;
    const myContent =
      data.messageData.type === "plan" ||
      data.messageData.type === "form" ||
      data.messageData.type === "link"
        ? JSON.parse(data.messageData.content)
        : {};
    let conv = document.querySelector("#conversation-container").dataset[
      "conversationId"
    ];
    const messageDate = new Date(data.date);
  
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
  
    const messageDay = messageDate.getDate();
  
    let time;
  
    if (currentDay === messageDay) {
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes().toString().padStart(2, "0");
      time = `${hour}:${minute}`;
    } else {
      const day = messageDate.toLocaleString("en-us", {
        weekday: "long",
      });
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes().toString().padStart(2, "0");
      time = `${day}:${hour}:${minute}`;
    }
    const isNotNewConversation = document.querySelector(
      `#left-conversation-${data.messageData.conversation}`
    );
    if (isNotNewConversation === null) {
      displayLeftConversation({
        conversationId: data.messageData.conversation,
        senderName: data.senderName,
        agentId: data.messageData.from,
        contactAgentId: data.contactAgentId,
        content: data.messageData.content,
      });
    }
  
    if (data.messageData.conversation === conv) {
      if (Object.keys(myContent).length !== 0 && data.messageData.type === "plan")
        tableRows = myContent.plans.map((plan) => {
          return `
          <div class="pricing pricing-palden">
          <div class="pricing-item" id="plan-${messageId}" data-plan-id="${plan.id}" name="${plan.name}">
              <div class="pricing-deco">
                  <svg class="pricing-deco-img" enable-background="new 0 0 300 100" height="100px" viewBox="0 0 300 100" width="300px" xmlns="http://www.w3.org/2000/svg">
                      <path class="deco-layer deco-layer--1" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
                        c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" fill="#FFFFFF" opacity="0.6"></path>
                      <path class="deco-layer deco-layer--2" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
                        c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" fill="#FFFFFF" opacity="0.6"></path>
                      <path class="deco-layer deco-layer--3" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
                        H42.401L43.415,98.342z" fill="#FFFFFF" opacity="0.7"></path>
                      <path class="deco-layer deco-layer--4" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
                        c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" fill="#FFFFFF"></path>
                  </svg>
                  <div class="pricing-price">
                      <span class="pricing-currency text-2xl">${plan.currency}</span>
                      <span class="text-4xl">${plan.tariff}</span>
                  </div>
                  <h3 class="pricing-title text-xl">${plan.name}</h3>
              </div>
              <ul class="pricing-feature-list">
                  <li class="pricing-feature text-lg">${plan.billing_volume} Messages</li>
              </ul>
              <button class="pricing-action text-lg" id="buyButton">Buy Plan<span class="loaderBuyButton"></span></button>
          </div>
      </div>
            `;
        });
      else if (
        Object.keys(myContent).length !== 0 &&
        data.messageData.type === "form"
      ) {
        let inputForms = "";
        if (myContent.fields) {
          myContent.fields.sort(compareFields);
          inputForms = myContent.fields.map((field) => {
            let type = "";
            switch (+field.field_type) {
              case 1:
                case 10: //first name
                  case 11: //last name:
                type = "text";
                break;
              case 2:
                type = "number";
              case 3:
                type = "date";
                break;
              case 4:
                type = "datetime-local";
                break;
              case 5:
                type = "number";
                break;
              case 6:
                type = "email";
                break;
              case 7:
                type = "tel";
                break;
              case 8:
                type = "select";
                break;
              case 9:
                type = "textarea";
                break;
            }
            if (field?.field_type ==8) {
              const countryOptions = generateCountryOptions(
                Countries.list()[lan.substring(0, 2).toLowerCase()],
                field?.field_value ?? userCountry
              );
              return `
                    <label class="relative">
                        <span>${field.field_name}</span>
                        <select 
                            id="floating_field_${messageId}"
                            data-country
                            class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                            name="${field.field_name.replace(" ", "")}" 
                            data-field-id="${field.field_id}"
                            required
                            ${
                              field?.field_value
                                ? "style='pointer-events:none'"
                                : ""
                            }
                            ${myContent.status === 1 ? "disabled" : ""}
                        >
                            <option value="">Select a country</option>
                            ${countryOptions}
                        </select>
                    </label>`;
            } else if (field?.field_type == 7) {
              return `
              <label class="relative">
              <span>${field.field_name}</span>
              <input 
                  id="floating_field_${messageId}"
                  class="form-input phoneInput field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                  placeholder="${field.field_name}" 
                  name="${field.field_name.replace(" ", "")}" 
                  data-field-id="${field.field_id}"
                  value="${field?.field_value ?? ""}"
                  type="tel"
                  ${field?.field_value ? "style='pointer-events:none'" : ""}
                  ${myContent.status === 1 ? "disabled" : ""}
              />
          </label>
          `;
            } else {
              return `
                <label class="relative">
                  <span>${field.field_name}</span>
                  ${
                    type === "textarea"
                      ? `<textarea
                        id="floating_field_${messageId}"
                        class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                        placeholder="${field.field_name}" 
                        name="${field.field_name.replace(" ", "")}" 
                        data-field-id="${field.field_id}"
                        ${field?.field_value ? "style='pointer-events:none'" : ""}
                        ${myContent.status === 1 ? "disabled" : ""}
                      >${field?.field_value ?? ""}</textarea>`
                      : type === "date"
                      ? `<input
                          id="floating_field_${messageId}"
                          class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                          placeholder=${getTranslationValue("date_format.date_form")}
                          name="${field?.field_name?.replace(" ", "")}"
                          data-field-id="${field?.field_id}"
                          value="${field?.field_value ?? ""}"
                          type="text"
                          ${
                            field?.field_value
                              ? "style='pointer-events:none'"
                              : ""
                          }
                          ${myContent.status === 1 ? "disabled" : ""}
                          x-input-mask='{
                            date: true,
                            delimiter: "-",
                            datePattern: ["d", "m", "Y"]
                          }'
                        />`
                      : `<input
                        id="floating_field_${messageId}"
                        class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                        placeholder="${field.field_name}" 
                        name="${field.field_name.replace(" ", "")}" 
                        data-field-id="${field.field_id}"
                        value="${field?.field_value ?? ""}"
                        type="${type}"
                        ${field?.field_value ? "style='pointer-events:none'" : ""}
                        ${myContent.status === 1 ? "disabled" : ""}
                      />`
                  }
                </label>
              `;
            }
          });
  
          tableRows = `
          <div class="mr-4 max-w-lg sm:mr-10">
                <form name="form1" class="box" onsubmit="">
                    <div class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 ${
                      newData?.source ? "gocc" : ""
                    } card-form" style="position: relative;">
                        <div class=" w-full max-w-xl p-4 sm:p-5">
                            <div class="mb-4">
                                <h3 class="text-2xl font-semibold"></h3>
                                <h5 class="text-sm">${
                                  myContent.introduction
                                    ? myContent.introduction
                                    : ""
                                }
                                </h5>
                            </div>
                            <div class="space-y-4">
                                ${inputForms.join("")}
                                <div class="flex justify-end space-x-2 pt-4">
                                    ${
                                      myContent.status !== 1
                                        ? `
                                       
                                    `
                                        : ` <h5 class="text-sm" style="color: #22A699">${
                                            myContent.text_capture
                                              ? myContent.text_capture
                                              : ""
                                          }</h5>
                `
                                    }
                                    ${
                                      myContent.status !== 1
                                        ? `
                                        <button class="btn1 min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90" type="button"
                                            id="submit-form-${message._id}" 
                                        >
                                            <span class="spinner hidden absolute inset-0 flex justify-center items-center">
                                            </span>
                                          ${myContent.button}
                                        </button>
                                    `
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            `;
        }
      } else if (data.messageData.type === "bloc") {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `<div class="flex flex-col items-start space-y-3.5">
          <div class="mr-1">
              <div class="rounded-2xl break-words relative rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white">
                  <div class="space-y-3.5">
                      <div class="ml-2 sm:ml-5">
                          <div id="message-content-${messageId}">
                              <div class="ml-2 sm:ml-5">
                                  <div class="sm:mr-10">
                                      <div class="pt-2">
                                          <p data-translation="bloc_message.title" class="text-lg sm:text-xl font-semibold">
                                              ${getTranslationValue("bloc_message.title")}
                                          </p>
                                          <p data-translation="bloc_message.text" class="text-sm sm:text-base">
                                              ${getTranslationValue("bloc_message.text")}
                                          </p>
                                      </div>
                                      <div class="flex flex-col sm:flex-row items-center sm:space-x-4 sm:w-full pt-4">
                                          <div class="flex h-20 w-full items-center rounded-lg dark:bg-navy-500 sm:w-auto sm:flex-1">
                                              <button id="AvailableAgent" class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-warning-focus focus:bg-primary-focus active:bg-warning-focus/90 w-full">
                                                  <span data-translation="bloc_message.relation_direct">
                                                      ${getTranslationValue("bloc_message.relation_direct")}
                                                  </span>
                                              </button>
                                          </div>
                                          <div class="mx-4 flex items-center space-y-3">
                                              <p>ou</p>
                                          </div>
                                          <div class="flex h-20 w-full items-center rounded-lg dark:bg-navy-500 sm:w-auto sm:flex-1">
                                              <button id="selectAgent" class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover-bg-warning-focus focus-bg-primary-focus active-bg-warning-focus/90 w-full">
                                                  <span data-translation="bloc_message.relation_manuel">
                                                      ${getTranslationValue("bloc_message.relation_manuel")}
                                                  </span>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                  <div id="pin-div" class="hidden pin-div-sender justify-center items-center me-2">
                                      <i class="fas fa-thumbtack"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <p class="mt-1 ml-inherit  text-left text-xs text-slate-400 dark:text-navy-300">${timeString} </p>

          </p>
      </div>`;
        messagesContainer.appendChild(messageDiv);
        const btnAvailableAgent = messageDiv.querySelector("#AvailableAgent");
        btnAvailableAgent.addEventListener(
          "click",
          function () {
            console.log("newDat",newData)
            socketLib.availableAgent({
              accountId: newData.accountId,
              conversationId: conversationId,
              userId: newData.user,
              source:newData?.source

            });
          },
          { once: true }
        );
  
        const btnSelectAgent = messageDiv.querySelector("#selectAgent");
        btnSelectAgent.addEventListener(
          "click",
          function () {
            socketLib.displayAgents(newData.accountId);
          },
          { once: true }
        );
      }
  
      if (data.messageData.type !== "bloc") {
        const messageContainer = document.getElementById(`message-${messageId}`);
        if (!messageContainer) {
          let direction =
            data.direction == "in" ? "justify-end" : "justify-start";
          const msgStyle =
            data.messageData.user === newData.user && !data.message.paid
              ? `rounded-2xl break-words  rounded-tl-none bg-white p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100`
              : `rounded-2xl break-words  relative rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white`;
          const messageContent = `
        <div id="message-${messageId}" class="flex items-start ${direction} space-x-1.5 ${
            data.messageData.type === "plan" ? "plans-container" : ""
          }">     
                <div class="flex flex-col   ${
                  data.messageData.user !== newData.user
                    ? "items-start"
                    : "items-end"
                }  space-y-3.5">
                ${
                  data.messageData.type === "MSG"
                    ? `<div class="flex flex-row">`
                    : ""
                }
                  ${
                    data.messageData.type === "MSG" &&
                    direction === "justify-end" &&
                    data.messageData.status !== 0
                      ? msgButt(
                          messageId,
                          direction,
                          data.messageData.pinned === 1
                        )
                      : ""
                  }
                  <div class="ml-2 max-w-lg sm:ml-5">
                  ${
                    data.messageData.type === "MSG" ||
                    data.messageData.type === "link"
                      ? `
                        <div class="${
                          data.messageData.type === "link"
                            ? "rounded-2xl break-words relative rounded-tr-none bg-violet-300 p-3 text-slate-700 shadow-sm dark:bg-violet-500 dark:text-white"
                            : msgStyle
                        }" id="message-content-${messageId}">
                        ${
                          data.messageData.status === 0
                            ? `${
                                direction === "justify-start"
                                  ? data.messageData.user_data.full_name
                                  : "You"
                              } unsent a message`
                            : data.messageData.type === "link"
                            ? `<a class="link-msg" id="linked-msg-${messageId}" data-link-id="${myContent.userLink.id}" href="${myContent.userLink?.url}" target="_blank">${myContent.userLink?.url}</a>`
                            : data.messageData.type === "plan"
                            ? tableRows.join("")
                            : data.messageData.type === "form"
                            ? tableRows
                            : (window.innerWidth > 550 ? data.messageData.content : insertLineBreaks(data.messageData.content))
                        }
                          <div id="pin-div" class="hidden ${
                            direction === "justify-start"
                              ? "pin-div-sender"
                              : "pin-div"
                          } justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                          ${
                            direction === "justify-start" &&
                            myContent.userLink?.status === "1"
                              ? '<i class="fas fa-eye text-blue-500 ml-1"></i>'
                              : ""
                          }
                        </div>
                          </div>
                         
                        `
                      : `
                        <div id="message-content-${messageId}">
                        <div class="ml-2 max-w-lg sm:ml-5">
  
                          ${
                            data.messageData.status === 0
                              ? `${
                                  direction === "justify-start"
                                    ? data.messageData.user_data.full_name
                                    : "You"
                                } unsent a message`
                              : data.messageData.type === "plan"
                              ? tableRows.join("")
                              : data.messageData.type === "form"
                              ? tableRows
                              : data.messageData.content
                          }
                          <div id="pin-div" class="${
                            data.messageData.pinned === 0 ||
                            data.messageData.status === 0
                              ? "hidden"
                              : "flex"
                          } ${
                          direction === "justify-start"
                            ? "pin-div-sender"
                            : "pin-div"
                        } justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                        </div>
                        </div>
                        `
                  }    
                    ${data.messageData.type === "MSG" ? `</div>` : ""}  
                    <p id="date_msg" data-direction="${direction}" class="mt-1 ${
            data.messageData.user !== newData.user ? "" : "ml-auto"
          }  text-xs text-slate-400 dark:text-navy-300">
                      ${timeString}
                    </p>
                </div>
                ${
                  data.messageData.type === "MSG" &&
                  direction === "justify-start" &&
                  data.messageData.status !== 0
                    ? msgButt(messageId, direction, data.messageData.pinned === 1)
                    : ""
                }
              </div>
        `;
        // const msgDiv=document.getElementById(`#message-content-${data.messageData._id}`)
      
          let typingBlock = document.getElementById("typing-block-message");
          if (typingBlock) {
            const msgDiv = document.createElement("div");
            msgDiv.innerHTML = messageContent;
         
            typingBlock.replaceWith(msgDiv);
          } else
            messagesContainer.insertAdjacentHTML("beforeend", messageContent);
          if (conversationId === data.messageData.conversation) {
            if (document.visibilityState === "visible") {
              markMessageAsSeen(conversationId);
            } else {
              document.addEventListener(
                "visibilitychange",
                () => {
                  if (document.visibilityState === "visible") {
                    markMessageAsSeen(conversationId);
                  }
                },
                { once: true }
              );
            }
          }
          conversationContainer.scrollTop = conversationContainer.scrollHeight;
  
          if (data.messageData.type === "form") {
            const messageElement = document.querySelector(
              `#message-${messageId} input.phoneInput`
            );
            if (messageElement) {
              phoneList(messageElement);
            }
              if (        
          data.messageData.type === "form" &&
          document.querySelector(`#submit-form-${data.messageData.id}`)
        ) {
  
          document.querySelector(
            `#submit-form-${data.messageData.id}`
          )._form_data = data.messageData.content;
        }
          }
          if (data.messageData.type === "MSG") {
            const messageElement = document.getElementById(
              `message-${messageId}`
            );
            const msgButtContainer = messageElement.querySelector(
              ".msg-butt-container"
            );
            const reactButtContainer = messageElement.querySelector(
              ".react-butt-container"
            );
            messageElement.addEventListener("mouseenter", () => {
              msgButtContainer.style.display = "block";
              reactButtContainer.style.display = "block";
            });
  
            messageElement.addEventListener("mouseleave", () => {
              msgButtContainer.style.display = "none";
              reactButtContainer.style.display = "none";
            });
          }
  
          const selectElement = document.querySelector(
            `#floating_field_${messageId}[data-country]`
          );
  
          $(selectElement).select2({
            placeholder: "Select your Country",
            templateResult: (item) => {
              return Countries.getName(item.id, lan.substring(0, 2).toLowerCase())
            },
            templateSelection: (item) => {
              return Countries.getName(item.id, lan.substring(0, 2).toLowerCase())
            },
            sorter: function (data) {
              return data.sort(function (a, b) {
                return (!['FR', 'GB', 'US', 'BE', 'CH', 'LU', 'IE', 'CA'].includes(a.id) && ['FR', 'GB', 'US', 'BE', 'CH', 'LU', 'IE', 'CA'].includes(b.id)) ? 1 : ((['FR', 'GB', 'US', 'BE', 'CH', 'LU', 'IE', 'CA'].includes(a.id) && !['FR', 'GB', 'US', 'BE', 'CH', 'LU', 'IE', 'CA'].includes(b.id)) ? -1 : (a.text.localeCompare(b.text)));
              });
              }
          });
          $(selectElement).on("change.select2", () => {
            const selectedCountryCode = $(selectElement).val();
            const phoneInput = document.querySelector(
              `.phoneInput.field-${messageId}`
            );
            if (phoneInput) {
              let instance = window.intlTelInputGlobals.getInstance(phoneInput);
              if (typeof instance !== "undefined") {
                instance.setCountry(selectedCountryCode);
              }
            }
          });
        }
      }
      
if(data.messageData.type !="log"){
  conversationContainer.scrollTop = conversationContainer.scrollHeight;

}  
      reactions();
      getReactButton();
      getDeleteButtons();
      getEditButtons();
      getPinButtons();
      updateNotifyNumber(1)


      if (document.visibilityState !== "visible") {
        changeTitle(notifyNumber);
      }
    } else {
      const unreadCount = document.getElementById(
        `unread-count-${data.messageData.conversation}`
      );
      if (unreadCount?.classList.contains("hidden")) {
        unreadCount?.classList.remove("hidden");
        unreadCount?.classList.add("flex");
        unreadCount.textContent = 1;
      } else {
        if (unreadCount?.textContent) {
          unreadCount.textContent = +unreadCount?.textContent + 1;
        }
      }
    }
  
 function sendClickingNotification(data) {
      socketLib.linkClick(data.id.replace("linked-msg-", ""));
      addLogs({
        action: "link click",
        element: "7",
        element_id: +data.dataset.linkId,
        messageId: data.id.replace("linked-msg-", ""),
      });
    }
  
    function sendPlanClickNotification(data, messageId) {
  
  
      const name = data.getAttribute("name");
  
      // Update message to status not paid: 2
      socketLib.addSale({
        contact: newData.contact,
        user: newData.user,
        plan: +data.dataset.planId,
        payment_method: "1",
        provider_id: "1",
        messageId: messageId,
        conversationId: conversationId,
        planName: name,
        sale_status: 0,
      });
    }
  
    const linkedMessage = document.querySelector(`#linked-msg-${messageId}`);
    if (linkedMessage) {
      linkedMessage.addEventListener("click", function () {
        sendClickingNotification(this);
      });
    }
  
    const planMessage = document.querySelectorAll(`#plan-${messageId}`);
    if (planMessage.length > 0) {
      planMessage.forEach((plan) => {
        const buyButton = plan.querySelector(".pricing-action");
        if (buyButton) {
          buyButton.addEventListener("click", (event) => {
            sendPlanClickNotification(plan, messageId);
          });
        }
      });
    }
  }