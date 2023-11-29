import { msgButt } from "../components/msgButton.js";
import {  socketLib, newData } from "../main.js";
import { compareFields } from "../utils/compareFields.js";
import { generateCountryOptions } from "../utils/generateCountryOptions.js";
import { phoneList } from "../utils/getPhoneList.js";
import { userCountry } from "../utils/getUserCountry.js";
let messagesContainer = document.getElementById("big-container-message");
import { getReactButton, reactions } from "../messageActions/reactMessage.js";
import { getDeleteButtons } from "../messageActions/deleteMessage.js";
import { getEditButtons } from "../messageActions/editMessage.js";
import { getPinButtons } from "../messageActions/pinMessage.js";
import { conversationId } from "../main.js";
import { sendFocusNotification, sendTypingNotification } from "../formActions.js/inputEvents.js";
import { addLogs } from "../utils/addLogs.js";
import { showEmptyConversation } from "../conversationActions/conversationClick.js";
import { getTranslationValue, lan } from "../utils/traduction.js";
import { getTime } from "../utils/getTime.js";
import { Countries } from "../countries.js";
import { insertLineBreaks } from "../utils/truncateMessage.js";
import { accountId } from "../env.js";
export function displayMessages(messages) {
    document.getElementById("big-container-message").style.display = "block";
    if (!messages || !messages.messages) {
      return;
    }

    showEmptyConversation(false);
  
    // Loop through the messages
    const convMessages = messages.messages.slice();
    for (let i = 0; i < convMessages.length; i++) {
      let message = convMessages[i];
      const messageId = convMessages[i]._id;
      const messageContainer = document.getElementById(`message-${messageId}`);
        const time=getTime(message.created_at)
      const myContent =
        message.type == "plan" ||
        message.type == "form" ||
        message.type == "link"
          ? JSON.parse(message.message)
          : {};
      if (!messageContainer) {
        let tableRows = "";
        if (Object.keys(myContent).length !== 0 && message.type == "plan") {
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
        } else if (message.type == "bloc") {
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
          <p class="mt-1 ml-inherit text-left  text-xs text-slate-400 dark:text-navy-300" data-time="${message.created_at}">
              ${time}
          </p>
      </div>
      `;
          messagesContainer.insertAdjacentElement("afterbegin", messageDiv);
          const btnAvailableAgent = messageDiv.querySelector("#AvailableAgent");
  
          btnAvailableAgent.addEventListener(
            "click",
            function () {
              socketLib.availableAgent({
                accountId: newData.accountId,
                conversationId: conversationId,
                userId: newData.user,
                source:newData.source

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
          continue;
        } else if (message.type == "form") {
          let inputForms = "";
          if (myContent.fields) {
            myContent.fields.sort(compareFields);
            inputForms = myContent.fields.map((field) => {
              let type = "";
              switch (+field?.field_type) {
                case 1:
                case 10: //first name
                  case 11: //last name
                  case 15: 
                  type = "text";
                  break;
                case 2:
                  type = "number";
                case 3:
                  case 14:
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
                  type = "country";
                  break;
                case 9:
                  type = "textarea";
                  break;
                  case 12:
                    type="select"
                    break;
                    case 13:
                      type="gender"
              }
              if (field?.field_type == 8) {
                const countryOptions = generateCountryOptions(
                  Countries.list()[lan.substring(0, 2).toLowerCase()],
                  field?.field_value ?? userCountry
                );
  
                return `
                    <label class="relative">
                        <span>${field?.field_name ?? ''}</span>
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
                            ${myContent.status == 1 ? "disabled" : ""}
                        >
                            <option value="">Select a country</option>
                            ${countryOptions}
                        </select>
                    </label>`;
              } else if (field?.field_type == 7) {
                return `
              <label class="relative">
              <span>${field.field_name ?? ""}</span>
              <input 
                  id="floating_field_${messageId}"
                  class="form-input phoneInput field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                  placeholder="${field.field_name ?? "" }" 
                  name="${field.field_name.replace(" ", "")}" 
                  data-field-id="${field.field_id}"
                  value="${field?.field_value ?? ""}"
                  type="tel"
                  ${field?.field_value ? "style='pointer-events:none'" : ""}
                  ${myContent.status == 1 ? "disabled" : ""}
              />
          </label>
          `;
              }else if(type == "gender"){
                return `
                <label class="relative">
                <span>${field?.field_name ?? ''}</span>
                <select 
                    id="floating_field_${messageId}"
                    data-gender
                    class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                    name="${field.field_name.replace(" ", "")}" 
                    data-field-id="${field.field_id}"
                    required
                    ${myContent.status == 1 ? "disabled" : ""}
                >
                    ${myContent.status == 0 ? `<option value="" ></option><option value="0" data-translation="gender.male">${getTranslationValue("gender.male")}</option><option value="1" data-translation="gender.female">${getTranslationValue("gender.female")}</option>` : `<option value="${field.field_value}" data-translation="${field.field_value==0?  "gender.male" : "gender.female"}" > ${field.field_value==0?  getTranslationValue("gender.male") : getTranslationValue("gender.female")} </option>`}
                </select>
                </label>
            `;
            
            
              } else if(type == "select"){
                return `
                <label class="relative">
                <span>${field?.field_name ?? ''}</span>
                <select 
                    id="floating_field_${messageId}"
                    data-gender
                    class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                    name="${field.field_name.replace(" ", "")}" 
                    data-field-id="${field.field_id}"
                    required
                    ${myContent.status == 1 ? "disabled" : ""}
                > 
                    ${myContent.status == 0 ? `<option value="" data-translation="select.empty"></option>` + Object.entries(field?.field_default_value).map(([key, value]) => `<option value="${value}">${value}</option>`).join('') : `<option value="${field.field_value}">${field.field_value}</option>`}
                </select>
                </label>
            `;
            }
             else {
                return `
                <label class="relative">
                  <span>${field.field_name ?? ""}</span>
                  ${
                    type == "textarea"
                      ? `<textarea
                        id="floating_field_${messageId}"
                        class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="${field.field_name ?? ""}"
                        name="${field.field_name.replace(" ", "")}"
                        data-field-id="${field.field_id}"
                        ${field?.field_value ? "style='pointer-events:none'" : ""}
                        ${myContent.status == 1 ? "disabled" : ""}
                      >${field?.field_value ?? ""}</textarea>`
                      : type == "date" ?  
                      `<input
                        id="floating_field_${messageId}"
                        class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        data-translation="date_format.date_form"
                        placeholder=${getTranslationValue("date_format.date_form") ?? ""}
                        name="${field?.field_name?.replace(" ", "")}"
                        data-field-id="${field?.field_id}"
                        value="${field?.field_value ?? ""}"
                        type="text"
                        ${field?.field_value ? "style='pointer-events:none'" : ""}
                        ${myContent.status == 1 ? "disabled" : ""}
                        x-input-mask='{
                          date: true,
                          delimiter: "-",
                          datePattern: ["d", "m", "Y"]
                        }'
                      />`
                      : `<input
                        id="floating_field_${messageId}"
                        class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
                        placeholder="${field?.field_name ?? ""}"
                        name="${field?.field_name?.replace(" ", "")}"
                        data-field-id="${field?.field_id}"
                        value="${field?.field_value ?? ""}"
                        type="${type}"
                        ${field?.field_value ? "style='pointer-events:none'" : ""}
                        ${myContent.status == 1 ? "disabled" : ""}
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
                                        <button class="btn1 button-with-min-width min-w-[7rem] min-h-[2rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90" 
                                        type="button" 
                                        id="submit-form-${message._id}">
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
        }
        if (message.type == "log") {
          const log = JSON.parse(message.message);
          let userLog = "";
          switch (log.action) {
            case "fill":
              userLog = `You filled on the form.`;
              break;
            case "focus":
              userLog = `You focus on the form.`;
              break;
            case "purchase":
              userLog = `You purchased the <b>${log.plan_name}</b> plan.`;
              break;
            case "start form":
              userLog = `You start submit the form.`;
              break;
            case "end form":
              userLog = `You end submit the form.`;
              break;
            case "start purchase":
              userLog = `You start purchase a plan.`;
              break;
            case "link click":
              userLog = `You click to link.`;
              break;
            case "purchase completed":
              userLog = `${getTranslationValue("bought.purchase")}`;
              break;
            case "purchase went wrong":
              userLog = `Purchase went  wrong.`;
              break;
          }
          messagesContainer.insertAdjacentHTML(
            "afterbegin",
            ` <div class="flex justify-center items-center w-100 m-2" id="msg-${message.id}"><span class="logs-notification">${userLog}</span></div>`
          );
        } else {
          let direction =
            message.user == newData.user ? "justify-end" : "justify-start";
          const msgStyle =
            message.user == newData.user && !message.paid
              ? ` rounded-2xl break-words  rounded-tl-none bg-msg p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100`
              : ` rounded-2xl break-words  relative rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white`;
          messagesContainer.insertAdjacentHTML(
            "afterbegin",
            `<div id="message-${messageId}" class="flex items-start ${direction} space-x-1.5 ${
              message.type == "plan" ? "plans-container" : ""
            }">
                <div class="flex flex-col   ${
                  message.user !== newData.user ? "items-start" : "items-end"
                }  space-y-3.5">
                ${message.type == "MSG" ? `<div class="flex flex-row">` : ""}
                  ${
                    message.type == "MSG" &&
                    direction == "justify-end" &&
                    message.status !== 0
                      ? msgButt(messageId, direction, message.pinned == 1)
                      : ""
                  }
                  <div class="ml-2 max-w-lg sm:ml-5">
                    ${
                      message.type == "MSG" || message.type == "link"
                        ? `
                        <div class="  ${
                          message.type == "link"
                            ? " message-content rounded-2xl break-words relative rounded-tr-none bg-violet-300 p-3 text-slate-700 shadow-sm dark:bg-violet-500 dark:text-white"
                            : msgStyle
                        }" id="message-content-${messageId}">
                          ${
                            message.status == 0
                              ? `${
                                  direction === "justify-start"
                                    ? message.user_data.nickname
                                    : "You"
                                } unsent a message`
                              : message.type == "link"
                              ? `<a class="link-msg" id="linked-msg-${messageId}" data-link-id="${myContent.userLink.id}" href="${myContent.userLink?.url}" target="_blank">${myContent.userLink?.url}</a>`
                              : message.type == "plan"
                              ? tableRows.join("")
                              : message.type == "form"
                              ? tableRows
                              :  (window.innerWidth > 550 ? message.message : insertLineBreaks(message.message))
                          }
                        <div id="pin-div" class="${
                          message.pinned == 0 || message.status == 0
                            ? "hidden"
                            : "flex"
                        } ${
                            direction === "justify-start"
                              ? "pin-div-sender"
                              : "pin-div"
                          } justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                          ${
                            direction === "justify-start" &&
                            myContent.userLink?.status == "1"
                              ? '<i class="fas fa-eye text-blue-500 ml-1"></i>'
                              : ""
                          }
                        </div></div>`
                        : `
                        <div id="message-content-${messageId}" >
                        <div class="ml-2 max-w-lg sm:ml-5">
                          ${
                            message.status == 0
                              ? `${
                                  direction === "justify-start"
                                    ? message.user_data.nickname
                                    : "You"
                                } unsent a message`
                              : message.type == "plan"
                              ? tableRows.join("")
                              : message.type == "form"
                              ? tableRows
                              :message.message
                          }
                          <div id="pin-div" class="${
                            message.pinned == 0 || message.status == 0
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
                    ${message.type === "MSG" ? `</div>` : ""}
                    <p id="date_msg" data-direction="${direction}" class="mt-1 ${
              message.user !== newData.user ? "" : "ml-auto"
            }  text-xs text-slate-400 dark:text-navy-300" data-time="${message.created_at}">
                      ${
                        message.status === 2
                          ? "(updated) " + time
                          : direction === "justify-start"
                          ? time
                          : message.read
                          ? time +
                            `<i class="fas fa-eye ps-2" style="font-size:10px;"></i>`
                          : time
                      }
                    </p>                 
                </div>
                ${
                  message.type === "MSG" &&
                  direction === "justify-start" &&
                  message.status !== 0
                    ? msgButt(messageId, direction, message.pinned === 1)
                    : ""
                }
              </div>
              `
          );
  
          if (message.type === "form") {
            const messageElement = document.querySelector(
              `#message-${messageId} input.phoneInput`
            );
  
            if (messageElement) {
              phoneList(messageElement);
            }
  
            if (document.querySelector(`#submit-form-${messageId}`)) {
              document.querySelector(`#submit-form-${messageId}`)._form_data =
                message.message;
            }
          }
        }
  
        if (message.reacts.length > 0) {
          let messageReactions = message.reacts.map((react) => {
            return `
            <a id="react-${react._id}" ${
              newData.user !== react.user_id ? 'style="pointer-events: none"' : ""
            }>${react.path}</a>
          `;
          });
          const msgReacted = messagesContainer.querySelector(
            `#message-content-${messageId}`
          );
          msgReacted.innerHTML += `<div class="react-container bg-white dark:bg-navy-700" id="react-content-${messageId}">${messageReactions.join(
            ""
          )}</div>`;
        }
  
        if (message.type === "form" && myContent?.status == 0) {
          const allFormInput = document.querySelectorAll(`.field-${messageId}`);
          if (allFormInput.length > 0) {
            allFormInput.forEach((input) => {
              input.addEventListener("input", () =>
                sendTypingNotification(input)
              );
              input.addEventListener("focus", () => {
                sendFocusNotification(input);
              });
            });
          }
        }
        //lénna mta3 l plan message
        function sendPlanClickNotification(data, messageId) {
          const name = data.getAttribute("name");
          // Select the div element by its id
          const planDiv = document.getElementById(`plan-${messageId}`);
        
          // // Select the button element within the div
          // let buyButton = planDiv.querySelector("button.pricing-action");
        
          // // Select the loader element within the button
          // let loader = buyButton.querySelector(".loaderBuyButton");
        
          // // Display the loader and hide the button text
          // loader.style.display = "block";
          // buyButton.innerText = '';
        
        
          // You can remove or comment out this socketLib.addSale call for your specific implementation
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
            accountId:accountId
          });
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
        if (message.type === "MSG") {
          const messageElement = document.getElementById(`message-${messageId}`);
  
          const msgButtContainer = messageElement.querySelector(
            ".msg-butt-container"
          );
          const reactButtContainer = messageElement.querySelector(
            ".react-butt-container"
          );
          messageElement.addEventListener("mouseenter", () => {
            if(msgButtContainer){
              msgButtContainer.style.display = "block";
              reactButtContainer.style.display = "block";
            }
          });
          messageElement.addEventListener("mouseleave", () => { 
            if(msgButtContainer){
              msgButtContainer.style.display = "none";
              reactButtContainer.style.display = "none";
            }     
            
          });
        }
  
        const selectElement = document.querySelector(
          `#floating_field_${messageId}[data-country]`
        );
  
        $(selectElement).select2({
          placeholder: "Select your Country",
          width: '100%',
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
    reactions();
    getReactButton();
    getDeleteButtons();
    getEditButtons();
    getPinButtons();
  }