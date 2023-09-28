export let connectUsers = [];

import Event from "./lib_client/client_2.js";
const foued = new Event();
import { role, last_seen_at } from "./lib_client/client_2.js";
const currentDate = new Date();
let allConversation = [];
let agentClicked = "";
let PhoneNumberValidation = false;
let userCountry;
let clicked = false;
let firstTime = true;

const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const timeString =
  hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
// Save user information in local storage

import { accountId, API_KEY, max_length_message, MY_API_ADDRESS, SQL_API } from "./env.js";

function getCookie(name) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

let traduction = {};
function getTranslationValue(key) {
  return eval(`traduction.${key}`) ?? key;
}

function traduc() {
  document.querySelectorAll("[data-translation]").forEach((element) => {
    element.textContent = getTranslationValue(element.dataset.translation);
  });
}
import { Languages } from "./languages.js";
import { Countries } from "./countries.js";
let newData =
  getCookie("myData") !== undefined ? JSON.parse(getCookie("myData")) : null;
// Components
// The message input is where the user types their message
const messageInput = document.querySelector("#message-input");
// The send message button
const sendButton = document.querySelector("#send-message");
// The messages container that contains the messages
let messagesContainer = document.getElementById("big-container-message");
//the left container that contains the conversations
const leftConversationContainer = document.getElementById("left-conversation");
const minimizedSideBar = document.getElementById("mini-sidebar");
//the conversation container
const $conversationContainer = $("#conversation-container");
// get the conversation container
const conversationContainer = document.getElementById("conversation-container");
const emoji = document.querySelector("emoji-picker");
const conversationHeaderStatus = document
  .getElementById("conversation-name")
  .parentNode.querySelector(".text-xs");
const modal = document.getElementById("ModalPlan");

conversationContainer.oninput = (event) => {
  let target = event.target.closest(".form-input");
  if (target) {
    sendTypingNotification(target);
  }
};
const { data: countries } = await axios.get("countries.json");
conversationContainer.addEventListener("focusin", (event) => {
  let target = event.target.closest(".form-input");
  if (target) {
    sendFocusNotification(target);
  }
});
let userHasTyped = "";
function sendTypingNotification(input) {
  if (input.closest("form[data-submitted]")) {
    return;
  }

  if (userHasTyped !== input.dataset.fieldId) {
    addLogs({
      action: "fill",
      element: "22",
      element_id: +input.dataset.fieldId,
      messageId: input.id.replace("floating_field_", ""),
    });
    userHasTyped = input.dataset.fieldId;
  }
}
let focused;
function sendFocusNotification(input) {
  if (input.closest("form[data-submitted]")) {
    return;
  }
  if (focused !== input.dataset.fieldId) {
    addLogs({
      action: "focus",
      element: "22",
      element_id: +input.dataset.fieldId,
      messageId: input.id.replace("floating_field_", ""),
    });
  }
  focused = input.dataset.fieldId;
}

conversationContainer.addEventListener("click", (event) => {
  let target = event.target.closest("button.btn1");
  if (target) {
    const form = event.target.closest("form");

    const inputs = form.elements;
    // Iterate over the input fields and validate them
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.required && !input.value) {
        isValid = false;
        showValidationError(input, "This field is required.");
        break;
      }
      if (input.type === "number" && isNaN(Number(input.value))) {
        isValid = false;
        showValidationError(input, "Please enter a valid number.");
        break;
      }
      if (input.type === "date" && !isValidDate(input.value)) {
        isValid = false;
        showValidationError(input, "Please enter a valid date (YYYY-MM-DD).");
        break;
      }
      if (input.type === "country" && !isValidCountry(input.value)) {
        isValid = false;
        showValidationError(
          input,
          "Please enter a valid country code (2 characters)."
        );
        break;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (input.type === "email" && !emailRegex.test(input.value)) {
        isValid = false;
        showValidationError(input, "Please enter a valid email address.");
        break;
      }

      if (input.type === "tel" && !PhoneNumberValidation) {
        isValid = false;
        showValidationError(input, "Please enter a valid phone number.");
        break;
      }
    }
    if (isValid) {
      submitForm(target);
    } else {
      console.log("Please fill in all fields correctly.");
    }
  }
});

function isValidDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}

function isValidCountry(country) {
  // Validate that the country input is exactly two characters
  if (country.length !== 2) {
    return false;
  }
  // List of allowed country codes
  const allowedCountryCodes = [
    "AF",
    "AX",
    "AL",
    "DZ",
    "AS",
    "AD",
    "AO",
    "AI",
    "AQ",
    "AG",
    "AR",
    "AM",
    "AW",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BH",
    "BD",
    "BB",
    "BY",
    "BE",
    "BZ",
    "BJ",
    "BM",
    "BT",
    "BO",
    "BQ",
    "BA",
    "BW",
    "BV",
    "BR",
    "IO",
    "BN",
    "BG",
    "BF",
    "BI",
    "KH",
    "CM",
    "CA",
    "CV",
    "KY",
    "CF",
    "TD",
    "CL",
    "CN",
    "CX",
    "CC",
    "CO",
    "KM",
    "CG",
    "CD",
    "CK",
    "CR",
    "CI",
    "HR",
    "CU",
    "CW",
    "CY",
    "CZ",
    "DK",
    "DJ",
    "DM",
    "DO",
    "EC",
    "EG",
    "SV",
    "GQ",
    "ER",
    "EE",
    "ET",
    "FK",
    "FO",
    "FJ",
    "FI",
    "FR",
    "GF",
    "PF",
    "TF",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GI",
    "GR",
    "GL",
    "GD",
    "GP",
    "GU",
    "GT",
    "GG",
    "GN",
    "GW",
    "GY",
    "HT",
    "HM",
    "VA",
    "HN",
    "HK",
    "HU",
    "IS",
    "IN",
    "ID",
    "IR",
    "IQ",
    "IE",
    "IM",
    "IT",
    "JM",
    "JP",
    "JE",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KP",
    "KR",
    "XK",
    "KW",
    "KG",
    "LA",
    "LV",
    "LB",
    "LS",
    "LR",
    "LY",
    "LI",
    "LT",
    "LU",
    "MO",
    "MK",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MQ",
    "MR",
    "MU",
    "YT",
    "MX",
    "FM",
    "MD",
    "MC",
    "MN",
    "ME",
    "MS",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "AN",
    "NC",
    "NZ",
    "NI",
    "NE",
    "NG",
    "NU",
    "NF",
    "MP",
    "NO",
    "OM",
    "PK",
    "PW",
    "PS",
    "PA",
    "PG",
    "PY",
    "PE",
    "PH",
    "PN",
    "PL",
    "PT",
    "PR",
    "QA",
    "RE",
    "RO",
    "RU",
    "RW",
    "BL",
    "SH",
    "KN",
    "LC",
    "MF",
    "PM",
    "VC",
    "WS",
    "SM",
    "ST",
    "SA",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SX",
    "SK",
    "SI",
    "SB",
    "SO",
    "ZA",
    "GS",
    "SS",
    "ES",
    "LK",
    "SD",
    "SR",
    "SJ",
    "SZ",
    "SE",
    "CH",
    "SY",
    "TW",
    "TJ",
    "TZ",
    "TH",
    "TL",
    "TG",
    "TK",
    "TO",
    "TT",
    "TN",
    "TR",
    "TM",
    "TC",
    "TV",
    "UG",
    "UA",
    "AE",
    "GB",
    "US",
    "UM",
    "UY",
    "UZ",
    "VU",
    "VE",
    "VN",
    "VG",
    "VI",
    "WF",
    "EH",
    "YE",
    "ZM",
    "ZW",
  ];

  return allowedCountryCodes.includes(country.toUpperCase());
}

function showValidationError(inputElement, message) {
  // Add a class to the input element to change its border color to red
  inputElement.classList.add("invalid-input");

  // Show the validation error message to the user
  const errorMessageElement = document.createElement("div");
  errorMessageElement.className = "error-message";
  errorMessageElement.style.color = "red";
  errorMessageElement.innerText = message;

  // Check if an error message is already displayed and remove it if so
  inputElement.closest("label").querySelector(".error-message")?.remove();
  if (
    inputElement.classList.contains("phoneInput") &&
    inputElement.closest(".iti")
  ) {
    inputElement.closest(".iti").after(errorMessageElement);
  } else {
    inputElement.after(errorMessageElement);
  }
}

// Remove the validation error styles and messages when the input is corrected
document.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT") {
    const inputElement = event.target;
    inputElement.classList.remove("invalid-input");
    inputElement.closest("label")?.querySelector(".error-message")?.remove();
  }
});

const msgButt = (messageId, direction, isPinned) => {
  return `<div id="message-options" x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex "><button x-ref="popperRef" @click="isShowPopper = !isShowPopper" class="msg-butt-container btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"><i class="fas fa-ellipsis-h" style="font-size: 18px"></i></button><div x-ref="popperRoot" class="popper-root" :class="isShowPopper &amp;&amp; 'show'" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-594px, 231px);" data-popper-placement="bottom-end"><div  class="popper-box  rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"><ul>${
    direction === "justify-start"
      ? ""
      : `<li><a href="#" data-message-id="${messageId}" id="edit-message" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Edit</a></li>`
  }<li><a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Forward</a></li><li><a href="#" id="${
    isPinned ? "unpin-message" : "pin-message"
  }" data-message-id="${messageId}" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">${
    isPinned ? "Unpin" : "Pin"
  }</a>
  </li><li><a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Reply</a></li></ul>${
    direction === "justify-start"
      ? ""
      : `<div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div><ul><li><a  data-message-id="${messageId}" id="delete-message" href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Delete</a></li></ul>`
  }</div></div></div><div id="message-options" x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex"><button x-ref="popperRef" @click="isShowPopper = !isShowPopper" class="react-butt-container btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"><i class="fas fa-smile" style="font-size: 18px"></i></button><div x-ref="popperRoot" class="popper-root" :class="isShowPopper &amp;&amp; 'show'" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-594px, 231px);" data-popper-placement="bottom-end"><div  data-message-id="${messageId}" class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"><ul class="flex-row flex"><li><a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 ">👍</a>
  </li><li><a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">😂 </a></li><li><a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">😮</a></li><li><a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">😡</a></li><li><a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">❤️</a></li></ul></div></div></div>`;
};
window.connected = () => {};

// Global variables
let userId = newData?.user;
let conversationId;
let senderName;
let expert;
let notifyNumber = 0;
let userBalance;

// Disable the send message button if it's empty.
if (messageInput)
  messageInput.addEventListener("input", () => {
    if (messageInput.value.trim() === "" || userBalance === 0) {
      sendButton.disabled = true;
    } else {
      sendButton.disabled = false;
    }
  });

let firstConv = "";
//when receiving guest data from server save it in cookies
export async function guestCreated(data) {
  const newUser = {
    user: data.user,
    contact: data.contact,
    accountId: data.accountId,
    status: 0,
    ...(data.goccContactId && { goccContactId: data.goccContactId }),
    ...(data.goccLeadId && { goccLeadId: data.goccLeadId }),
  };

  newData = newUser;
  document.cookie =
    "myData=" +
    JSON.stringify(newUser) +
    "; expires=Tue, 31 Dec 9999 23:59:59 GMT; path=/";

  const usernameLink = document.querySelector("#userName");
  const clientIdElement = document.querySelector("#clientId");
  if (usernameLink) {
    usernameLink.textContent = `Guest #${data.contact}`;
    clientIdElement.textContent = `Client ID : #${data.contact}`;
  }
  expert = data.availableAgent;
  userId = data.user;
  firstConv = data.conversationId;
  // if (expert) {
  //   redirectToAgent(expert);
  // }
  const html = `
  <div class="conversationItem conversation bg-slate-150" data-conversation-id="${
    data.conversationId
  }" data-name=${
    data.senderName
  } data-timestamp=${timeString} id="left-conversation-${
    data.conversationId
  }" data-user-id="${data.availableAgent}">
    <div class="is-scrollbar-hidden mt-3 flex grow flex-col overflow-y-auto">
      <div
        class="conversation-click flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600"
        data-conversation-id="${data.conversationId}"
        data-name=${data.senderName}>
        <div class="avatar h-10 w-10">
          <img class="rounded-full" src=images/avatar/avatar-${
            data.user.id
          }.jpg alt="avatar" />
          <div
          id="active-user"
            class="absolute right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-navy-700">
          </div>
        </div>
        <div class="flex flex-1 flex-col">
          <div class="flex items-baseline justify-between space-x-1.5">
            <p  ${
              data.role === "BOT" ? "data-robot" : ""
            } data-conversation-name class="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
            ${data.senderName}
            </p>
            <span class="text-tiny+ text-slate-400 dark:text-navy-300">${timeString}</span>
          </div>
          <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftMsg"> 
            <p class="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300" id="last-message">
              Contact form 
            </p>
       
          </div>
          

          <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftTyping"> 
          <div>
            <div class="flex" class="pe-3">
              <div
                id="typing-display"
                class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 relative "
              >
                <div class="d-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    style="background: none"
                    width="45px"
                    height="20px"
                  >
                    <circle
                      cy="62.5"
                      fill="#C4C4C46b"
                      r="20"
                      cx="1.5"
                    >
                      <animate
                        attributeName="cy"
                        calcMode="spline"
                        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                        repeatCount="indefinite"
                        values="62.5;37.5;62.5;62.5"
                        keyTimes="0;0.25;0.5;1"
                        dur="1s"
                        begin="-0.5s"
                      ></animate>
                    </circle>
                    <circle
                      cy="62.5"
                      fill="#c4c4c498"
                      r="20"
                      cx="52.5"
                    >
                      <animate
                        attributeName="cy"
                        calcMode="spline"
                        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                        repeatCount="indefinite"
                        values="62.5;37.5;62.5;62.5"
                        keyTimes="0;0.25;0.5;1"
                        dur="1s"
                        begin="-0.375s"
                      ></animate>
                    </circle>
                    <circle
                      cy="62.5"
                      fill="#c4c4c4"
                      r="20"
                      cx="107.5"
                    >
                      <animate
                        attributeName="cy"
                        calcMode="spline"
                        keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                        repeatCount="indefinite"
                        values="62.5;37.5;62.5;62.5"
                        keyTimes="0;0.25;0.5;1"
                        dur="1s"
                        begin="-0.25s"
                      ></animate>
                    </circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
       
          </div>
        </div>
      </div>
    </div>
  </div>`;
  const newConvDiv = document.createElement("div");
  inputLEngth(max_length_message);
  // Append the HTML to the container
  newConvDiv.innerHTML = html;
  leftConversationContainer.insertBefore(
    newConvDiv,
    leftConversationContainer.firstChild
  );
}

/**
 * Display all connected agents
 */
const displayedUsers = new Set();
let expertAppended = false;
let offline;
export async function getExperts() {
  const response = await axios.get(
    `${MY_API_ADDRESS}/users/connected/?accountId=${accountId}`
  );
  if (response.data.message === "success") {
    connectUsers = response.data.data;

    if (response.data.data.length > 0 && !expertAppended) {
      const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_on">${getTranslationValue(
        "left_side.experts_on"
      )}</span>`;
      $("#expert-msg").empty().append(html);
      expertAppended = true;
    } else {
      offline = true;
      const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_off" >All Experts are offline </span>`;
      $("#expert-msg").empty().append(html);
      expertAppended = true;
    }
    response.data.data.forEach((user) => {
      displayExpert(user);
    });
  }
}
export function checkForExpertMessages() {
  const swiper = document.querySelector(".swiper");
  const swiperWrapper = swiper.querySelector(".swiper-wrapper");
  const divsInsideSwiper = Array.from(
    swiperWrapper.querySelectorAll("div.swiper-slide")
  );
  if (divsInsideSwiper.length > 0) {
    const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_on">${getTranslationValue(
      "left_side.experts_on"
    )}</span>`;
    $("#expert-msg").empty().append(html);
  } else {
    const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_off" >All Experts are offline </span>`;
    $("#expert-msg").empty().append(html);
  }
}

export function displayExpert(user) {
  const agentDisco = document.getElementById(`${user._id}`);
  if (!agentDisco) {
    displayedUsers.add(user._id);
    const html = `
    <div id="${user._id}" data-name="${user.full_name}" class="swiper-slide flex w-11 shrink-0 flex-col items-center justify-center">
      <div class="h-11 w-11 rounded-full bg-gradient-to-r from-purple-500 to-orange-600 p-0.5">
        <img class="h-full w-full rounded-full border-2 border-white object-cover dark:border-slate-700"
        src=images/avatar/avatar-${user.id}.jpg  alt="avatar" />
      </div>
      <p class="mt-1 w-14 break-words text-center text-xs text-slate-600 dark:text-navy-100">
        ${user.full_name}
      </p>
    </div>
    `;
    $(".swiper-wrapper").append(html);
  }
}

export async function removeExpert(userId) {
  const agentDisco = document.getElementById(`${userId}`);
  if (agentDisco) {
    agentDisco.remove();
  }
}

function truncateMessage(message, maxLength) {
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + "...";
  }
  return message;
}

//select the agent from the list connected agents and open the conversation they share if they already have one , if not open an empty conversation-container
async function selectExpert() {
  $(".swiper-wrapper").on("click", ".swiper-slide", async function () {
    if (newData.status == "1") {
      messagesContainer.innerHTML = "";
      // Get the unique ID of the agent clicked
      const agent = $(this).attr("id");
      const name = $(this).data("name");
      const agentContactId = connectUsers.find((user) => user._id === agent);
      if (name === "Robot" || name === "Rosie") {
        getAgentPresentation("0", true);
      } else {
        getAgentPresentation(agentContactId.id, true);
      }
      senderName = name;
      expert = agent;
      agentClicked = agent;
      const $conversationContainer = $("#conversation-container");
      // Check if they both have conversation, if yes, just handle click to left conversation
      if (userId) {
        // const response = await axios.get(
        //   `https://foued.local.itwise.pro/socket_api/conversation/?user1=${userId}&user2=${agent}`
        // );
        foued.checkConversation({
          userId: userId,
          agentId: agent,
          accountId: newData.accountId,
        });
        conversationHeaderStatus.dataset.translation = connectUsers.find(
          (user) => user._id === agent
        )
          ? "general.online"
          : "header.lastSeen";
        conversationHeaderStatus.textContent =
          traduction[conversationHeaderStatus.dataset.translation];

        const activeUser = document.getElementById("active-user-header");
        activeUser.classList.remove("bg-slate-300");
        activeUser.classList.add("bg-success");
        // if (!response.data.data) {
        //   conversationId = "";
        //   messagesContainer.innerHTML = "";

        //   let activeChat = {
        //     chatId: conversationId,
        //     name: name,
        //     avatar_url: `images/avatar/avatar-${agentContactId.id}` + ".jpg",
        //   };
        //   window.dispatchEvent(
        //     new CustomEvent("change-active-chat", {
        //       detail: activeChat,
        //     })
        //   );

        //   $conversationContainer.attr("data-conversation-id", null);
        // } else {
        //   conversationId = !response.data.data.conversation
        //     ? response.data.data[0]._id
        //     : response.data.data.conversation[0]._id;
        //   // Update the active chat with the conversation data
        //   window.dispatchEvent(
        //     new CustomEvent("change-active-chat", {
        //       detail: {
        //         chatId: conversationId,
        //         name: name,
        //         avatar_url:
        //           `images/avatar/avatar-${agentContactId.id}` + ".jpg",
        //       },
        //     })
        //   );
        //   expert = agent;
        //   $conversationContainer.attr("data-conversation-id", conversationId);
        //   // Load the first page of messages on page load
        //   let currentPage = 1;
        //   foued.loadMessages({
        //     page: currentPage,
        //     conversationId: conversationId,
        //   });
        // }
      }
    } else {
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = `
    <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
      <div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
      <div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>

        <div class="mt-4" style="width:344px" >
          <h2 class="text-2xl text-slate-700 dark:text-navy-100">
            Welcome to Dellastro
          </h2>
          <p class="mt-2">
            Please feel free to fill the form .
          </p>
          <button @click="showModal = false" class="btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90">
            Close
          </button>
        </div>
      </div>
    </div>
    `;

      // Hide the modal when the Close button is pressed
      const closeButton = modalDiv.querySelector("button");
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalDiv);
      });
      document.body.appendChild(modalDiv);
    }
  });
}

function formatDate(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}`;
}

function formatWeekdayDate(date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = daysOfWeek[date.getDay()];
  const time = formatDate(date);
  return `${weekday}, ${time}`;
}

function formatFullDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = formatDate(date);
  return `${day}/${month}/${year}, ${time}`;
}
let latestConversationId = null;

export async function getAllConversations() {
  latestConversationId = null;
  leftConversationContainer.innerHTML = "";
  let userConversation = "";

  const conversationsResponse = await axios.get(
    `${MY_API_ADDRESS}/conversation/${accountId}/?user_id=${newData.contact}`
  );

  if (conversationsResponse.data.data.length > 0) {
    const conversations = conversationsResponse.data.data;
    allConversation = conversations;
    conversationId = conversations[0]?._id;
    const conversationPromises = conversations.map(
      async (conversation, index) => {
        conversation.members.forEach((user) => {
          if (userId !== user._id) userConversation = user._id;
        });
        const { _id: conversationId, name } = conversation;

        const timestamp = conversation.updated_at;
        const now = new Date();
        const messageDate = new Date(timestamp);

        let time;

        if (now.toDateString() === messageDate.toDateString()) {
          time = formatDate(messageDate);
        } else if (
          now.getFullYear() === messageDate.getFullYear() &&
          now.getMonth() === messageDate.getMonth() &&
          now.getDate() - messageDate.getDate() <= 6
        ) {
          time = formatWeekdayDate(messageDate);
        } else {
          time = formatFullDate(messageDate);
        }
        let isActive = false;
        for (let i = 0; i < connectUsers.length; i++) {
          if (
            conversation.members.find(
              (user) => user._id === connectUsers[i]._id
            )
          ) {
            isActive = true;
          }
        }
        const agentFullNames = conversation.member_details
          .filter((member) => member.role === "AGENT" || member.role === "BOT")
          .map((agent) => agent.full_name);

        const bot = conversation.member_details
          .filter((member) => member.role === "BOT")
          .map((robot) => robot);

        if (bot[0]) {
          const agentDisco = document.getElementById(bot[0]._id);

          if (!agentDisco) {
            displayedUsers.add(bot[0]._id);
            const html = `<div id="${bot[0]._id}" data-name=${bot[0].full_name} class="swiper-slide flex w-11 shrink-0 flex-col items-center justify-center"><div class="h-11 w-11 rounded-full bg-gradient-to-r from-purple-500 to-orange-600 p-0.5"><img class="h-full w-full rounded-full border-2 border-white object-cover dark:border-slate-700" src=images/avatar/avatar-0.jpg alt="avatar" /></div><p class="mt-1 w-14 break-words text-center text-xs text-slate-600 dark:text-navy-100">${bot[0].full_name}</p></div>`;

            $(".swiper-wrapper").append(html);
          }
        }
        let userLog = "";
        if (conversation?.last_message?.type === "log") {
          const log = JSON.parse(conversation.last_message.message);
          switch (log.action) {
            case "fill":
              userLog = `You filled on the form.`;
              break;
            case "focus":
              userLog = `You focus on the form.`;
              break;
            case "purchase":
              userLog = `You purchased the <b> ${log.plan_name} </b>plan.`;
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
          }
        }
        let msg = "";
        switch (conversation.last_message?.type) {
          case "link":
            msg =
              conversation.last_message.user === userId
                ? "You sent a link"
                : `${"Agent"}  sent a link`;
            break;
          case "plan":
            msg =
              conversation.last_message.user === userId
                ? "You sent a plan"
                : `${"Agent"}  sent a plan`;
            break;
          case "form":
            msg =
              conversation.last_message.user === userId
                ? "You sent a form"
                : `${"Agent"}  sent a form`;
            break;
          case "log":
            msg = userLog;
            break;
          case undefined:
            break;
          default:
            msg = conversation.last_message.message;
            break;
        }
        const html = `
      <div class="conversationItem  conversation ${
        index === 0 ? "active" : ""
      }" data-conversation-id="${conversationId}" data-user-id="${userConversation}" data-name="${agentFullNames}" data-timestamp="${timestamp}" id="left-conversation-${conversationId}">
      <div class="is-scrollbar-hidden mt-3 flex grow flex-col overflow-y-auto">
        <div class="conversation-click flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600" 
        data-conversation-id="${conversationId}" data-name="${agentFullNames}">
          <div class="avatar h-10 w-10">
            <img class="rounded-full" src=images/avatar/avatar-${conversation.member_details
              .filter(
                (member) => member.role === "AGENT" || member.role === "BOT"
              )
              .map((agent) => agent.id)}.jpg alt="avatar" />
            <div id="active-user" class="absolute right-0 h-3 w-3 rounded-full border-2 border-white ${
              conversation.status == "1" ? "bg-success" : "bg-slate-300"
            } dark:border-navy-700"></div>
          </div>
          <div class="flex flex-1 flex-col">
            <div class="flex items-baseline justify-between space-x-1.5">
              <p ${
                conversation.member_details.find(
                  (member) => member.role === "BOT"
                )
                  ? "data-robot"
                  : ""
              } data-conversation-name class="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
                ${agentFullNames}
              </p>
              <span class="text-tiny+ text-slate-400 dark:text-navy-300">${time}</span>
            </div>
            <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftTyping">
              <div>
                <!-- Smaller typing block -->
                <div id="typing-display" class="rounded-full bg-white p-2 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 relative" style="width: 25%;">
                <div class="d-flex">
                  <!-- Decrease the size of the SVG -->
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none" width="25px" height="15px">
                    <circle cy="62.5" fill="#C4C4C46b" r="15" cx="1.5">
                      <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.5s"></animate>
                    </circle>
                    <circle cy="62.5" fill="#c4c4c498" r="15" cx="52.5">
                      <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.375s"></animate>
                    </circle>
                    <circle cy="62.5" fill="#c4c4c4" r="15" cx="107.5">
                      <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.25s"></animate>
                    </circle>
                  </svg>
                </div>
              </div>
              
              
                <!-- End of Smaller typing block -->
              </div>
            </div>
            <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftMsg">
  <p class="text-xs+ text-slate-400 dark:text-navy-300" id="last-message">
    ${
      conversation.last_message?.status === 0
        ? conversation.last_message?.user === userId
          ? "You deleted a message"
          : conversation.member_details.find(
              (member) => member._id === conversation.last_message.user
            ).full_name + " deleted a message"
        : conversation.last_message?.user === newData.user
        ? "Me: " + truncateMessage(msg, 20)
        : truncateMessage(msg, 20)
    }
  </p>
</div>
          </div>
        </div>
      </div>
    </div>
    

`;

        const minimizedHtmlSideBar = `
<div class="mini-conversation-click flex cursor-pointer items-center justify-center py-2.5 hover:bg-slate-150 dark:hover:bg-navy-600 conversation ${
          index === 0 ? "active" : ""
        }" data-conversation-id="${conversationId}" data-user-id="${userConversation}" data-name="${agentFullNames}" data-timestamp="${timestamp}" id="left-mini-conversation-${conversationId}">
                <div class=" avatar h-10 w-10" >
                  <img class="rounded-full"src=images/avatar/avatar-${conversation.member_details
                    .filter(
                      (member) =>
                        member.role === "AGENT" || member.role === "BOT"
                    )
                    .map((agent) => agent.id)}.jpg  alt="avatar">
                  <div id="active-user" class="absolute right-0 h-3 w-3 rounded-full border-2 border-white ${
                    conversation.status == 1 ? "bg-success" : "bg-slate-300"
                  }  dark:border-navy-700"></div>
                </div>
              </div>
`;

        const existingElement = document.querySelector(
          `[data-conversation-id="${conversationId}"]`
        );

        if (!existingElement) {
          minimizedSideBar.innerHTML += minimizedHtmlSideBar;
        }
        leftConversationContainer.innerHTML += html;
      }
    );
    // Update the latest conversation ID
    latestConversationId = conversationId;
    // Trigger a click event on the latest conversation
    if (latestConversationId) {
      $(
        `.conversation-click[data-conversation-id="${latestConversationId}"]`
      ).trigger("click");
    }
    await Promise.all(conversationPromises);
  }
}
// this function is a handle click , so whenever the client click on a conversation it call the load messages function where messages should be displayed in the messagesContainer
async function handleConversationClick() {
  agentClicked = $(this).parent().parent().data("user-id");

  messagesContainer.innerHTML = "";
  expert = agentClicked;
  const conversationActive = document.querySelectorAll(
    "div.conversation-click"
  );

  document.getElementById("big-container-message").style.display = "block";
  const conversation_id = $(this).data("conversation-id");
  conversationId = conversation_id;

  $conversationContainer.attr("data-conversation-id", conversationId);

  const name = this.dataset.name;
  let exist = allConversation.find(
    (conversation) => conversation._id === conversationId
  );
  if (!exist && conversation_id) {
    //get conversation_id  details with member_details
    const conversationsResponse = await axios.get(
      `${MY_API_ADDRESS}/conversation/${accountId}/?user_id=${newData.contact}`
    );

    if (conversationsResponse.data.data.length > 0) {
      const conversations = conversationsResponse.data.data;
      allConversation = conversations;
      exist = allConversation.find(
        (conversation) => conversation._id === conversationId
      );
    }
  }
  inputLEngth(exist?.max_length_message);
  conversationActive.forEach((element) => {
    if (element.classList.contains("bg-slate-150"))
      element.classList.remove("bg-slate-150");
  });
  
  $(this).addClass("bg-slate-150");
  let agentContactId = exist.member_details
  .filter((member) => member.role === "AGENT" || member.role === "BOT")
  .map((agent) => agent.id);
  if (exist?.status == 1) {
    conversationHeaderStatus.dataset.translation = "general.online";
    conversationHeaderStatus.textContent =
      getTranslationValue("general.online");

    const activeUser = document.getElementById("active-user-header");
    activeUser.classList.remove("bg-slate-300");
    activeUser.classList.add("bg-success");
    getAgentPresentation(agentContactId[0], true);
  } else {
    conversationHeaderStatus.dataset.translation = "header.lastseen";
    conversationHeaderStatus.textContent =
      getTranslationValue("header.lastseen");

    const activeUser = document.getElementById("active-user-header");
    activeUser.classList.remove("bg-success");
    getAgentPresentation(agentContactId[0], false);
  }
  // Set the conversation ID as an attribute of the conversation container element
  const conversationName = document.getElementById("conversation-name");
  conversationName.textContent = name;

  // Load the first page of messages on page load
  let currentPage = 1;

  foued.loadMessages({ page: currentPage, conversationId: conversationId });
  // Update the active chat with the conversation data

  let activeChat = {
    chatId: conversationId,
    name: name,
    avatar_url:
      "images/avatar/avatar-" +
      agentContactId[0] +
      ".jpg",
  };

  window.dispatchEvent(
    new CustomEvent("change-active-chat", {
      detail: activeChat,
    })
  );

  markMessageAsSeen(conversationId);
}

function inputLEngth(conversationMaxMsg) {
  if (conversationMaxMsg) {
    messageInput.setAttribute("maxlength", conversationMaxMsg);
    document.getElementById(
      "max-length-value"
    ).textContent = ` ${conversationMaxMsg} `;
    messageInput.addEventListener("input", function () {
      document.getElementById(
        "max-length-value"
      ).textContent = ` ${conversationMaxMsg} | ${
        conversationMaxMsg - this?.value.length
      }`;
    });
  }
}
function resetMaxLength(initialMaxLength) {
  onStopTyping();

  messageInput.setAttribute("maxlength", initialMaxLength);
  document.getElementById(
    "max-length-value"
  ).textContent = ` ${initialMaxLength}`;

}

async function getTheLastMsg(conversationId) {
  return axios
    .get(`${MY_API_ADDRESS}/messages/lastMsg/${conversationId}`)
    .then(function (response) {
      if (response) {
        const lastMessage = response.data.data;
        return lastMessage;
      }
    });
}

async function markMessageAsSeen(conversationId) {
  if (conversationId) {
    getTheLastMsg(conversationId).then((res) => {
      if (res.user !== newData.user && !res.read) {
        foued.markMessageAsRead({
          app: "638dc76312488c6bf67e8fc0",
          user: newData.user,
          action: "message.read",
          metaData: {
            conversation: conversationId,
            message: res?._id,
          },
        });
        // const unreadCount = document.getElementById(`unread-count-${conversationId}`)
        // if (unreadCount) {
        //   unreadCount.classList.add("hidden")
        //   unreadCount.classList.remove("flex")
        // }
      }
    });
  } else {
  }
}

/**
 * Loads messages of a conversation.
 * @param {number} page - The page number to load.
 * @param {string} conversationId - The ID of the conversation to load messages for.
 */
let isLoading = false;
let isEndOfMessages = false; // Track if all messages have been loaded
const spinner = document.getElementById("conversation-spinner");
const bigSpinner=document.getElementById("page-one-spinner")
const limit = 10;
export async function loadMessages(response) {
  // Show the big container message
  document.getElementById("big-container-message").style.display = "block";

  if (conversationId) {
    try {

      if (response.message !== "success") {
        throw new Error("Failed to load messages");
      }
      displayMessages(response.data);
      if (response.data.currentPage == 1) {
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
        bigSpinner.classList.remove("hidden");
      }else {
      spinner.classList.remove("hidden");
      }
      if (
        response.data.currentPage === response.data.totalPages ||
        response.data.currentPage > response.data.totalPages
      ) {
        // All messages have been loaded
        isEndOfMessages = true;
      }
      if (conversationContainer.scrollTop === 0 && !isEndOfMessages) {
        foued.loadMessages({
          page: response.data.currentPage + 1,
          conversationId: conversationId,
          limit: limit,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Hide the spinner
      spinner.classList.add("hidden");
      isLoading = false;
    }
  }
}

// Listen for the scroll event on the container element
const container = document.getElementById("conversation-container");
if (container) {
  container.addEventListener("scroll", () => {
    const currentPage = Math.ceil(
      container.scrollHeight / container.clientHeight
    );
    if (container.scrollTop === 0 && !isLoading) {
      // Load messages only if all messages have not been loaded
      if (!isEndOfMessages) {
        container.scrollTop = container.scrollHeight * 0.1;

        foued.loadMessages({
          page: currentPage,
          conversationId: container.dataset.conversationId,
        });
      }
    }
  });
}

let formElement = "";

function submitForm(element) {
  formElement = element;
  let messageContent = element.closest('[id^="message-content-"]');
  let messageId = messageContent?.id?.replace("message-content-", "");
  const form = JSON.parse(element._form_data);
  let forms = [];
  const formContact = element.closest("form");
  const formContent = formContact.parentNode;

  const formInputs = formContact.querySelectorAll("input, select,textarea");
  const successMessage = formContact.querySelector("#text_capture");

  element.innerHTML = `<div class="d-flex align-items-center" style="height: 20px;" ><span class="loader2"></span></div>`;

  for (let i = 0; i < formInputs.length; i++) {
    forms = [
      ...forms,
      {
        fieldId: formInputs[i].dataset.fieldId,
        value: formInputs[i].value,
      },
    ];
  }

  forms = [...formContact.querySelectorAll("input, select,textarea")].map(
    (field) => {
      let formField = form.fields.find(
        (fField) => fField.field_id == field.dataset.fieldId
      );
      if (formField) {
        formField.field_value = field.value;
      }
      return {
        fieldId: field.dataset.fieldId,
        value: field.value,
      };
    }
  );

  form.fields = form.fields.map((field) => {
    let fieldValue = forms.find((fild) => fild.fieldId == field.field_id);
    if (fieldValue) {
      field.field_value = fieldValue.value;
    }
    return field;
  });

  form.status = 1;
  form.messageId = messageId;

  foued.saveFormData(
    JSON.stringify({
      contact: newData.contact,
      forms,
      messageId,
      form,
      conversationId,
    })
  );

  element.disabled = true;
  formInputs.forEach((input) => {
    input.disabled = true;
  });

  successMessage?.classList.remove("hidden");

  setTimeout(() => {
    successMessage?.classList.add("hidden");
  }, 3000);
}

function compareFields(a, b) {
  switch (a.field_name.toLowerCase()) {
    case "first name":
      return -1;
    case "last name":
      return b.field_name.toLowerCase() === "first name" ? 1 : -1;
    case "country":
      return ["first name", "last name"].includes(b.field_name.toLowerCase())
        ? 1
        : -1;
    case "phone":
      return ["first name", "last name", "country"].includes(
        b.field_name.toLowerCase()
      )
        ? 1
        : -1;
    default:
      return ["first name", "last name", "country", "phone"].includes(
        b.field_name.toLowerCase()
      )
        ? 1
        : 0;
  }
}

function displayMessages(messages) {
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
    const timestamp = message.created_at;
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const messageDay = messageDate.getDate();
    const messageMonth = messageDate.getMonth();
    const messageYear = messageDate.getFullYear();
    let time;
    if (
      currentDay === messageDay &&
      currentMonth === messageMonth &&
      currentYear === messageYear
    ) {
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes().toString().padStart(2, "0");
      time = `${hour}:${minute}`;
    } else {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeek = daysOfWeek[messageDate.getDay()];
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes().toString().padStart(2, "0");

      if (currentYear === messageYear) {
        if (currentMonth === messageMonth && currentDay - messageDay <= 7) {
          time = `${dayOfWeek}, ${hour}:${minute}`;
        } else {
          const formattedDate = `${messageDay}/${
            messageMonth + 1
          }/${messageYear}`;
          time = `${formattedDate}, ${hour}:${minute}`;
        }
      } else {
        const formattedDate = `${messageDay}/${
          messageMonth + 1
        }/${messageYear}`;
        time = `${formattedDate}, ${hour}:${minute}`;
      }
    }
    const myContent =
      message.type === "plan" ||
      message.type === "form" ||
      message.type === "link"
        ? JSON.parse(message.message)
        : {};
    if (!messageContainer) {
      let tableRows = "";
      if (Object.keys(myContent).length !== 0 && message.type === "plan") {
        tableRows = myContent.plans.map((plan) => {
          return `
  <div class="pricing pricing-palden">
  <div class="pricing-item" id="plan-${messageId}" data-plan-id="${plan.id}" name="${plan.name}">
  <div class="pricing-deco">
    <svg class="pricing-deco-img" enable-background="new 0 0 300 100" height="100px" id="Layer_1" preserveAspectRatio="none" version="1.1" viewBox="0 0 300 100" width="300px" x="0px" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" y="0px">
      <path class="deco-layer deco-layer--1" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" fill="#FFFFFF" opacity="0.6"></path>
      <path class="deco-layer deco-layer--2" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" fill="#FFFFFF" opacity="0.6"></path>
      <path class="deco-layer deco-layer--3" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
H42.401L43.415,98.342z" fill="#FFFFFF" opacity="0.7"></path>
      <path class="deco-layer deco-layer--4" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" fill="#FFFFFF"></path>
    </svg>
    <div class="pricing-price"><span class="pricing-currency"> ${plan.currency} </span>${plan.tariff}
    </div>
    <h3 class="pricing-title">${plan.name}</h3>
  </div>
  <ul class="pricing-feature-list">
    <li class="pricing-feature">${plan.billing_volume} Messages</li>
  </ul>
  <button class="pricing-action">Buy Plan</button>
</div>  
          `;
        });
      } else if (message.type === "bloc") {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `<div class="flex flex-col items-start space-y-3.5">
        <div class="mr-1">
            <div class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                <div class="space-y-3.5">
                    <div class="ml-2 sm:ml-5">
                        <div id="message-content-${messageId}">
                            <div class="ml-2 sm:ml-5">
                                <div class="sm:mr-10">
                                    <div class="pt-2">
                                        <p>Formulaire soumis avec succès
                                        </p>
                                        <p>Afin de démarrer votre consultation privée totalement confidentielle, veuillez choisir ci-dessous le type souhaité de mise en relation</p>
                                    </div>
                                    <div class="flex" style="width: 500px;">
                                        <div class="flex h-20 w-full items-center rounded-lg dark:bg-navy-500">
                                            <button id="AvailableAgent" class="btn  space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-warning-focus focus:bg-primary-focus active:bg-warning-focus/90" style="min-height: 50px;width: 225px;">
                                                <span>Mise en relation directe</span>
                                            </button>
                                        </div>
                                        <div class="mx-4 flex items-center space-y-3">
                                            <p>ou</p>
                                        </div>
                                        <div class="flex h-20 w-full items-center rounded-lg dark:bg-navy-500">
                                            <button id="selectAgent" class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-warning-focus focus:bg-primary-focus active:bg-warning-focus/90" style="min-height: 50px;width: 220px;">
                                                <span>Choisir un Expert</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="pin-div" class="hidden pin-div-sender justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
        messagesContainer.insertAdjacentElement("afterbegin",messageDiv);
        const btnAvailableAgent = messageDiv.querySelector("#AvailableAgent");
        btnAvailableAgent.addEventListener("click", function () {
          foued.availableAgent({
            accountId: newData.accountId,
            conversationId: conversationId,
            userId: newData.user,
          });
        });
        const btnSelectAgent = messageDiv.querySelector("#selectAgent");
        btnSelectAgent.addEventListener("click", function () {
          foued.displayAgents(newData.accountId);
        });
        continue;
      } else if (message.type === "form") {
        let inputForms = "";
        if (myContent.fields) {
          myContent.fields.sort(compareFields);
          inputForms = myContent.fields.map((field) => {
            let type = "";
            switch (+field?.field_type) {
              case 1:
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
            if (field?.field_name?.toLowerCase() === "country") {
              const countryOptions = generateCountryOptions(
                countries,
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
            } else if (field.field_name?.toLowerCase() === "phone") {
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
                    : `<input
                      id="floating_field_${messageId}"
                      class="form-input field-${messageId} mt-1.5 w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" 
                      placeholder="${field?.field_name}" 
                      name="${field?.field_name?.replace(" ", "")}" 
                      data-field-id="${field?.field_id}"
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
                    newData.goccContactId || newData.goccLeadId ? "gocc" : ""
                  } card-form" style="position: relative;">
                      <div class="mt-20 w-full max-w-xl p-4 sm:p-5">
                          <div class="mb-4">
                              <h3 class="text-2xl font-semibold">${
                                myContent.friendly_name
                              }</h3>
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
                                      <button class="btn1 min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                                          id="submit-form-${message._id}" data-content='${message.message}'
                                      >
                                          <span class="spinner hidden absolute inset-0 flex justify-center items-center">
                                          </span>
                                          Save
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
      if (message.type === "log") {
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
            userLog = `Purchase completed successfully.`;
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
          message.user === newData.user ? "justify-end" : "justify-start";
        const msgStyle =
          message.user === newData.user && !message.paid
            ? `rounded-2xl break-words  rounded-tl-none bg-msg p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100`
            : `rounded-2xl break-words  relative rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white`;
        messagesContainer.insertAdjacentHTML(
          "afterbegin",
          `<div id="message-${messageId}" class="flex items-start ${direction} space-x-1.5 ${
            message.type === "plan" ? "plans-container" : ""
          }">
              <div class="flex flex-col   ${
                message.user !== newData.user ? "items-start" : "items-end"
              }  space-y-3.5">
              ${message.type === "MSG" ? `<div class="flex flex-row">` : ""}
                ${
                  message.type === "MSG" &&
                  direction === "justify-end" &&
                  message.status !== 0
                    ? msgButt(messageId, direction, message.pinned === 1)
                    : ""
                }
                <div class="ml-2 max-w-lg sm:ml-5">
                  ${
                    message.type === "MSG" || message.type === "link"
                      ? `
                      <div class="${
                        message.type === "link"
                          ? "rounded-2xl break-words relative rounded-tr-none bg-violet-300 p-3 text-slate-700 shadow-sm dark:bg-violet-500 dark:text-white"
                          : msgStyle
                      }" id="message-content-${messageId}">
                        ${
                          message.status === 0
                            ? `${
                                direction === "justify-start"
                                  ? message.user_data.full_name
                                  : "You"
                              } unsent a message`
                            : message.type === "link"
                            ? `<a class="link-msg" id="linked-msg-${messageId}" data-link-id="${myContent.userLink.id}" href="${myContent.userLink?.url}" target="_blank">${myContent.userLink?.url}</a>`
                            : message.type === "plan"
                            ? tableRows.join("")
                            : message.type === "form"
                            ? tableRows
                            : message.message
                        }
                      <div id="pin-div" class="${
                        message.pinned === 0 || message.status === 0
                          ? "hidden"
                          : "flex"
                      } ${
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
                      </div></div>`
                      : `
                      <div id="message-content-${messageId}">
                      <div class="ml-2 max-w-lg sm:ml-5">
                        ${
                          message.status === 0
                            ? `${
                                direction === "justify-start"
                                  ? message.user_data.full_name
                                  : "You"
                              } unsent a message`
                            : message.type === "plan"
                            ? tableRows.join("")
                            : message.type === "form"
                            ? tableRows
                            : message.message
                        }
                        <div id="pin-div" class="${
                          message.pinned === 0 || message.status === 0
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
          }  text-xs text-slate-400 dark:text-navy-300">
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
      function sendPlanClickNotification(data, messageId) {
        modal.classList.remove("hidden");
        successButton.setAttribute("data-plan", data.dataset.planId);
        successButton.setAttribute("message-id", messageId);
        const name = data.getAttribute("name");
        successButton.setAttribute("name", name);
        // Update message to status not paid: 2
        addLogs({
          action: "start purchase",
          element: "3",
          element_id: +data.dataset.planId,
          messageId: messageId,
        });
      }
      function sendClickingNotification(data) {
        foued.linkClick(data.id.replace("linked-msg-", ""));
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

//whenever a user click on the message link fire this function
async function addLogs(log, aux = {}) {
  const logData = {
    user_id: newData.contact.toString(),
    action: log.action,
    element: log.element,
    element_id: log.element_id,
    log_date: currentDate,
    source: "3",
  };
  if (log.messageId) {
    logData.messageId = log.messageId;
  }

  foued.onCreateMessage({
    app: "638dc76312488c6bf67e8fc0",
    user: newData.user,
    action: "message.create",
    metaData: {
      type: "log",
      conversation_id: conversationId,
      user: newData.user,
      message: JSON.stringify(logData),
      origin: "web",
    },
    to: expert,
    aux: aux,
    logData: logData,
  });
}
/**
 * open a new blank conversation
 */
export async function sendFirstMessage(conversation) {
  conversationContainer.dataset.conversationId = conversation._id;
  foued.onCreateMessage({
    app: "638dc76312488c6bf67e8fc0",
    user: newData.user,
    action: "message.create",
    from: newData.socket_id,
    metaData: {
      type: "MSG",
      conversation_id: conversation._id,
      user: newData.user,
      message: messageInput.value,
      data: "non other data",
      origin: "web",
    },
    to: senderName,
  });
  messageInput.value = "";
  isSendingMessage = false; // Set the sending state to false
}

if (sendButton)
  sendButton.addEventListener("click", async () => {
    sendMessage();
  });

export async function sendBuyMessage(data) {
  try {
    foued.onCreateMessage({
      app: "638dc76312488c6bf67e8fc0",
      user: newData.user,
      action: "message.create",
      metaData: {
        type: "log",
        conversation_id: conversationId, // Include the conversation ID
        user: newData.user,
        message: JSON.stringify(data),
        data: "non other data",
        origin: "web",
      },
      to: expert,
    });
  } catch (error) {
    console.log(error);
  }
}

let isSendingMessage = false;

async function sendMessage() {
  if (isSendingMessage) return; // If a message is already being sent, ignore the function call

  if (messageInput.value.trim() !== "") {
    isSendingMessage = true; // Set the sending state to true

    if (!emoji.classList.contains("hidden")) emoji.classList.add("hidden");
    if (conversationId == "") {
      try {
        foued.createConversation({
          app: "638dc76312488c6bf67e8fc0",
          user: newData.user,
          action: "conversation.create",
          metaData: {
            name: senderName,
            channel_url: "foued/test",
            conversation_type: "1",
            description: "private chat",
            owner_id: newData.accountId,
            members: [newData.user, expert],
            permissions: {},
            members_count: 2,
            status: "0",
            max_length_message: max_length_message,
          },
        });
      } catch (error) {
        console.log(error);
        isSendingMessage = false;
      }
    } else {
      try {
        if (role === "GUEST" || totalBalance > 0) {
          foued.onCreateMessage({
            app: "638dc76312488c6bf67e8fc0",
            user: newData.user,
            action: "message.create",
            metaData: {
              type: "MSG",
              conversation_id: conversationId,
              user: newData.user,
              message: messageInput.value,
              data: "non other data",
              origin: "web",
            },
            to: expert,
            balance: totalBalance?.balance,
          });
        }
        messageInput.value = "";
        isSendingMessage = false;
      } catch (error) {
        isSendingMessage = false;
        throw new Error("Failed to send message");
      }
    }
  }
}

export async function sentMessage(data) {
  showEmptyConversation(false);
  resetMaxLength(max_length_message);
  conversationId = data.conversation;
  let conv = conversationContainer.dataset.conversationId;
  const isNotNewConversation = document.querySelector(
    `#left-conversation-${data.conversation}`
  );
  const timestamp = data.date;
  const date = new Date(timestamp);
  const day = date.toLocaleString("en-us", {
    weekday: "long",
  });
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const time = `${hour}:${minute}`;
  if (!isNotNewConversation) {
    // const newConvDiv = document.createElement("div");
    // const newminiconDiv = document.createElement("div");

    const conversationActive = document.querySelectorAll(
      "div.conversation-click"
    );
    conversationActive.forEach((element) => {
      if (element.classList.contains("bg-slate-150"))
        element.classList.remove("bg-slate-150");
    });

  } else {
    let userLog = "";
    const convMessage = isNotNewConversation.querySelector("#last-message");
    if (data.type === "log"  ) {
      const log = JSON.parse(data.content)
      if(log.action ==='purchase completed' ){ 
        switch(log.action){
          case "fill":
            userLog = `You filled on the form.`;
            break;
          case "focus":
            userLog = `You  focus on the form.`;
            break;
          case "purchase":
            userLog = `You  purchased the <b> ${log.plan_name} </b>plan.`;
            break;
          case "start form":
            userLog = `You  start submit the form.`;
            break;
          case "end form":
            userLog = `You  end submit the form.`;
            break;
          case "start purchase":
            userLog = `You  start purchase a plan.`;
            break;
          case "link click":
            userLog = `You click to link.`;
            break;
          case "purchase completed":
            userLog = `Purchase completed successfully.`
            break;
          case "purchase went wrong":
            userLog = `Purchase went  wrong.`
            break;
        }
        convMessage.textContent = userLog
           
      }
    } else convMessage.textContent = truncateMessage(data.content,20);
  }
  if (data.conversation === conv) {
    const messageId = data.id;
    const messageContainer = document.getElementById(`message-${messageId}`);
    messagesContainer = document.getElementById("big-container-message");
    if (!messageContainer) {
      if (data.type === "log" ) {
   const log = JSON.parse(data.content)
   if(log.action ==='purchase completed' ){

        let userLog = ""
        switch (log.action) {
          case "fill":
            userLog = `You filled on the form.`;
            break;
          case "focus":
            userLog = `You focus on the form.`;
            break;
          case "purchase":
            userLog = `You purchased the <b> ${log.plan_name} </b>plan.`;
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
            userLog = `Purchase completed successfully.`
            break;
          case "purchase went wrong":
            userLog = `Purchase went wrong.`
            break;
        }
        const newDivMsg = document.createElement("div");
        newDivMsg.innerHTML = ` <div
        class="flex justify-center items-center w-100 m-2"
        id="msg-${data._id}"
        >
        <span class="logs-notification">
        ${userLog}
        </span>
        </div>`
        let typingBlock = document.getElementById("typing-block-message");
        messagesContainer.insertBefore(newDivMsg, typingBlock);
      }
      } else {
        let direction = data.direction == "in" ? "justify-end" : "";
        const msgStyle =
          role === "GUEST"
            ? `rounded-2xl break-words  rounded-tl-none bg-msg p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100`
            : `rounded-2xl break-words  rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white`;
        messagesContainer.style.display = "block";
        messagesContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
          <div class="flex flex-col items-end space-y-3.5">
            <div class="flex flex-row">
              ${
                data.direction == "in"
                  ? msgButt(messageId, direction, data.pinned === 1)
                  : ""
              }
              <div class="ml-2 max-w-lg sm:ml-5">
                <div class="${msgStyle}" id="message-content-${messageId}">
                  ${data.content} 
                  <div id="pin-div" class="hidden ${
                    direction == "justify-start" ? "pin-div-sender" : "pin-div"
                  } justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                </div>
              
              </div>
           
              ${
                data.direction == "out"
                  ? msgButt(messageId, direction, data.pinned === 1)
                  : ""
              }
            </div>
            <p id="date_msg" data-direction="${direction}" class="mt-1 ml-10 text-left text-xs text-slate-400 dark:text-navy-300"> <!-- Adjusted ml-10 -->
            ${
              time + `<i class="fas fa-check ps-2" style="font-size:10px;"></i>`
            }       
          </p>
          </div>
      
        </div>
     
        </div>
        `
        );
        if (data.type === "MSG") {
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

        changeTitle(0);
        const msgDiv = document.getElementById(
          `left-conversation-${conversationId}`
        );
        const msgDivMini = document.getElementById(
          `left-mini-conversation-${conversationId}`
        );
        if (msgDiv) {
          const msgText = msgDiv.querySelector("p#last-message");
          msgText.textContent = `Me :  ${truncateMessage(data.content,20)}`;
          leftConversationContainer.insertBefore(
            msgDiv,
            leftConversationContainer.firstChild
          );
        }
        if (msgDivMini) {
          minimizedSideBar.insertBefore(
            msgDivMini,
            minimizedSideBar.firstChild
          );
        }
      }
    }
      conversationContainer.scrollTop = conversationContainer.scrollHeight;
    

    getDeleteButtons();
    getEditButtons();
    getPinButtons();
    reactions();
  }
}
// Function to generate options for the select dropdown
function generateCountryOptions(countries, value) {
  return Object.entries(countries)
    .map(
      ([countryCode, country]) =>
        `<option value="${countryCode}" ${
          countryCode === value ? "selected" : ""
        }>${country.name}</option>`
    )
    .join("");
}

function getUserCountry() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://ipinfo.io/json?token=da800d7bb6c070")
      .then((response) => {
        const data = response.data;
        resolve(data.country);
      })
      .catch(() => {
        resolve("");
      });
  });
}

getUserCountry()
  .then((countryCode) => {
    userCountry = countryCode;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export async function receiveMessage(data) {
  let messageId;
    // if (firstConv && firstConv === data.messageData.conversation) {
    //   $(`.conversation-click[data-conversation-id="${firstConv}"]`).trigger(
    //     "click"
    //   );
    //   firstConv = "";
    // }
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
      if (
        Object.keys(myContent).length !== 0 &&
        data.messageData.type === "plan"
      )
        tableRows = myContent.plans.map((plan) => {
          return `
        <div class="">
        <div class="pricing pricing-palden">
        <div class="pricing-item" id="plan-${messageId}" data-plan-id="${plan.id}" name="${plan.name}">
        <div class="pricing-deco">
          <svg class="pricing-deco-img" enable-background="new 0 0 300 100" height="100px" id="Layer_1" preserveAspectRatio="none" version="1.1" viewBox="0 0 300 100" width="300px" x="0px" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" y="0px">
            <path class="deco-layer deco-layer--1" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
      c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" fill="#FFFFFF" opacity="0.6"></path>
            <path class="deco-layer deco-layer--2" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
      c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" fill="#FFFFFF" opacity="0.6"></path>
            <path class="deco-layer deco-layer--3" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
      H42.401L43.415,98.342z" fill="#FFFFFF" opacity="0.7"></path>
            <path class="deco-layer deco-layer--4" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
      c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" fill="#FFFFFF"></path>
          </svg>
          <div class="pricing-price"><span class="pricing-currency"> ${plan.currency} </span>${plan.tariff}
          </div>
          <h3 class="pricing-title">${plan.name}</h3>
        </div>
        <ul class="pricing-feature-list">
          <li class="pricing-feature">${plan.billing_volume}Messages</li>
        </ul>
        <button class="pricing-action">Buy Plan</button>
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
            if (field.field_name.toLowerCase() === "country") {
              const countryOptions = generateCountryOptions(
                countries,
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
            } else if (field.field_name.toLowerCase() === "phone") {
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
                    newData.goccContactId || newData.goccLeadId ? "gocc" : ""
                  }  card-form" style="position: relative;">
                      <div class="mt-20 w-full max-w-xl p-4 sm:p-5">
                          <div class="mb-4">
                              <h3 class="text-2xl font-semibold">${
                                myContent.friendly_name
                              }</h3>
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
                                      : ""
                                  }
                                  ${
                                    myContent.status !== 1
                                      ? `
                                      <button class="btn1 min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                                          id="submit-form-${messageId}" data-content='${data.messageData.content}'
                                      >
                                          <span class="spinner hidden absolute inset-0 flex justify-center items-center">
                                          </span>
                                          Save
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
            <div class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                <div class="space-y-3.5">
                    <div class="ml-2 sm:ml-5">
                        <div id="message-content-${messageId}">
                            <div class="ml-2 sm:ml-5">
                                <div class="sm:mr-10">
                                    <div class="pt-2">
                                        <p>Formulaire soumis avec succès
                                        </p>
                                        <p>Afin de démarrer votre consultation privée totalement confidentielle, veuillez choisir ci-dessous le type souhaité de mise en relation</p>
                                    </div>
                                    <div class="flex" style="width: 500px;">
                                        <div class="flex h-20 w-full items-center rounded-lg dark:bg-navy-500">
                                            <button id="AvailableAgent" class="btn  space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-warning-focus focus:bg-primary-focus active:bg-warning-focus/90" style="min-height: 50px;width: 225px;">
                                                <span>Mise en relation directe</span>
                                            </button>
                                        </div>
                                        <div class="mx-4 flex items-center space-y-3">
                                            <p>ou</p>
                                        </div>
                                        <div class="flex h-20 w-full items-center rounded-lg dark:bg-navy-500">
                                            <button id="selectAgent" class="btn space-x-2 bg-primary font-medium text-white shadow-lg shadow-primary/50 hover:bg-warning-focus focus:bg-primary-focus active:bg-warning-focus/90" style="min-height: 50px;width: 220px;">
                                                <span>Choisir un Expert</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="pin-div" class="hidden pin-div-sender justify-center items-center me-2"><i class="fas fa-thumbtack"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
        messagesContainer.appendChild(messageDiv);
        const btnAvailableAgent = messageDiv.querySelector("#AvailableAgent");
        btnAvailableAgent.addEventListener("click", function () {
          foued.availableAgent({
            accountId: newData.accountId,
            conversationId: conversationId,
            userId: newData.user,
          });
        });

        const btnSelectAgent = messageDiv.querySelector("#selectAgent");
        btnSelectAgent.addEventListener("click", function () {
          foued.displayAgents(newData.accountId);
        });
      }

      if (data.messageData.type !== "bloc") {
        const messageContainer = document.getElementById(
          `message-${messageId}`
        );
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
                          : data.messageData.content
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

          let typingBlock = document.getElementById("typing-block-message");
          if (typingBlock) {
            const msgDiv = document.createElement("div");
            msgDiv.innerHTML = messageContent;
            if (
              data.messageData.type === "form" &&
              msgDiv.querySelector(`#submit-form-${data.messageData._id}`)
            ) {
              msgDiv.querySelector(
                `#submit-form-${data.messageData._id}`
              )._form_data = data.messageData.content;
            }
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
      conversationContainer.scrollTop = conversationContainer.scrollHeight;

      reactions();
      getReactButton();
      getDeleteButtons();
      getEditButtons();
      getPinButtons();
      playNotificationSound();

      notifyNumber += 1;
      changeTitle(notifyNumber);
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
    foued.linkClick(data.id.replace("linked-msg-", ""));
    addLogs({
      action: "link click",
      element: "7",
      element_id: +data.dataset.linkId,
      messageId: data.id.replace("linked-msg-", ""),
    });
  }

  function sendPlanClickNotification(data, messageId) {
    modal.classList.remove("hidden");
    successButton.setAttribute("data-plan", data.dataset.planId);
    successButton.setAttribute("message-id", messageId);

    const name = data.getAttribute("name");
    successButton.setAttribute("name", name);

    // Update message to status not paid: 2
    addLogs({
      action: "start purchase",
      element: "3",
      element_id: +data.dataset.planId,
      messageId: messageId,
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

function playNotificationSound() {
  const sendSound = document.getElementById("send-sound");
  sendSound.play();
}

// const notifyMe = () => {
//   if (!window.Notification) {
//   } else {
//     // check if permission is already granted
//     if (Notification.permission === "granted") {
//       // show notification here
//       const notify = new Notification("New Message", {
//         body: "You have received a new message!",
//         icon: "images/favicon.png",
//       });
//     } else {
//       // request permission from the user
//       Notification.requestPermission()
//         .then(function (p) {
//           if (p === "granted") {
//             // show notification here
//             const notify = new Notification("New Message", {
//               body: "You have received a new message!",
//               icon: "images/favicon.png",
//             });
//           } else {
//             //blocked notification
//           }
//         })
//         .catch(function (err) {
//           console.error(err);
//         });
//     }
//   }
// };
const notifyMe = () => {
  if (!window.Notification) {
  } else {
    Notification.requestPermission()
      .then(function (p) {
        if (p === "granted") {
          // show notification here
          const notify = new Notification("New Message", {
            body: "You have received a new message!",
            icon: "images/favicon.png",
          });
        } else {
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }
};

function changeTitle(number) {
  if (number === 0) {
    // remove the notification number
    document.title = document.title.replace(/^\(\d+\)\s/, "");
    notifyNumber = 0;
  } else if (number === 1) {
    document.title = `(${number}) ` + document.title;
  } else document.title = document.title.replace(/^\(\d+\)\s/, `(${number}) `);
}

export async function onReadMsg() {
  const msgTimeSpans = messagesContainer.querySelectorAll("p#date_msg");
  msgTimeSpans.forEach((time) => {
    if (time.dataset.direction == "justify-end") {
      const timeContent = time.textContent;
      time.innerHTML = `${timeContent} <i class="fas fa-eye ps-2" style="font-size:10px;"></i>`;
    }
  });
}

async function reactions() {
  if (conversationContainer.dataset.conversationId === conversationId) {
    let reactButtons = conversationContainer.querySelectorAll("#react-message");
    reactButtons.forEach((reactButton) => {
      // Check if event listener is already attached
      if (!reactButton.hasAttribute("data-event-listener")) {
        reactButton.addEventListener("click", function () {
          onReactToMessage(this);
        });
        reactButton.setAttribute("data-event-listener", true); // Set flag indicating the event listener is attached
      }
    });
  }
  getReactButton();
}

function onReactToMessage(button) {
  let reaction = button.parentNode;
  let messageId = reaction.parentNode.parentNode.dataset.messageId;
  let react = button.textContent;

  const onMessageReact = {
    app: "ID",
    user: newData.user,
    action: "message.react",
    metaData: {
      conversation: conversationId,
      message_id: messageId,
      type: "react",
      user_id: newData.user,
      path: react,
    },
  };
  foued.reactMsg(onMessageReact);
  playNotificationSound();
}

async function getReactButton() {
  const toUnReact = document.querySelectorAll(".react-container");

  for (const reactContainer of toUnReact) {
    const allReacts = reactContainer.querySelectorAll("a");
    allReacts.forEach((react) => {
      if (!react.hasAttribute("data-event-listener")) {
        react.onclick = function () {
          onUnReactToMessage(this);
        };
        react.setAttribute("data-event-listener", true);
      }
    });
  }
}

async function onUnReactToMessage(button) {
  let messageId = button.id.replace("react-", "");
  let react = button.textContent;
  // Construct metadata for removing the reaction
  // Call the UnReact function with the metadata object
  foued.unReactMsg({
    app: "ID",
    user: newData.user,
    action: "message.Unreact",
    metaData: {
      conversation: conversationId,
      message_id: messageId,
      type: "unReact",
      user_id: newData.user,
      path: react,
    },
  });
}

export async function reactHide(data) {
  if (data.user_id === newData.user) {
    const reactElement = document.getElementById(`react-${data._id}`);
    if (reactElement) reactElement.remove();
  }
}

export async function reactDisplay(data) {
  const reactData = data.metaData ? data.metaData : data;
  const msgReacted = messagesContainer.querySelector(
    `#message-content-${reactData.message_id}`
  );
  let react = document.getElementById(`react-${reactData._id}`);
  let reactContent = document.getElementById(
    `react-content-${reactData.message_id}`
  );

  if (reactContent) {
    if (react) {
      react.innerHTML = reactData.path;
    } else {
      reactContent.innerHTML += `<a id="react-${reactData._id}" ${
        newData.user !== reactData.user_id ? 'style="pointer-events: none"' : ""
      }> ${reactData.path}</a>`;
    }
  } else {
    msgReacted.innerHTML += `<div id="react-content-${
      reactData.message_id
    }" class="react-container bg-white  dark:bg-navy-700" > <a   id="react-${
      reactData._id
    }" ${
      newData.user !== reactData.user_id ? 'style="pointer-events: none"' : ""
    }> ${reactData.path}</a> </div>`;
    let react = document.getElementById(`react-${reactData._id}`);
    react.innerHTML = reactData.path;
  }
  getReactButton();
}

async function getDeleteButtons() {
  const allDeleteButtons = document.querySelectorAll("#delete-message");
  allDeleteButtons.forEach((deleteButton) => {
    deleteButton.onclick = function () {
      deleteMessage(this);
    };
  });
}

export async function messageDeleted(data) {
  const messageDeleted = document.getElementById(
    `message-content-${data.result._id}`
  );
  messageDeleted.innerHTML = `${data.userData.full_name} unsent a message`;
  messageDeleted.classList.add(
    "bg-transparent",
    "border-2",
    "border-info/10",
    "dark:border-navy-700"
  );

  const leftConversation = document.querySelector(
    `[data-conversation-id="${data.result.conversation_id}"]`
  );
  const pElement = leftConversation.querySelector(".conversationLeftMsg p");
  pElement.textContent = `${data.userData.full_name} unsent a message`;

  const direction =
    messageDeleted.parentNode.querySelector("p").dataset.direction;

  if (direction == "justify-end") {
    messageDeleted.classList.remove("bg-info/10", "dark:bg-accent");
    messageDeleted.innerHTML = `You unsent a message`;
  } else {
    messageDeleted.innerHTML = `${data.userData.full_name} unsent a message`;
    messageDeleted.classList.remove("bg-white", "dark:bg-navy-700");
  }

  const parentDiv = document.getElementById(`message-${data.result._id}`);
  if (parentDiv) {
    const messageOptionsDivs = parentDiv.querySelectorAll("#message-options");
    messageOptionsDivs.forEach((div) => div.remove());
  }
}

async function deleteMessage(button) {
  const dropDown = button.parentNode.parentNode.parentNode;
  dropDown.classList.add("hidden");
  let modal = document.getElementById("myModal");
  let span = modal.querySelector(".close");
  let closeModal = modal.querySelector("#closeModal");
  let deleteButton = modal.querySelector("#deleteButton");
  span.onclick = function () {
    modal.classList.add("hidden");
  };
  closeModal.onclick = function () {
    modal.classList.add("hidden");
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.add("hidden");
    }
  };

  modal.classList.remove("hidden");
  deleteButton.onclick = function () {
    let messageId = button.dataset.messageId;
    const onMessageDelete = {
      app: "638dc76312488c6bf67e8fc0",
      user: newData.user,
      action: "message.delete",
      metaData: {
        conversation: conversationId,
        message: messageId,
      },
    };
    foued.deleteMessage(onMessageDelete);
    modal.classList.add("hidden");
  };
}

async function getEditButtons() {
  const allEditButtons = document.querySelectorAll("#edit-message");
  allEditButtons.forEach((editButton) => {
    editButton.onclick = function () {
      editMessage(this);
    };
  });
}

// click to update message
async function editMessage(button) {
  let messageId = button.dataset.messageId;
  const messageEdited = document.getElementById(`message-content-${messageId}`);
  const reactContent = document.querySelector(`#react-content-${messageId}`);
  if (reactContent)
    document.querySelector(`#react-content-${messageId}`).remove();
  const input = document.createElement("input");
  input.value = messageEdited.textContent.trim();
  input.style.width = "500px";
  input.classList.add(
    "rounded-2xl",
    "rounded-tr-none",
    "p-3",
    "shadow-sm",
    "dark:text-white",
    "relative",
    "bg-info",
    "text-white",
    "dark:bg-accent-focus"
  );
  messageEdited.replaceWith(input);
  input.focus();
  input.id = `edit-input-${messageId}`;
  input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      const newContent = this.value.trim();
      const onMessageUpdate = {
        app: "638dc76312488c6bf67e8fc0",
        user: newData.user,
        action: "message.update",
        metaData: {
          conversation: conversationId,
          message: messageId,
          fields: {
            content: newContent,
          },
        },
      };
      foued.updateMessage(onMessageUpdate);
    }
  });
  // messageEdited.innerHTML=`<input class="bg-transparent border-none "  value="${messageEdited.textContent.trim()} "    >`
}
//updated message
export async function updateMessage(data) {
  const date = new Date(data.updated_at);
  const today = new Date();
  let timeMsg = "";
  if (date.toDateString() === today.toDateString()) {
    const timeString = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    timeMsg = timeString;
  } else {
    const dateString = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeString = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const formattedString = `${dateString} ${timeString}`;
    timeMsg = formattedString;
  }

  if (data.user === newData.user) {
    const input = document.getElementById(`edit-input-${data._id}`);
    const newMessage = document.createElement("div");
    newMessage.id = `message-content-${data?._id}`;

    newMessage.classList.add(
      "rounded-2xl",
      "rounded-tr-none",
      "p-3",
      "shadow-sm",
      "dark:text-white",
      "relative",
      "bg-info",
      "text-white",
      "dark:bg-accent-focus"
    );
    newMessage.textContent = data.message;
    const leftConversation = document.querySelector(
      `[data-conversation-id="${data.conversation_id}"]`
    );
    const pElement = leftConversation.querySelector(".conversationLeftMsg p");
    pElement.textContent = `${data.message} `;
    input.replaceWith(newMessage);
    newMessage
      .closest(`#message-${data._id}`)
      .querySelector("#date_msg").textContent = "(Updated) " + timeMsg;
    newMessage.innerHTML += ` <div id="pin-div" class=" ${
      data.pinned === 0 || data.status === 0 ? "hidden" : "flex"
    } ${"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>`;
    if (data.reacts.length > 0) {
      let messageReactions = data.reacts.map((react) => {
        return `
      <a id="react-${react._id}" ${
          newData.user !== react.user_id ? 'style="pointer-events: none"' : ""
        }> ${react.path}</a>
        `;
      });

      newMessage.innerHTML += `<div class="react-container bg-white  dark:bg-navy-700" id="react-content-${
        data._id
      }" >${messageReactions.join("")} </div>`;
    }
  } else {
    const messageEdited = document.getElementById(
      `message-content-${data?._id}`
    );
    messageEdited.classList.add("bg-navy-100", "dark:bg-navy-500");
    messageEdited.textContent = data.message;
    const timeSpan = messageEdited.parentNode.querySelector("p");
    timeSpan.innerHTML = `(Updated) ${timeMsg}`;
    messageEdited.innerHTML += ` <div id="pin-div" class=" ${
      data.pinned === 0 || data.status === 0 ? "hidden" : "flex"
    } ${"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>`;
    if (data.reacts.length > 0) {
      let messageReactions = data.reacts.map((react) => {
        return `
      <a id="react-${react._id}" ${
          newData.user !== react.user_id ? 'style="pointer-events: none"' : ""
        }> ${react.path}</a>
        `;
      });
      messageEdited.innerHTML += `<div class="react-container bg-white  dark:bg-navy-700" id="react-content-${
        data._id
      }" >${messageReactions.join("")} </div>`;
    }
  }
}

let isFirstKeyPress = true; // flag to track the first key press

/* The above code is listening for the user to start typing and stop typing. */
if (messageInput) {
  messageInput.onkeydown = function () {
    if (isFirstKeyPress) {
      onStartTyping();
      isFirstKeyPress = false;
    }
  };

  // messageInput.onblur = function () {
  //   onStopTyping();
  // };
}

function onStartTyping() {
  const onTypingStart = {
    app: "1",
    user: newData.user,
    action: "typing.start",
    metaData: {
      conversation: conversationId,
    },
  };
  foued.startTyping(onTypingStart);
}

function onStopTyping() {
  const onTypingStop = {
    app: "ID",
    user: newData?.user,
    action: "typing.stop",
    metaData: {
      conversation: conversationId,
    },
  };
  foued.stopTyping(onTypingStop);
  isFirstKeyPress = true; // Reset the flag for the next typing session
}

//start typing function
let typingBlock = document.getElementById("typing-block-message");
export function startTyping(data) {
  typingBlock = document.getElementById("typing-block-message");
  if (data.metaData.conversation === conversationId) {
    if (!typingBlock) {
      typingBlock = document.createElement("div");
      typingBlock.className = "w-100 p-3 d-flex";
      typingBlock.id = "typing-block-message";
      typingBlock.innerHTML = `
                      <div>
                        <div class="flex" class="pe-3">
                          <div
                            id="typing-display"
                            class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 relative "
                          >
                            <div class="d-flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid"
                                style="background: none"
                                width="45px"
                                height="20px"
                              >
                                <circle
                                  cy="62.5"
                                  fill="#C4C4C46b"
                                  r="20"
                                  cx="1.5"
                                >
                                  <animate
                                    attributeName="cy"
                                    calcMode="spline"
                                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                                    repeatCount="indefinite"
                                    values="62.5;37.5;62.5;62.5"
                                    keyTimes="0;0.25;0.5;1"
                                    dur="1s"
                                    begin="-0.5s"
                                  ></animate>
                                </circle>
                                <circle
                                  cy="62.5"
                                  fill="#c4c4c498"
                                  r="20"
                                  cx="52.5"
                                >
                                  <animate
                                    attributeName="cy"
                                    calcMode="spline"
                                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                                    repeatCount="indefinite"
                                    values="62.5;37.5;62.5;62.5"
                                    keyTimes="0;0.25;0.5;1"
                                    dur="1s"
                                    begin="-0.375s"
                                  ></animate>
                                </circle>
                                <circle
                                  cy="62.5"
                                  fill="#c4c4c4"
                                  r="20"
                                  cx="107.5"
                                >
                                  <animate
                                    attributeName="cy"
                                    calcMode="spline"
                                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                                    repeatCount="indefinite"
                                    values="62.5;37.5;62.5;62.5"
                                    keyTimes="0;0.25;0.5;1"
                                    dur="1s"
                                    begin="-0.25s"
                                  ></animate>
                                </circle>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>`;
      messagesContainer.appendChild(typingBlock);
    }
  }
  document
    .querySelector(
      `.conversationItem[data-conversation-id="${data.metaData.conversation}"]`
    )
    ?.classList.add("smallTyping");
}

export function stopTyping(data) {
  if (data.metaData.conversation === conversationId) {
    if (typingBlock) {
      typingBlock.remove();
    }
  }
  const typingBar = document.querySelector(
    `#left-conversation-${data.metaData.conversation}`
  );
  if (typingBar) {
    typingBar.classList.remove("smallTyping");
  }
}

async function getPinButtons() {
  const allPinButtons = document.querySelectorAll("#pin-message");
  allPinButtons.forEach((pinButton) => {
    pinButton.onclick = function () {
      onPinMessage(this);
    };
  });

  const allUnPinButtons = document.querySelectorAll("#unpin-message");
  allUnPinButtons.forEach((unpinButton) => {
    unpinButton.onclick = function () {
      onUnpinMessage(this);
    };
  });
}

export async function pinMessage(data) {
  const messagePinned = document.getElementById(`message-${data._id}`);
  const pinIcon = messagePinned.querySelector("#pin-div");
  const pinnedButton = messagePinned.querySelector("#pin-message");
  pinIcon.classList.add("flex");
  pinIcon.classList.remove("hidden");
  pinnedButton.id = "unpin-message";
  pinnedButton.innerHTML = `Unpin`;
  pinnedButton.onclick = function () {
    onUnpinMessage(this);
  };
}

function onUnpinMessage(button) {
  let pinned = button;
  let messageId = pinned.dataset.messageId;
  const onMessageUnpin = {
    app: "ID",
    user: newData.user,
    action: "message.unpin",
    metaData: {
      conversation: conversationId,
      message_id: messageId,
      user_id: newData.user,
    },
  };
  foued.unPinMsg(onMessageUnpin);
}

export function unpinMessage(data) {
  const messagePinned = document.getElementById(`message-${data._id}`);
  const unpinnedButton = messagePinned.querySelector("#unpin-message");
  const pinIcon = messagePinned.querySelector("#pin-div");
  pinIcon.classList.remove("flex");
  pinIcon.classList.add("hidden");
  if (unpinnedButton) {
    unpinnedButton.innerHTML = `Pin`;
    unpinnedButton.id = "pin-message";
    unpinnedButton.onclick = function () {
      onPinMessage(this);
    };
  }
}

function onPinMessage(button) {
  let pinned = button.parentNode.querySelector("a");
  let messageId = pinned.dataset.messageId;

  const onMessagePin = {
    app: "ID",
    user: newData.user,
    action: "message.pin",
    metaData: {
      conversation: conversationId,
      message_id: messageId,
      user_id: newData.user,
      type: "pinned",
    },
  };
  foued.pinMsg(onMessagePin);
  playNotificationSound();
}

//press enter key to send a message

if (messageInput) {
  messageInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.maxHeight = "250px";
    this.style.height = this.scrollHeight + "px";
  });
  messageInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (messageInput.value !== "") sendMessage();
    }
  });
}

//get All agents in the platform
export async function getAllAgents(response) {
  if (response) {
    const agents = response;

    $(".all-agents").empty();
    agents.forEach((agent) => {
      const html = ` <div  id="agent-${agent.user_id}" class="card w-72 shrink-0 space-y-4 rounded-xl p-4 sm:px-5 rounded-lg bg-info/10 dark:bg-navy-800 mb-2">
      <div class="flex items-center justify-between space-x-2">
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <img class="mask is-squircle" src=images/avatar/avatar-${agent.UserID}.jpg alt="image">
          </div>
          <div>
            <p class="font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
              ${agent.nickname}
            </p>
            <p class="text-xs text-slate-400 dark:text-navy-300">
              <div class="badge bg-primary/10 text-primary dark:bg-accent-light/15 dark:text-accent-light text-tiny px-2 py-1">
                Love
              </div>
            </p>
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="relative cursor-pointer">
            <button  id="left-agent-${agent.user_id}" class="btn h-7 w-7 bg-primary/10 p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </button>
          </div>
          <div class="relative cursor-pointer">
            <button class="btn h-7 w-7 bg-primary/10 p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-between space-x-2">
        <div>
          <p class="text-tiny">Country</p>
          <p class="text-xs font-medium text-slate-700 dark:text-navy-100">
            ${agent.country}
          </p>
        </div>
        <div>
          <p class="text-tiny">Languages</p>
          <p class="text-xs font-medium text-slate-700 dark:text-navy-100">
            ${agent.languages}
          </p>
        </div>
        <div>
          <p class="text-tiny">Expertise</p>
          <p class="text-xs font-medium text-slate-700 dark:text-navy-100">
            ${agent.expertise}
          </p>
        </div>
      </div>
      <p class="text-xs mt-2">
        ${agent.presentation}
      </p>
      
      
    </div>`;

      $(".all-agents").append(html);
      $(`#left-agent-${agent.user_id}`).on("click", async () => {
        clickedAgent(agent.user_id, agent.UserID);
      });
    });
  }
}
async function clickedAgent(agentId, agentContactId) {
  if (newData.status == 1) {
    messagesContainer.innerHTML = "";

    const mongoAgent = await axios.get(`${MY_API_ADDRESS}/users/${agentId}`);

    selectAgent(
      mongoAgent.data.data[0]._id,
      mongoAgent.data.data[0].full_name,
      agentContactId
    );
    if (mongoAgent.data.data[0].is_active) {
      getAgentPresentation(agentId, true);
    } else {
      getAgentPresentation(agentId, false);
    }
  } else {
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
<div class="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5">
<div class="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"></div>
<div class="relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5">
  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>

  <div class="mt-4" style="width:344px" >
    <h2 class="text-2xl text-slate-700 dark:text-navy-100">
      Welcome to Dellastro
    </h2>
    <p class="mt-2">
      Please feel free to fill the form .
    </p>
    <button @click="showModal = false" class="btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90">
      Close
    </button>
  </div>
</div>
</div>
`;
    const closeButton = modalDiv.querySelector("button");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalDiv);
    });
    document.body.appendChild(modalDiv);
  }
}
//when an agent connect create an agent card and display it in the online agents block
export function userConnection(data) {
  if (data.role === "AGENT") {
    allConversation.map((conv) => {
      const conversationCard = document.getElementById(
        `left-conversation-${conv._id}`
      );
      const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_on">${getTranslationValue(
        "left_side.experts_on"
      )}</span>`;
      $("#expert-msg").empty().append(html);
      const statusConv = conversationCard.querySelector("#active-user");
      const isConnected = conv.members.find(
        (user) => user.user_id === data._id
      );
      if (isConnected) {
        statusConv.classList.remove("bg-slate-300");
        statusConv.classList.add("bg-success");
      }
    });
  }
}
//when an agent disconnect remove the card in the online agents block
export function userDisconnection(data) {
  allConversation.map((conv) => {
    const conversationCard = document.getElementById(
      `left-conversation-${conv._id}`
    );
    const isConnected = conv.members.find((user) => user.user_id === data?._id);

    if (isConnected) {
      const agentCard = document.getElementById(`${data?._id}`);
      if (agentCard) agentCard.remove();
      document
        .querySelectorAll(
          `#left-conversation-${conv._id} #active-user, #left-mini-conversation-${conv._id} #active-user`
        )
        .forEach((statusConv) => {
          statusConv.classList.remove("bg-success");
          statusConv.classList.add("bg-slate-300");
        });
    }
  });
  const agentCard = document.getElementById(`${data?._id}`);
  if (agentCard) {
    agentCard.remove();
  }
  if (agentClicked == data._id) {
    conversationHeaderStatus.dataset.translation = "lastSeen";
    conversationHeaderStatus.textContent = traduction.lastSeen;
  }
}

let totalBalance;

export function getTotalBalance(balance, role) {
  const balanceNumber = document.querySelector(".balance-value");
  const balanceSpinner = document.querySelector(".balance-spinner");
  const messageInput = document.querySelector("#message-input");
  const sendButton = document.querySelector("#send-message");
  // Show spinner
  // balanceSpinner.classList.remove("hidden");

  totalBalance = balance;
  setTimeout(() => {
    // Hide spinner
    balanceSpinner.classList.add("hidden");

    if (balance == null && role === "GUEST") {
      balanceNumber.dataset.translation = "header.free";
      balanceNumber.textContent = getTranslationValue("header.free");
    } else {
      balanceNumber.textContent = balance;
      if (balance > 5) {
      } else if (balance < 3 && balance > 1) {
        balanceNumber.style.color = "#F94C10";
      } else {
        balanceNumber.style.color = "#C70039";
      }
      if (balance === 0) {
        // Disable input and button if balance is 0
        messageInput.placeholder =
          "You need to buy a new plan to start chatting again";
        messageInput.disabled = true;
        sendButton.disabled = true;
        balanceNumber.style.color = "#C70039";
      } else {
        messageInput.placeholder = "Write the message";
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
    if (totalBalance > 5) {
      balanceNumber.style.color = "#C8E4B2";
    } else if (totalBalance <= 4 && totalBalance >= 2) {
      balanceNumber.style.color = "#F94C10";
    } else {
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

function updateStatusInCookie() {
  const existingCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("myData="));
  if (existingCookie) {
    const cookieData = JSON.parse(existingCookie.split("=")[1]);
    cookieData.status = 1;
    document.cookie =
      "myData=" +
      JSON.stringify(cookieData) +
      "; expires=Tue, 31 Dec 9999 23:59:59 GMT; path=/";
    newData = cookieData;
  } else {
    console.log("Cookie  not found.");
  }
}

export function submitFormStatus(status, text_capture) {
  const formContact = formElement.parentNode;
  const formContent = formContact.parentNode;
  
  let statusMessage = formContent.querySelector("p");

  if (!statusMessage) {
    statusMessage = document.createElement("p");
    formContent.appendChild(statusMessage);
  }

  const formInputs = formContact.querySelectorAll("input");

  if (status) {
    if (newData.status == "0") {
      updateStatusInCookie();
    }

    formContent.style.opacity = 0.7;

    // Update the status message for success
    statusMessage.textContent = "";
    statusMessage.innerText = text_capture;
    statusMessage.style.color = "#22A699";
    // Open modal for success submit form
    formElement.remove();
    formContent.dataset.submitted = "true";
  } else {
    formElement.disabled = false;
    formInputs.forEach((input) => {
      input.disabled = false;
    });
    formElement.innerHTML = "";
    formElement.innerHTML = "Try again";
    // Update the status message for failure
    statusMessage.innerText = "Saving form data went wrong, Try again";
    statusMessage.style.color = "#F24C3D";
    // Open modal for fail submit form
  }
}

// export function displayMessageBloc(){

//

// }

export function ableInputArea() {
  messageInput.disabled = false;
  sendButton.disabled = false;
}

// async function redirectToAgent(agentId, conversationId) {
//   try {
//     if (agentId != null) {
//       // Find the corresponding agent slide by ID
//       const $agentSlide = $(`.swiper-slide[id="${agentId}"]`);
//       if ($agentSlide.length > 0) {
//         // Trigger a click event on the agent slide
//         // $agentSlide.trigger("click");
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

function showEmoji() {
  const emoji = document.getElementById("emoji");
  if (emoji.classList.contains("hidden")) {
    emoji.classList.remove("hidden");
  } else {
    emoji.classList.add("hidden");
  }
}

async function getPlans() {
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
                    <button id="startChatButton" class='plan-btn pricing-action' data-plan="${plan.id}" name="${plan.name}">Start chatting</button>
                    </div>         
      `
        );
      });

      // Add event listeners to the buy buttons
      const buyButtons = document.querySelectorAll(".plan-btn");
      const modal = document.getElementById("ModalPlan");
      const closeModalButtons = modal.querySelectorAll(
        ".close, #closeModal, #buyPlanBtn"
      );

      buyButtons.forEach((buyButton) => {
        buyButton.addEventListener("click", function () {
          const selectedPlan = this.getAttribute("data-plan");
          const planName = this.getAttribute("name");
          modal.classList.remove("hidden");

          successButton.setAttribute("data-plan", selectedPlan);
          successButton.setAttribute("name", planName);

          const closePlansContainerButton = document.getElementById(
            "closePlansContainerButton"
          );
          if (closePlansContainerButton) {
            closePlansContainerButton.click();
          }
        });
      });

      closeModalButtons.forEach((closeButton) => {
        closeButton.addEventListener("click", function () {
          modal.classList.add("hidden");
        });
      });

      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.classList.add("hidden");
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}

const failButton = document.getElementById("closeModalPlan");

failButton.addEventListener("click", function () {
  try {
    modal.classList.add("hidden");

    // Create the modal container
    const modalContainer = document.createElement("div");
    modalContainer.className =
      "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5";

    // Create the background overlay
    const backgroundOverlay = document.createElement("div");
    backgroundOverlay.className =
      "absolute inset-0 bg-slate-900/60 transition-opacity duration-300";

    // Create the modal content
    const modalContent = document.createElement("div");
    modalContent.className =
      "relative max-w-lg rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-navy-700 sm:px-5";

    // Add your modal content (replace data.balance and newBalance with actual values)
    modalContent.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="inline h-28 w-28 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>

      </svg>
      <div class="mt-4" style="344px">
        <h2 class="text-2xl text-slate-700 dark:text-navy-100">
          Error
        </h2>
        <p class="mt-2">
         something went wront,try again  
        </p>
        <button id="closeModal" class="btn mt-6 bg-error font-medium text-white hover:bg-success-focus focus:bg-error-focus active:bg-error-focus/90">
          Close
        </button>
      </div>
    `;

    // Append the elements to the modal container
    modalContainer.appendChild(backgroundOverlay);
    modalContainer.appendChild(modalContent);

    // Append the modal container to the document body
    document.body.appendChild(modalContainer);

    // Close modal event listener
    const closeModalButton = modalContent.querySelector("#closeModal");
    closeModalButton.addEventListener("click", function () {
      document.body.removeChild(modalContainer);
    });
  } catch (error) {
    console.error("Error displaying modal:", error);
  }
});

const successButton = document.getElementById("buyPlanBtn");
successButton.addEventListener("click", async function () {
  const selectedPlan = this.getAttribute("data-plan");
  const balanceSpinner = document.querySelector(".balance-spinner");

  const planName = this.getAttribute("name");
  const msgId = this.getAttribute("message-id");
  try {
    balanceSpinner.classList.remove("hidden");
    foued.buyPlan({
      contact: newData.contact,
      user: newData.user,
      plan: selectedPlan,
      payment_method: "1",
      provider_id: "1",
      messageId: msgId,
      conversationId: conversationId,
      senderName: senderName,
      planName: planName,
    });
  } catch (error) {
    console.error("Error adding sale:", error);
  }
});

function showSpinner() {
  const spinnerContainer = document.createElement("div");
  spinnerContainer.classList.add("spinner-container");

  const spinner = document.createElement("div");
  spinner.classList.add("spinner-left-conversation");

  spinnerContainer.appendChild(spinner);
  leftConversationContainer.innerHTML = "";
  leftConversationContainer.appendChild(spinnerContainer);
}

const getAgentPresentation = async (id, online) => {
  try {
    const response = await axios.post(
      `${SQL_API}/presentationUser`,
      JSON.stringify({ id: id }),
      {
        headers: {
          key: `${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.status === 200) {
      const agentData = response.data.data[0];
      // Update skills
      const skillsContainer = document.querySelector(".skills");
      skillsContainer.innerHTML = "";
      if (Array.isArray(agentData.skills)) {
        agentData.skills.forEach((skill) => {
          const skillTag = `<span class="tag rounded-full bg-slate-150 text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80">${skill}</span>`;
          skillsContainer.insertAdjacentHTML("beforeend", skillTag);
        });
      } else if (typeof agentData.skills === "string") {
        const skillTag = `<span class="tag rounded-full bg-slate-150 text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80">${agentData.skills}</span>`;
        skillsContainer.insertAdjacentHTML("beforeend", skillTag);
      }
      if (online) {
        document.querySelector(".active-agent-bull").classList.remove("hidden");
      } else {
        document.querySelector(".active-agent-bull").classList.add("hidden");
      }

      // Update presentation
      // Make sure the DOM is ready before manipulating elements
      const presentationElement = document.querySelector(".presentation");

      if (presentationElement) {
        presentationElement.textContent = agentData.presentation;
      } else {
        console.error("Presentation element not found.");
      }

      // Update country
      const countryElement = document.querySelector(".country");
      let img = countryElement.parentElement.querySelector(".flag");

      if (!img) {
        img = document.createElement("img");
        img.classList.add("flag", "rounded-full", "h-4", "w-4");
        img.alt = "flag";
        countryElement.parentElement.insertBefore(img, countryElement);
      }
      if (agentData.country) {
        countryElement.textContent = Countries.getName(
          agentData.country.toUpperCase()
        );

        const flagElement = document.querySelector(".flag");
        flagElement.src = `images/flags/${agentData.country.toLowerCase()}.svg`;
      } else {
        if (img) {
          img.remove();
        }
        countryElement.textContent = "";
      }

      // Update languages
      const languagesElement = document.querySelector(".languages");
      languagesElement.textContent = Languages.getName(
        agentData.languages.toLowerCase()
      );

      // Update contact phone
      const phoneElement = document.querySelector(".phone");
      phoneElement.textContent = agentData.contact_phone;

      // Update contact email
      const emailElement = document.querySelector(".email");
      emailElement.href = `mailto:${agentData.contact_mail}`;
      emailElement.textContent = agentData.contact_mail;

      // Update website
      const websiteElement = document.querySelector(".website");
      websiteElement.href = agentData.website;
      websiteElement.textContent = agentData.website;
      if (!clicked) {
        let toggleButton = document.getElementById("toggleDrawerButton");
        if (toggleButton) {
          toggleButton.click();
          clicked = true;
        }
      }
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    throw new Error("Error retrieving user information: " + error.message);
  }
};

export async function selectAgent(agentId, agentName, UserID) {
  console.log("selectAgent")
  messagesContainer.innerHTML = "";
  expert = agentId;
  agentClicked = agentId;
  senderName = agentName;

  if (userId) {
    foued.checkConversation({
      userId: userId,
      agentId: agentId,
      accountId: newData.accountId,
    });

    conversationHeaderStatus.textContent = connectUsers.find(
      (user) => user._id === agentId
    )
      ? "En ligne"
      : "last seen recently";
    const activeUser = document.getElementById("active-user-header");
    // activeUser.classList.remove("bg-slate-300")
    // activeUser.classList.add("bg-success")
    connectUsers.find((user) => user._id === agentId)
      ? activeUser.classList.add("bg-success")
      : activeUser.classList.remove("bg-success") &&
        activeUser.classList.add("bg-slate-300");
  }
}

export async function onCheckConversation(data, agentContactId, agentName) {
  if (!data.data) {
    conversationId = "";
    messagesContainer.innerHTML = "";
    let activeChat = {
      chatId: conversationId,
      name: agentName,
      avatar_url: `images/avatar/avatar-${agentContactId}` + ".jpg",
    };
    window.dispatchEvent(
      new CustomEvent("change-active-chat", {
        detail: activeChat,
      })
    );
    $conversationContainer.attr("data-conversation-id", null);
    // showEmptyConversation();
  } else {
    conversationId = !data.data.conversation
      ? data.data[0]._id
      : data.data.conversation[0]._id;
    conversationId = data.data.conversation[0]._id;
    window.dispatchEvent(
      new CustomEvent("change-active-chat", {
        detail: {
          chatId: conversationId,
          name: agentName,
          avatar_url: `images/avatar/avatar-${agentContactId}` + ".jpg",
        },
      })
    );
    $conversationContainer.attr("data-conversation-id", conversationId);
    // Load the first page of messages on page load
    $(`.conversation-click[data-conversation-id="${conversationId}"]`).trigger(
      "click"
    );
    let currentPage = 1;
    foued.loadMessages({ page: currentPage, conversationId: conversationId });
  }
}

$(document).ready(function () {
  $("#buyMoreButton").on("click", function () {
    $("#planmodalButton").trigger("click");
  });
});

const locales = ["en-GB", "fr-FR"];

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
    ? `./images/flags/${countryCode.toLowerCase()}.svg`
    : "";
}

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");

async function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  const langName = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(intlLocale.language);

  dropdownContent.innerHTML = "";

  const otherLocales = locales.filter((loc) => loc !== locale);
  otherLocales.forEach((otherLocale) => {
    const otherIntlLocale = new Intl.Locale(otherLocale);
    const otherLangName = new Intl.DisplayNames([otherLocale], {
      type: "language",
    }).of(otherIntlLocale.language);

    const listEl = document.createElement("li");
    listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
      otherIntlLocale.region
    )}" />`;
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });
    dropdownContent.appendChild(listEl);
  });

  dropdownBtn.innerHTML = `<img src="${getFlagSrc(intlLocale.region)}" />`;

  const { data: lang } = await axios.get(
    "./lang/" + locale.substring(0, 2).toLowerCase()
  );
  traduction = lang;
  traduc();
}

const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
  const localeLang = new Intl.Locale(locale).language;
  if (localeLang === browserLang) {
    setSelectedLocale(locale);
  }
}



function phoneList(input) {
  let form = input.closest("form");
  let iti = window.intlTelInput(input, {
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    initialCountry: userCountry.toLowerCase(),
  });
  function validatePhoneNumber() {
    let phoneNumber = input.value;
    let selectedCountryData = iti.getSelectedCountryData();

    if (phoneNumber.startsWith("+")) {
      if (!phoneNumber.startsWith("+" + selectedCountryData.dialCode)) {
        showValidationError(
          input,
          "Please enter a valid phone number for " + selectedCountryData.name
        );
        return;
      }
    } else {
      phoneNumber = "+" + selectedCountryData.dialCode + phoneNumber;
      input.value = phoneNumber;
    }
    let valid = iti.isValidNumber(phoneNumber);
    PhoneNumberValidation = true;
    if (!valid) {
      PhoneNumberValidation = false;

      showValidationError(
        input,
        "Please enter a valid phone number for " + selectedCountryData.name
      );
    } else {
    }
  }

  input.addEventListener("input", validatePhoneNumber);

  input.addEventListener("blur", validatePhoneNumber);

  form.addEventListener(
    "submit",
    function (e) {
      e.preventDefault();
      let valid = iti.isValidNumber(input.value);
      if (!valid) {
        showValidationError(input, "Please enter a valid phone number.");
      }
    },
    false
  );
}

function showEmptyConversation(show = true) {
  conversationContainer.classList.toggle("has-not-messages", show);
}

export function mergeConversation(data) {
  $(
    `.conversation-click[data-conversation-id="${data.newConversation}"]`
  ).trigger("click");

  const leftConversation = document.getElementById("left-conversation");

  const divToDelete = leftConversation.querySelector(
    `[data-conversation-id="${data.deletedConversationId}"]`
  );

  if (divToDelete) {
    divToDelete.remove();
  }

  const miniSidebar = document.getElementById("mini-sidebar");

  const miniDivToDelete = miniSidebar.querySelector(
    `[data-conversation-id="${data.deletedConversationId}"]`
  );

  if (miniDivToDelete) {
    miniDivToDelete.remove();
  }
}

function createAgentCard(agent) {
  const agentCard = document.createElement("div");
  agentCard.className = "card w-72 shrink-0 space-y-2 rounded-xl p-4 sm:px-5";

  agentCard.innerHTML = `
    <div class="flex items-center justify-between space-x-2">
      <div class="flex items-center space-x-3">
        <div class="avatar">
          <img class="mask is-squircle" src="images/avatar/avatar-${agent.UserID}.jpg" alt="image">
        </div>
        <div>
          <p class="font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
            ${agent.firstname} ${agent.lastname}
          </p>
          <div class="badge bg-primary/10 text-primary dark:bg-accent-light/15 dark:text-accent-light text-tiny px-2 py-1">
            ${agent.skills}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between space-x-31">
      <div>
        <p class="text-tiny">Country</p>
        <p class="text-md font-semibold text-slate-700 dark:text-navy-100">${agent.country}</p>
      </div>
      <div>
        <p class="text-tiny">Languages</p>
        <p class="text-md font-semibold text-slate-700 dark:text-navy-100">${agent.languages}</p>
      </div>
      <div>
        <p class="text-tiny">Expertise</p>
        <p class="text-md font-semibold text-slate-700 dark:text-navy-100">${agent.expertise}</p>
      </div>
    </div>
    <div class="grow">
      <p class="text-xs text-left">
      ${truncateMessage(agent.presentation,150)}
       
      </p>
    </div>
    <button id="right-agent-${agent.user_id}" class="btn h-9 w-full justify-between bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
    <span>Chatter</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
    </svg>
  </button>
</div>
  `;

  return agentCard;
}

export function displayAgents(agents) {
  const agentBlock = document.getElementById("agentBlock");
  if (!agentBlock) {
    const containerDiv = document.createElement("div");
    containerDiv.className =
      "mt-4 grid grid-cols-12 gap-4 bg-slate-150 py-3 dark:bg-navy-800 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6";
    containerDiv.id = "agentBlock";
    containerDiv.style.paddingLeft = "10px";

    const agentContainer = document.createElement("div");
    agentContainer.className =
      "is-scrollbar-hidden col-span-12 flex space-x-4 overflow-x-auto px-[var(--margin-x)] transition-all duration-[.25s] lg:col-span-9 lg:pl-0";

    agents.forEach(async (agent) => {
      const agentCard = await createAgentCard(agent);
      agentContainer.appendChild(agentCard);
      conversationContainer.scrollTop = conversationContainer.scrollHeight;

      const button = document.getElementById(`right-agent-${agent.user_id}`);
      if (button) {
        button.addEventListener("click", async () => {
          // clickedAgent(agent.user_id, agent.UserID);
          foued.availableAgent({
            accountId: newData.accountId,
            conversationId: conversationId,
            userId: newData.user,
            agentId: agent.user_id,
          });
        });
      }
    });

    containerDiv.appendChild(agentContainer);
    messagesContainer.appendChild(containerDiv);
  }
}

export function changeHeaderPicture(cnv, agent, status) {
  if (conversationId == cnv) {
    const headerIconDiv = document.querySelector("#conversation-header-icon");
    const activeUserHeader = document.querySelector("#active-user-header");

    const conversationName = document.getElementById("conversation-name");
    conversationName.textContent = agent.full_name;

    if (headerIconDiv) {
      const imgElement = headerIconDiv.querySelector("img");

      if (imgElement) {
        imgElement.src = `images/avatar/avatar-${agent.id}.jpg`;
      }
    }
    if (activeUserHeader) {
      activeUserHeader.classList.remove("bg-slate-300", "bg-success");

      if (status === 0) {
        activeUserHeader?.classList?.add("bg-slate-300");
      } else if (status === 1) {
        activeUserHeader?.classList?.add("bg-success");
      }
    }
  }
}
export function removeConnectUser(id){
  connectUsers = connectUsers.filter((connectedUser) => connectedUser._id !== id);

}
export function displayLeftConversation(data) {
  const isNotNewConversation = document.querySelector(
    `#left-conversation-${data.conversationId}`
  );
  const timestamp = data.date;
  const date = new Date(timestamp);
  const day = date.toLocaleString("en-us", {
    weekday: "long",
  });
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const time = `${hour}:${minute}`;
  if (!isNotNewConversation) {
    const newConvDiv = document.createElement("div");
    const newminiconDiv = document.createElement("div");

    const conversationActive = document.querySelectorAll(
      "div.conversation-click"
    );
    conversationActive.forEach((element) => {
      if (element.classList.contains("bg-slate-150"))
        element.classList.remove("bg-slate-150");
    });
    console.log("data conversation ",data)
    const agentContactId = connectUsers.find((user) => user._id === data.agentId);
    console.log("agentCtazezaea",agentContactId)
    const html = `
    <div class="conversationItem conversation bg-slate-150" data-conversation-id="${
      data.conversationId
    }" data-name=${
      data.senderName
    } data-timestamp=${timeString} id="left-conversation-${
      data.conversationId
    }" data-user-id="${data.agentId}">
      <div class="is-scrollbar-hidden mt-3 flex grow flex-col overflow-y-auto">
        <div
          class="conversation-click flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600"
          data-conversation-id="${data.conversationId}"
          data-name=${data.senderName}>
          <div class="avatar h-10 w-10">
            <img class="rounded-full"  src=images/avatar/avatar-${
              data.contactAgentId
            }.jpg alt="image" />
            <div
            id=${data.agentId}
              class="absolute right-0 h-3 w-3 rounded-full border-2 border-white ${
                agentContactId?.is_active  ? "bg-success" : "bg-slate-300"
              } dark:border-navy-700">
            </div>
          </div>
          <div class="flex flex-1 flex-col">
            <div class="flex items-baseline justify-between space-x-1.5">
              <p  data-conversation-name class="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
              ${data.senderName}
              </p>
              <span class="text-tiny+ text-slate-400 dark:text-navy-300">${timeString}</span>
            </div>
            <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftMsg"> 
              <p class="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300" id="last-message" data-translation="left_side.tab_1.sent_form">
                Agent sent a form 
              </p>
         
            </div>
            <div class="mt-1 flex items-center justify-between space-x-1 conversationLeftTyping "> 
            
            <div>
              <div class="flex" class="pe-3">
                <div
                  id="typing-display"
                  class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 relative "
                >
                  <div class="d-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                      style="background: none"
                      width="45px"
                      height="20px"
                    >
                      <circle
                        cy="62.5"
                        fill="#C4C4C46b"
                        r="20"
                        cx="1.5"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="62.5;37.5;62.5;62.5"
                          keyTimes="0;0.25;0.5;1"
                          dur="1s"
                          begin="-0.5s"
                        ></animate>
                      </circle>
                      <circle
                        cy="62.5"
                        fill="#c4c4c498"
                        r="20"
                        cx="52.5"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="62.5;37.5;62.5;62.5"
                          keyTimes="0;0.25;0.5;1"
                          dur="1s"
                          begin="-0.375s"
                        ></animate>
                      </circle>
                      <circle
                        cy="62.5"
                        fill="#c4c4c4"
                        r="20"
                        cx="107.5"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                          repeatCount="indefinite"
                          values="62.5;37.5;62.5;62.5"
                          keyTimes="0;0.25;0.5;1"
                          dur="1s"
                          begin="-0.25s"
                        ></animate>
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
         
            </div>
          </div>
        </div>
      </div>
    </div>`;
    newConvDiv.innerHTML = html;
    leftConversationContainer.insertBefore(
      newConvDiv,
      leftConversationContainer.firstChild
    );
    const minimizedHtmlSideBar = `
    <div class="mini-conversation-click flex cursor-pointer items-center justify-center py-2.5 hover:bg-slate-150 dark:hover:bg-navy-600 conversation " data-conversation-id="${
      data.conversationId
    }" data-user-id="${data.agentId}" data-name="${
      data.senderName
    }" data-timestamp="${timestamp}" id="left-mini-conversation-${
      data.conversationId
    }">
                    <div class=" avatar h-10 w-10" >
                      <img class="rounded-full" src=images/avatar/avatar-${
                        data.contactAgentId
                      }.jpg alt="image">
                      <div id="active-user" class="absolute right-0 h-3 w-3 rounded-full border-2 border-white ${
                        agentContactId?.is_active  ? "bg-success" : "bg-slate-300"
                      }  dark:border-navy-700"></div>
                    </div>
                  </div>
    `;

    const existingElement = document.querySelector(
      `#left-mini-conversation-${data.conversation}`
    );

    if (!existingElement) {
      newminiconDiv.innerHTML = minimizedHtmlSideBar;
      minimizedSideBar.insertBefore(newminiconDiv, minimizedSideBar.firstChild);
    }
  }
}

$(document).ready(async function () {
  let params = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );
  console.log("params :", params);
  showSpinner();
  getPlans();

  foued.connect(() => {
    if (
      !newData ||
      (params?.source == "gocc" &&
        (params?.contact || params?.lead) &&
        (params?.contact
          ? params?.contact != newData.goccContactId
          : params?.lead != newData.goccLeadId))
    ) {
      foued.socket.emit(
        "createGuest",
        {
          browser: navigator.userAgent,
          platform: navigator.platform,
          accountId: accountId,
          ...(params.contact
            ? { source: "gocc", gocc_contact_id: params.contact }
            : {}),
          ...(params.lead ? { source: "gocc", gocc_lead_id: params.lead } : {}),
        },
        (error) => {}
      );
      params = {};
    } else {
      foued.socket.emit("user-connected", {
        app_id: "638dc76312488c6bf67e8fc0",
        user: newData.contact,
        contact: newData.contact,
        action: "user-connected",
        metaData: {
          app_id: "638dc76312488c6bf67e8fc0",
          api_token: "123456789123456",
          user_id: newData?.user,
        },
        device: {
          ip: "123.213.121",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        },
      });
    }
  });

  foued.getAvailableAgent();
  foued.onDisconnected();
  foued.onConnected();
  //get all the connected user (the agents)
  foued.getUserPresntations(accountId);
  //Select Expert to chat with
  selectExpert();
  //get all the  conversations the user have
  //inform the other users except the sender about the new connection
  foued.userConnection();
  // on message sent , create a new message div and save it to the data base
  foued.onMessageSent();
  // when the message is being delivered
  foued.onMessageDelivered();
  //when the user receive a message
  foued.receiveMessage();
  //join member to conversation
  foued.joinMembers();
  //update conversation status , updated at ...
  foued.onConversationUpdated();
  notifyMe();
  //receive reaction
  foued.onReactMsg();
  //delete a reaction
  foued.onUnReactMsg();
  //receive pin message
  foued.onPinnedMsg();
  foued.onUnPinnedMsg();
  //unPin message
  foued.onUnPinnedMsg();
  //on Read message
  foued.onMessageRead();
  foued.onMessageDeleted();
  foued.onMessageUpdated();
  foued.onTypingStarted();
  foued.onBalanceStat();
  foued.onTypingStopped();
  foued.onGuestCreated();
  foued.planBought();
  foued.joinedDone();
  foued.onConversationStart();
  foued.conversationStatusUpdated();
  foued.linkClicked();
  foued.onConnectedError();
  foued.onGetUserPresntations();
  foued.onCheckConversation();
  document
    .querySelector("emoji-picker")
    .addEventListener("emoji-click", (event) => {
      messageInput.value = messageInput.value + event.detail.unicode;
    });
  foued.savedFormData();
  foued.failGuest();
  foued.mergeConversation();
  // foued.displayRobotAvatar();
  foued.getMessages();
  await getExperts();
  foued.displayAgentsMessage();
  $(document).on("click", ".conversation-click", handleConversationClick);
  $(document).on("click", ".mini-conversation-click", handleConversationClick);
  $(document).on("click", "#emoji-button", showEmoji);
});
