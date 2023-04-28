import Event from "./lib_client/client_2.js";

const foued = new Event();

const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const timeString =
  hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");


// Save user information in local storage
const newData = JSON.parse(localStorage.getItem("newData"));
console.log("LOCAL STORAGE", newData);

// Components

// The message input is where the user types their message 
const messageInput = document.querySelector("#message-input");
// The send message button 
const sendButton = document.querySelector("#send-message");
// The messages container that contains the messages 
const messagesContainer = document.getElementById("big-container-message");
//the left container that contains the conversations 
const leftConversationContainer = document.getElementById('left-conversation');
//the conversation container 
const $conversationContainer = $('#conversation-container');

// get the conversation container
const conversationContainer = document.getElementById('conversation-container');

const msgButt = (messageId, direction, isPinned) => {
  return `
<div   id="message-options" x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex mt-2">
            <button x-ref="popperRef" @click="isShowPopper = !isShowPopper" class="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                </path>
              </svg>
            </button>       
            <div x-ref="popperRoot" class="popper-root" :class="isShowPopper &amp;&amp; 'show'" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-594px, 231px);" data-popper-placement="bottom-end">
              <div  class="popper-box  rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                <ul>
                  ${direction==="justify-start"?"":` <li>
                  <a href="#" data-message-id="${messageId}" id="edit-message" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Edit</a>
                </li>`}
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Forward</a>
                  </li>

                  <li>
                    <a href="#" id="${isPinned?"unpin-message":"pin-message"}" data-message-id="${messageId}" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">${isPinned?"Unpin":"Pin"}</a>
                  </li>

                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Reply</a>
                  </li>
                </ul>
            ${direction==="justify-start"?"":`<div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
            <ul>
              <li>
                <a  data-message-id="${messageId}" id="delete-message" href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Delete</a>
              </li>
            </ul>
          </div>`}
            </div>
            

     

          </div>
          <div   id="message-options" x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex mt-2">
          <button x-ref="popperRef" @click="isShowPopper = !isShowPopper" class="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
          <i
          class="fas fa-smile"
          style="font-size: 18px"
          ></i>
        </button>         
            <div x-ref="popperRoot" class="popper-root" :class="isShowPopper &amp;&amp; 'show'" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-594px, 231px);" data-popper-placement="bottom-end">
              <div  data-message-id="${messageId}" class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                  
                <ul class="flex-row flex">
                  <li>
                    <a id="react-message"   href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 ">👍</a>
                  </li>
                  <li>
                  <a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">😂 </a>
                </li>
                <li>
                <a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">😮</a>
              </li>
              <li>
              <a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">😡</a>
            </li>

            <li>
            <a id="react-message" href="#" class="flex h-8 items-center px-3 pr-3 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">❤️</a>
          </li>            
                </ul>
              </div>
            </div>

     

          </div>
                          
          `;
}

// When a user connects the value changes
newData.user = "63aec1a90412b157c3ef3c1d";

window.connected = async () => {
  // Receive the connect event and send connection event to save the connection data in database and update the user status (is_active_:true)
  foued.connect(newData.user);
};

// Receive the connection event and retrieve the user data and save it into local storage 
foued.onConnected();

// Global variables 
let userId = newData.user;
let conversationId;
let agentName;
let expert;
let notifyNumber = 0
// Disable the send message button if it's empty.
messageInput.addEventListener("input", () => {
  if (messageInput.value.trim() === "") {
    sendButton.disabled = true;
  } else {
    sendButton.disabled = false;
  }
});

/**
 * Display all connected agents 
 */
const displayedUsers = new Set();

export async function getExperts() {
  const response = await axios.get("http://127.0.0.1:3000/users/connected");
  if (response.data.message === "success") {
    const users = response.data.data;
    users.forEach((user) => {
      const {
        _id: agent,
        full_name: name
      } = user;
      const alreadyDisplayed = displayedUsers.has(agent);
      if (!alreadyDisplayed) {
        displayedUsers.add(agent);
        const html = `
          <div id="${agent}" data-name="${name}" class="swiper-slide flex w-13 shrink-0 flex-col items-center justify-center">
            <div class="h-13 w-13 p-0.5">
              <img class="h-full w-full dark:border-slate-700 mask is-squircle" src="images/avatar/avatar-20.jpg" alt="avatar" />
            </div>
            <p class="mt-1 w-14 break-words text-center text-xs text-slate-600 line-clamp-1 dark:text-navy-100">${name}</p>
          </div>`;
        $(".swiper-wrapper").append(html);
      }
    });
  }
}

//select the agent from the list connected agents and open the conversation they share if they already have one , if not open an empty conversation-container
async function selectExpert() {
  $(".swiper-wrapper").on("click", ".swiper-slide", async function () {
    messagesContainer.innerHTML = "";
    // Get the unique ID of the agent clicked
    const agent = $(this).attr("id");
    const name = $(this).data("name");
    agentName = name;
    expert = agent;
    const $conversationContainer = $("#conversation-container");
    // Check if they both have conversation, if yes, just handle click to left conversation
    const response = await axios.get(`http://127.0.0.1:3000/conversation/?user1=${userId}&user2=${agent}`);

    if (response.data.data.length === 0) {
      conversationId = "";
      messagesContainer.innerHTML = "";
      let activeChat = {
        chatId: conversationId,
        name: name,
        avatar_url: "images/avatar/avatar-18.jpg"
      };
      window.dispatchEvent(new CustomEvent('change-active-chat', {
        detail: activeChat
      }));
      $conversationContainer.attr("data-conversation-id", null);
      console.log(" 'there is no conversation between the both of them yet',start a conversation by sending a message")
    } else {
      conversationId = response.data.data[0]._id

      // Update the active chat with the conversation data
      const activeChat = {
        chatId: conversationId,
        name: name,
        avatar_url: 'images/avatar/avatar-18.jpg'
      };
      window.dispatchEvent(new CustomEvent('change-active-chat', {
        detail: activeChat
      }));
      expert = agent;
      $conversationContainer.attr("data-conversation-id", conversationId);
      // Load the first page of messages on page load
      let currentPage = 1;
      loadMessages(currentPage, conversationId, true);
    }
  })

}

export async function getMyConversations() {

  leftConversationContainer.innerHTML = '';
  let latestConversationId = null;

  const conversationsResponse = await axios.get(`http://127.0.0.1:3000/conversation/${newData.user}`);

  const conversations = conversationsResponse.data.data;
  conversationId = conversations[0]._id
  const conversationPromises = conversations.map(async (conversation, index) => {
    const {
      _id: conversationId,
      name,
    } = conversation;
    const timestamp = conversation.updated_at;
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${hour}:${minute}`
    const html = `
      <div class="conversation ${index === 0 ? 'active' : ''}" data-conversation-id="${conversationId}" data-name="${name}" data-timestamp="${timestamp}" id="left-conversation-${conversationId}">
        <div class="is-scrollbar-hidden mt-3 flex grow flex-col overflow-y-auto">
          <div
            class="conversation-click flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600"
            data-conversation-id="${conversationId}"
            data-name="${name}">
            <div class="avatar h-10 w-10">
              <img class="rounded-full" src="images/avatar/avatar-5.jpg" alt="avatar" />
              <div
                class="absolute right-0 h-3 w-3 rounded-full border-2 border-white bg-slate-300 dark:border-navy-700">
              </div>
            </div>
            <div class="flex flex-1 flex-col">
              <div class="flex items-baseline justify-between space-x-1.5">
                <p class="text-xs+ font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
                  ${name}
                </p>
                <span class="text-tiny+ text-slate-400 dark:text-navy-300">${time}</span>
              </div>
              <div class="mt-1 flex items-center justify-between space-x-1">
                <p class="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300" id="last-message">
                  ${conversation.last_message}   
                </p>
                <div
                  class="flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-slate-200 px-1.5 text-tiny+ font-medium leading-none text-slate-800 dark:bg-navy-450 dark:text-white">
                  5
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    // Append the HTML to the container
    leftConversationContainer.innerHTML += html;

  });
  // Update the latest conversation ID
  latestConversationId = conversationId;
  // Trigger a click event on the latest conversation
  if (latestConversationId) {
    $(`[data-conversation-id="${latestConversationId}"]`).trigger('click');
  }
  await Promise.all(conversationPromises);
}

// this function is a handle click , so whenever the client click on a conversation it call the load messages function where messages should be displayed in the messagesContainer
function handleConversationClick() {
  messagesContainer.innerHTML = '';
  document.getElementById('big-container-message').style.display = 'block';
  $conversationContainer.attr('data-conversation-id', conversationId);
  const conversation_id = $(this).data('conversation-id');
  const name = $(this).data('name');
  conversationId = conversation_id;
  expert = name;

  // Set the conversation ID as an attribute of the conversation container element
  const conversationName = document.getElementById('conversation-name');
  conversationName.textContent = name;

  // Load the first page of messages on page load
  let currentPage = 1;
  loadMessages(currentPage, conversationId, true);

  // Update the active chat with the conversation data
  let activeChat = {
    chatId: conversationId,
    name: name,
    avatar_url: 'images/avatar/avatar-19.jpg'
  };
  window.dispatchEvent(new CustomEvent('change-active-chat', {
    detail: activeChat
  }));

  markMessageAsSeen(conversationId)

}

async function getTheLastMsg(conversationId) {
  return axios.get(`http://127.0.0.1:3000/messages/lastMsg/${conversationId}`)
    .then(function (response) {

      const lastMessage = response.data.data;
      return lastMessage;
    });
}

async function markMessageAsSeen(conversationId) {

  if (conversationId) {
    getTheLastMsg(conversationId).then((res) => {
      const onMessageRead = {
        app: "638dc76312488c6bf67e8fc0",
        user: newData.user,
        action: "message.read",
        metaData: {
          conversation: conversationId,
          message: res._id,
        },
      };
      foued.markMessageAsRead(onMessageRead);
    });

  } else {
    console.log("all messages are seen");
  }
}

/**
 * Loads messages of a conversation.
 * @param {number} page - The page number to load.
 * @param {string} conversationId - The ID of the conversation to load messages for.
 */
let isLoading = false;
const spinner = document.getElementById('conversation-spinner')

const limit = 10;
async function loadMessages(page, conversationId) {
  // Show the big container message
  document.getElementById('big-container-message').style.display = 'block';

  // Don't make multiple requests if a request is already in progress
  if (isLoading) {
    return;
  }

  try {
    isLoading = true;

    // Show the spinner
    spinner.classList.remove("hidden");

    // Load messages from the server
    const response = await axios.get(`http://127.0.0.1:3000/messages/${conversationId}?page=${page}&limit=${limit}`);
    if (response.data.message !== "success") {
      throw new Error("Failed to load messages");
    }

    const messages = response.data.data;
    // Do something with the messages
    displayMessages(messages);

    // Check if the scrollbar has reached the top
    const container = document.getElementById('conversation-container');
    if (container.scrollTop === 0) {
      // Call loadMessages() again with the next page
      loadMessages(page + 1, conversationId);
    }

  } catch (error) {
    console.error(error);
  } finally {
    // Hide the spinner
    spinner.classList.add("hidden");
    isLoading = false;
  }
}

// Listen for the scroll event on the container element
const container = document.getElementById('conversation-container');
container.addEventListener('scroll', () => {
  if (container.scrollTop === 0) {
    // Call loadMessages() with the current page
    const conversationId = container.dataset.conversationId;
    const currentPage = Math.ceil(container.scrollHeight / container.clientHeight);
    loadMessages(currentPage, conversationId);
  }
});

function displayMessages(messages) {
  document.getElementById('big-container-message').style.display = 'block';

  if (!messages || !messages.messages) {
    ('No messages to display');
    return;
  }

  // Loop through the messages
  const convMessages = messages.messages.slice()
  for (let i = 0; i < convMessages.length; i++) {

    let message = convMessages[i];
    const messageId = convMessages[i]._id;
    const messageContainer = document.getElementById(`message-${messageId}`);
    const timestamp = message.created_at;
    const date = new Date(timestamp);
    const day = date.toLocaleString('en-us', {
      weekday: 'long'
    });

    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${day}:${hour}:${minute}`;
    if (!messageContainer) {
      let tableRows = ""
      const myContent = message.type === "plan" || message.type === "form" || message.type === "link" ? JSON.parse(message.message) : {}
      if (myContent !== {} && message.type === "plan")
        tableRows = myContent.plans.map(plan => {
          return `
<div class="pricing-table" id="plan-${messageId}" data-plan-id="${plan.id}">
<div class="ptable-item">
<div class="ptable-single">
<div class="ptable-header">
<div class="ptable-title">
<h3>${plan.title}</h3>
</div>
<div class="ptable-price">
<h3><small>$</small>${plan.price.replace("$", "")}</h3>
</div>
</div>
<div class="ptable-body">
<div class="ptable-description">
<ul>
<li>${plan.time}</li>
</ul>
</div>
</div>
<div class="ptable-footer">
<div class="ptable-action">
<button >Buy Now</button>
</div>
</div>
</div>
</div>
</div>

`;
        });
      else if (myContent !== {} && message.type === "form") {
        let inputForms = ""
        inputForms = myContent.contactFormFields.map(field => {
          let type = ""
          switch (+field.field.field_type) {
            case 1:
              type = 'text';
              break;
            case 2:
              type = 'number';
              break;
            case 3:
              type = 'date';
              break;
            case 4:
              type = 'datetime-local';
              break
            case 5:
              type = 'number';
              step = 'any';
              break;
          }
          return `
<input
id="field-${messageId}" data-field-id="${field.id}"
name="${field.field.field_name.replace(" ", "")}"
placeholder="${field.field.field_name}"
type="${type}"

/>
`;
        });
        tableRows = `
<div
class="contact-form-preview"
style="background-color: #fff"
>
<h3>Contact form</h3>
<p>
${myContent.introduction}
</p>
<form >
<div id="text_capture" class="hidden"><p > ${myContent.text_capture}</p></div>
${inputForms.join('')}
<button id="submit-form-${message._id}" data-content='${message.message}'  type="button" >Submit</button>
</form>
</div>
`
      }
      let direction =
        message.user === newData.user ? "justify-end" : "justify-start";
      const msgStyle =
        direction === "justify-start" ?
        `rounded-2xl rounded-tl-none break-words  p-3 text-slate-700 shadow-sm  dark:text-navy-100 relative ${message.status===0?"bg-transparent border-2 border-info/10 dark:border-navy-700":message.status===2? "bg-navy-100 dark:bg-navy-500 " : "bg-white dark:bg-navy-700 "} ` :
        `rounded-2xl rounded-tr-none break-words p-3 shadow-sm dark:text-white relative  ${message.status===0?"bg-transparent border-2 border-info/10 dark:border-navy-700":message.status===2?"bg-info text-white dark:bg-accent-focus" :"bg-info/10 dark:bg-accent text-slate-700 "  }  `;
      messagesContainer.insertAdjacentHTML(
        "afterbegin",
        `
          <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
            <div class="flex flex-col items-end space-y-3.5">
              <div class="flex flex-row">
                ${direction == "justify-end" ? msgButt(messageId,direction,message.pinned===1) : ""}
                <div class="ml-2 max-w-lg sm:ml-5">
                  <div class="${msgStyle}" id="message-content-${messageId}">

                 ${message.status===0?`${direction==="justify-start"? message.user_data.full_name:"You"} unsent a message `: message.type=="link"? `<a class="link-msg"  id="linked-msg-${messageId}" data-link-id="${myContent.userLink.id}" href=" ${myContent.userLink.link?.url}">${myContent.userLink.link?.url}</a>`:message.type === "plan"
                ? tableRows.join('') : message.type === "form" ? tableRows :message.message}
                
                <div id="pin-div" class=" ${message.pinned === 0 || message.status === 0 ? "hidden" : "flex"} ${direction=="justify-start"?"pin-div-sender":"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>

                  </div>
                  <p id="date_msg" data-direction="${direction}" class="mt-1 ml-auto text-left  text-xs text-slate-400 dark:text-navy-300">
                  ${message.status===2?"(updated) "+ time: direction == "justify-start" ? time :message.read?  time+`<i class="fas fa-check ps-2" style="font-size:10px;"></i>`:time}
                  </p>
                </div>
                ${direction == "justify-start" ? msgButt(messageId,direction,message.pinned===1) : ""}

              </div>
              <div class="flex flex-row"></div>
            </div>
          </div>
        `
      );
      conversationContainer.scrollTop = conversationContainer.scrollHeight;

    }



    if (message.reacts[0]) {
      const reactsData = message.reacts[0]
      const msgReacted = messagesContainer.querySelector(`#message-content-${messageId}`)
      msgReacted.innerHTML += `<div class="react-container bg-white  dark:bg-navy-700" > <a id="react-${reactsData._id}" disabled="${newData.user!== reactsData.user_id}"> ${reactsData.path}</a> </div>`
    }




    const submitButton = document.querySelector(`#submit-form-${messageId}`);
    if (submitButton) {
      submitButton.addEventListener("click", function () {
        submitForm(this);
      });
    }

    const allFormInput = document.querySelectorAll(`#field-${messageId}`);

    if (allFormInput.length > 0) {
      allFormInput.forEach(input => {

        input.oninput = () => sendTypingNotification(input);

      });
    }

    let userHasTyped = "";

    function sendTypingNotification(input) {
      console.log(userHasTyped !== input.dataset.fieldId)

      if (userHasTyped !== input.dataset.fieldId) {
        addLogs({
          action: "fill",
          element: "22",
          element_id: +input.dataset.fieldId
        });
        userHasTyped = input.dataset.fieldId;
      }


    }


    let isFirstInputFocused = true;

    function sendFocusNotification(input) {
      console.log('focused');
      addLogs({
        action: "focus",
        element: "22",
        element_id: +input.dataset.fieldId
      });
      isFirstInputFocused = false;
    }

    function sendClickingNotification(data) {
      console.log("clicked", data)

      addLogs({
        action: "link click",
        element: "7",
        element_id: +data.dataset.linkId
      });
    }

    function sendPlanClickNotification(data) {
      console.log("clicked to buy ", data)
      addLogs({
        action: "start purchase",
        element: "3",
        element_id: +data.dataset.planId
      });
    }


    document.querySelectorAll(`#field-${messageId}`).forEach(input => {
      input.addEventListener('focus', () => {
        if (isFirstInputFocused) {
          sendFocusNotification(input);
        }
      });
    });




    const linkedMessage = document.querySelector(`#linked-msg-${messageId}`)
    if (linkedMessage) {
      linkedMessage.addEventListener("click", function () {
        sendClickingNotification(this)
      })
    }


    const planMessage = document.querySelectorAll(`#plan-${messageId}`)
    if (planMessage.length > 0) {
      planMessage.forEach(plan => {
        plan.querySelector("button").onclick = () => sendPlanClickNotification(plan)
      })
    }
  }

  reactions()
  getReactButton()
  getDeleteButtons()
  getEditButtons()
  getPinButtons()

}

//whenever a user click on the message link fire this function 
async function addLogs(log) {
  console.log("added to log")
  const logData = {
    "user_id": "3",
    "action": log.action,
    "element": log.element,
    "element_id": log.element_id,
    "log_date": currentDate,
    "source": "3"
  }
  const
    headers = {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Nzg5NzE2OTUsImV4cCI6MTYyMDA1NzIzMzMzLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0QGdtYWlsLmNvbSJ9.Yy_dUAEfszEpE-aQkBcUBq6rV9OPaUCNaoLxIfJnoNyCqsVWUfbilWNz2sXXImyDBmsNg1n9YIERHUE2iziJpOdhJdbiT6byWmT7MhuyC_QUxbPCko5NQPfP-KB85BjKVSxpr-CNq-Su8LxZ6fysLc7Qe71A86O0TangvsH4UgUb99WE3fMC_EF0PnvXVVxfzdZkV9p1EUTJa989ENP-ytXwdonUXcFUBznlW5PVEWgw-5dyWcND3LXCGaweAO-gMSU2K1Wp2T_rtqTRsXkAhcwF5T_IODee87w4FVARMfbXHvvIizclqyH0TITU8G_MgcoteObO24bECJCV-KpFWg"
    }
  await axios.post(`https://iheb.local.itwise.pro/private-chat-app/public/api/user_logs`, logData, {
    headers
  }).then((res) => {

    //send message to agent 
    const info = {
      app: "638dc76312488c6bf67e8fc0",
      user: newData.user,
      action: "message.create",
      metaData: {
        type: "log",
        conversation_id: conversation_id, // Include the conversation ID
        user: newData.user,
        message: JSON.stringify(res.data),
        data: "non other data",
        origin: "web",
      },
      to: expert,
    };
    foued.onCreateMessage(info)

  });


}

/**
 * open a new blank conversation 
 */

async function firstMessage(user_id, agent) {

  // return the promise returned by createConversation()
  createConversation(user_id, agent)
  await foued.onConversationStart().then(async (res) => {

    const memberInfo = {
      conversation_id: res._id,
      user_id: user_id,
      conversation_name: agentName,
    }
    foued.createMembers(memberInfo); //just gonna add them in the data base 
    foued.createMembers({
      conversation_id: res._id,
      user_id: agent,
      conversation_name: user_id
    });
    conversation_id = res._id;
    return {
      conversation_id: res._id
    };
  })
}

sendButton.addEventListener("click", async () => {
  sendMessage()
})

async function sendMessage(){
  if (messageInput.value.trim() !== "") {
    if (conversationId == '') {
      await firstMessage(newData.user, expert).then(async function (res) {

        const conversationId = await res.conversation_id; // Store the conversation ID
        const info = {
          app: "638dc76312488c6bf67e8fc0",
          user: newData.user,
          action: "message.create",
          from: newData.socket_id,
          metaData: {
            type: "MSG",
            conversation_id: conversationId, // Include the conversation ID
            user: newData.user,
            message: messageInput.value,
            data: "non other data",
            origin: "web",
          },
          to: agentName,
        };
        // Check if room exists or create a new one
        foued.onCreateMessage(info)
        messageInput.value = "";
      })
    } else {
      const info = {
        app: "638dc76312488c6bf67e8fc0",
        user: newData.user,
        action: "message.create",
        metaData: {
          type: "MSG",
          conversation_id: conversationId, // Include the conversation ID
          user: newData.user,
          message: messageInput.value,
          data: "non other data",
          origin: "web",
        },
        to: expert,
      };
      foued.onCreateMessage(info)

      messageInput.value = "";
    }

  


  }
}
export async function sentMessage(data) {
  let conv = document.querySelector('#conversation-container').dataset['conversationId']
  if (data.conversation === conv) {
    const messageId = data.id;
    const messageContainer = document.getElementById(`message-${messageId}`);
    if (!messageContainer) {
      let direction = data.direction == "in" ? 'justify-end' : '';
      const msgStyle = data.direction == "out" ? `rounded-2xl  break-words rounded-tl-none bg-white p-3 text-slate-700 relative shadow-sm dark:bg-navy-700 dark:text-navy-100` : 'rounded-2xl break-words  relative rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white'
      messagesContainer.insertAdjacentHTML("beforeend", `
        <div id="message-${messageId}"  class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
        <div class="flex flex-col items-end space-y-3.5">
        <div class="flex flex-row">
        ${data.direction =="in" ? msgButt(messageId,direction,data.pinned===1) :'' }

          <div class="ml-2 max-w-lg sm:ml-5">
            <div class="${msgStyle}"  id="message-content-${messageId}">
              ${data.content} 
              <div id="pin-div" class="  hidden ${direction=="justify-start"?"pin-div-sender":"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>

            </div>
            <p  id="date_msg" data-direction="${direction}" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
                  ${timeString}      
            </p>
          </div>
        ${data.direction =="out" ? msgButt(messageId,direction,data.pinned===1) :''}
        </div>
        <div class="flex flex-row">
            </div>
          </div>
        </div>
      </div>
        </div>
      `);
      changeTitle(0)
      // set the scroll position to the bottom of the conversation container
      conversationContainer.scrollTop = conversationContainer.scrollHeight;
      const msgDiv = document.getElementById(`left-conversation-${conversationId}`);
    
      if (msgDiv) {
      const msgText = msgDiv.querySelector("p#last-message")
     msgText.textContent =  data.content
      leftConversationContainer.insertBefore(msgDiv,leftConversationContainer.firstChild)
      }
      
    }

    getDeleteButtons()
    getEditButtons()
    getPinButtons()
  }

}

export async function receiveMessage(data) {
  let tableRows = ""
  const myContent = data.messageData.type === "plan" || data.messageData.type === "form" || data.messageData.type === "link" ? JSON.parse(data.messageData.message) : {}
  let conv = document.querySelector('#conversation-container').dataset['conversationId']
  if (data.messageData.conversation === conv) {
    if (myContent !== {} && data.messageData.type === "plan")
      tableRows = myContent.plans.map(plan => {
        return `
<div class="pricing-table" id="plan-${messageId}" data-plan-id="${plan.id}">
<div class="ptable-item">
<div class="ptable-single">
<div class="ptable-header">
<div class="ptable-title">
<h3>${plan.title}</h3>
</div>
<div class="ptable-price">
<h3><small>$</small>${plan.price.replace("$", "")}</h3>
</div>
</div>
<div class="ptable-body">
<div class="ptable-description">
<ul>
<li>${plan.time}</li>
</ul>
</div>
</div>
<div class="ptable-footer">
<div class="ptable-action">
<button>Buy Now</button>
</div>
</div>
</div>
</div>
</div>
`;
      });
    else if (myContent !== {} && data.messageData.type === "form") {
      let inputForms = ""
      inputForms = myContent.contactFormFields.map(field => {
        let type = ""
        switch (+field.field.field_type) {
          case 1:
            type = 'text';
            break;
          case 2:
            type = 'number';
            break;
          case 3:
            type = 'date';
            break;
          case 4:
            type = 'datetime-local';
            break
          case 5:
            type = 'number';
            step = 'any';
            break;
        }
        return `
<input
id="field-${messageId}" data-field-id="${field.id}"
name="${field.field.field_name.replace(" ", "")}"
placeholder="${field.field.field_name}"
type="${type}"
/>
`;
      });
      tableRows = `
<div
class="contact-form-preview"
style="background-color: #fff"
>
<h3>Contact form</h3>
<p>
${myContent.introduction}
</p>
<form >
<div id="text_capture" class="hidden"><p > ${myContent.text_capture}</p></div>
${inputForms.join('')}
<button id="submit-form-${data.messageData._id}" data-content='${data.messageData.content}' type="button" >Submit</button>
</form>
</div>
`
    }

    const messageId = data.messageData.id;
    const messageContainer = document.getElementById(`message-${messageId}`);
    if (!messageContainer) {
      let direction = data.direction == "in" ? 'justify-end' : '';
      const msgStyle = data.direction == "out" ? `rounded-2xl break-words rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100 relative ` : 'rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 relative shadow-sm break-words dark:bg-accent dark:text-white'
     const messageContent=`
     <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
     <div class="flex flex-col items-end space-y-3.5">
     <div class="flex flex-row">
     ${data.direction =="in" ? msgButt(messageId,direction,data.messageData.pinned===1) :'' }
       <div class="ml-2 max-w-lg sm:ml-5">
         <div class="${msgStyle}"  id="message-content-${messageId}">
         
           ${data.messageData.type=="link"? `<a class="link-msg" id="linked-msg-${messageId}" data-link-id="${myContent.userLink.id}"  href=" ${myContent.userLink.link?.url}">${myContent.userLink.link?.url}</a>`:data.messageData.type === "plan"
           ? tableRows.join('') : data.messageData.type === "form" ? tableRows :data.messageData.content}
           <div id="pin-div" class="  hidden ${direction=="justify-start"?"pin-div-sender":"pin-div"} justify-center  items-center me-2 "><i class="fas fa-thumbtack"></i></div>

         </div>
         <p  id="date_msg" data-direction="${direction}" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
               ${timeString}      
         </p>
       </div>
     ${data.direction =="out" ? msgButt(messageId,direction,data.messageData.pinned===1) :''}
     </div>
     <div class="flex flex-row">
         </div>
       </div>
     </div>
   </div>
     </div>
   `
      if(typingBlock){
      const   msgDiv = document.createElement("div");
        msgDiv.innerHTML=messageContent

        typingBlock.replaceWith(msgDiv)

     }else
      messagesContainer.insertAdjacentHTML("beforeend", messageContent

      );

   

    

    if (conversationId === data.messageData.conversation) {
      markMessageAsSeen(conversationId)
    }
    const conversationContainer = document.getElementById('conversation-container');
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
  }
  reactions()
  getReactButton()
  getDeleteButtons()
  getEditButtons()
  getPinButtons()
  playNotificationSound()
  
  notifyNumber += 1
changeTitle(notifyNumber)


}
}
function playNotificationSound() {
  var sendSound = document.getElementById("send-sound");
  sendSound.play();
  
  }
  const notifyMe = () => {
    if (!window.Notification) {
    console.log('Browser does not support notifications.')
    } else {
    // check if permission is already granted
    if (Notification.permission === 'granted') {
    // show notification here
    const notify = new Notification('New Message', {
    body: 'You have received a new message!',
    icon: "images/favicon.png"
    })
    } else {
    // request permission from the user
    Notification.requestPermission()
    .then(function (p) {
    if (p === 'granted') {
    // show notification here
    const notify = new Notification('New Message', {
    body: 'You have received a new message!',
    icon: "images/favicon.png"
    })
    } else {
    console.log('User has blocked notifications.')
    }
    })
    .catch(function (err) {
    console.error(err)
    })
    }
    }
    }

    function changeTitle(number) {
      if (number === 0) {
      // remove the notification number
      document.title = document.title.replace(/^\(\d+\)\s/, '');
      notifyNumber = 0
      }
      else if (number === 1) {
      document.title = `(${number}) ` + document.title;
      }
      else
      document.title = document.title.replace(/^\(\d+\)\s/, `(${number}) `);
      }


export async function onReadMsg() {
  const msgTimeSpans = messagesContainer.querySelectorAll("p#date_msg");
  msgTimeSpans.forEach(time => {

    if (time.dataset.direction == "justify-end") {
      const timeContent = time.textContent
      time.innerHTML = `${timeContent} <i class="fas fa-check ps-2" style="font-size:10px;"></i>`
    }
  })
}

async function reactions() {
  if (conversationContainer.dataset.conversationId === conversationId) {
    let reactButtons = conversationContainer.querySelectorAll("#react-message")
    reactButtons.forEach(reactButton => {
      reactButton.addEventListener("click", function () {
        onReactToMessage(this);
      });
    });

  }
  getReactButton()

}

function onReactToMessage(button) {

  let reaction = button.parentNode;
  let messageId = reaction.parentNode.parentNode.dataset.messageId;
  let react = button.textContent

  const onMessageReact = {
    app: "ID",
    user: newData.user,
    action: "message.react",
    metaData: {
      conversation: conversationId,
      message_id: messageId,
      type: 'react',
      user_id: newData.user,
      path: react,
    },
  };
  foued.reactMsg(onMessageReact)
};

async function getReactButton() {
  const toUnReact = document.querySelectorAll('.react-container');
  for (const reactContainer of toUnReact) {
    const allReacts = reactContainer.querySelectorAll('a');
    allReacts.forEach(react => {
      react.onclick = function () {
        onUnReactToMessage(this)
      }
    });

  }
}

async function onUnReactToMessage(button) {
  let reaction = button.parentNode;
  let messageId = reaction.querySelector("a").id.replace("react-", "")
  let react = button.textContent;
  // Construct metadata for removing the reaction
  const onMessageUnReact = {
    app: "ID",
    user: newData.user,
    action: "message.react",
    metaData: {
      conversation: conversationId,
      message_id: messageId,
      type: 'unReact',
      user_id: newData.user,
      path: react,
    },
  };
  // Call the UnReact function with the metadata object
  foued.unReactMsg(onMessageUnReact);
  // Remove the reaction element from the DOM
  reaction.remove();
}

export async function reactDisplay(data) {
  const msgReacted = messagesContainer.querySelector(`#message-content-${data.message_id}`)
  let react = document.getElementById(`react-${data._id}`)
  let reactContent = document.getElementById(`react-content-${data.message_id}`)
  if (reactContent) {
    if (react)
    {
      react.innerHTML = data.path
    } else {
      reactContent.innerHTML += `<a id="react-${data._id}" disabled="${newData.user!== data.user_id}"> ${data.path}</a>`
    }
  } else {
    msgReacted.innerHTML += `<div id="react-content-${data.message_id}" class="react-container bg-white  dark:bg-navy-700" > <a   id="react-${data._id}" disabled="${newData.user!== data.user_id}"> ${data.path}</a> </div>`
    let react = document.getElementById(`react-${data._id}`)
    react.innerHTML = data.path
  }
  getReactButton()
}

async function getDeleteButtons() {
  const allDeleteButtons = document.querySelectorAll("#delete-message")
  allDeleteButtons.forEach(deleteButton => {
    deleteButton.onclick = function () {
      deleteMessage(this)
    }
  });
}

export async function messageDeleted(data) {
  const messageDeleted = document.getElementById(`message-content-${data.result._id}`)
  messageDeleted.innerHTML = `You unsent a message`
  messageDeleted.classList.add("bg-transparent", "border-2", "border-info/10", "dark:border-navy-700")
  const direction = messageDeleted.parentNode.querySelector("p").dataset.direction
  if (direction == "justify-end") {
    messageDeleted.classList.remove("bg-info/10", "dark:bg-accent")
    messageDeleted.innerHTML = `You unsent a message`
  } else {
    messageDeleted.innerHTML = `${data.userData.full_name} unsent a message`
    messageDeleted.classList.remove("bg-white", "dark:bg-navy-700")
  }
}

async function deleteMessage(button) {
  let messageId = button.dataset.messageId
  const onMessageDelete = {
    app: "638dc76312488c6bf67e8fc0",
    user: newData.user,
    action: "message.delete",
    metaData: {
      conversation: conversationId,
      message: messageId,
    },
  };
  foued.deleteMessage(onMessageDelete)
}

async function getEditButtons() {
  const allEditButtons = document.querySelectorAll("#edit-message")
  allEditButtons.forEach(editButton => {
    editButton.onclick = function () {
      editMessage(this)

    }

  });

}

async function editMessage(button) {
  let messageId = button.dataset.messageId
  const messageEdited = document.getElementById(`message-content-${messageId}`)
  const input = document.createElement("input");
  input.value = messageEdited.textContent.trim();
  input.style.width = "500px"
  input.classList.add("rounded-2xl", "rounded-tr-none", "p-3", "shadow-sm", "dark:text-white", "relative", "bg-info", "text-white", "dark:bg-accent-focus")
  messageEdited.replaceWith(input)
  input.focus();
  input.id = `edit-input-${messageId}`
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

      foued.updateMessage(onMessageUpdate)


    }
  });
  // messageEdited.innerHTML=`<input class="bg-transparent border-none "  value="${messageEdited.textContent.trim()} "    >`
  console.log(messageEdited.textContent.trim())
  //   
}

export async function updateMessage(data) {

  const date = new Date(data.updated_at);
  const today = new Date();
  let timeMsg = ""
  if (date.toDateString() === today.toDateString()) {

    const timeString = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    });
    timeMsg = timeString
  } else {

    const dateString = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeString = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    });
    const formattedString = `${dateString} ${timeString}`;
    timeMsg = formattedString
  }


  if (data.user === newData.user) {
    const input = document.getElementById(`edit-input-${data._id}`)
    const newMessage = document.createElement("div");
    newMessage.id = `message-content-${data?._id}`;
    newMessage.classList.add("rounded-2xl", "rounded-tr-none", "p-3", "shadow-sm", "dark:text-white", "relative", "bg-info", "text-white", "dark:bg-accent-focus");
    newMessage.textContent = data.message;
    input.replaceWith(newMessage)
    newMessage.parentNode.querySelector("p").textContent = "(Updated) " + timeMsg
  } else {
    const messageEdited = document.getElementById(`message-content-${data?._id}`)
    messageEdited.classList.add("bg-navy-100", "dark:bg-navy-500")
    messageEdited.textContent = data.message;
    const timeSpan = messageEdited.parentNode.querySelector("p")
    timeSpan.innerHTML = `(Updated) ${timeMsg}`;
  }
}


let typingTimer; //timer identifier
const doneTypingInterval = 1000;

/* The above code is listening for the user to start typing and stop typing. */
messageInput.onkeyup = function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(onStopTyping, doneTypingInterval);
}
messageInput.oninput = function () {
  onStartTyping()
}

messageInput.onkeydown = function () {
  clearTimeout(typingTimer)
}

function onStartTyping() {
  const onTypingStart = {
    app: "ID",
    user: newData.user,
    action: "typing.start",
    metaData: {
      conversation: conversationId,
    },
  };
  foued.startTyping(onTypingStart)
};

function onStopTyping() {
  const onTypingStop = {
    app: "ID",
    user: newData.user,
    action: "typing.stop",
    metaData: {
      conversation: conversationId,
    },
  };
  foued.stopTyping(onTypingStop)
};


//start typing function 
let typingBlock = document.getElementById("typing-block-message");
export function startTyping(data) {
  typingBlock = document.getElementById("typing-block-message");

  if (data.metaData.conversation === conversationId) {
    // set the scroll position to the bottom of the conversation container
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
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
                      </div>`
      messagesContainer.appendChild(typingBlock)
    }
  }
}




export function stopTyping(data) {
  if (data.metaData.conversation === conversationId) {
    if (typingBlock) {
      typingBlock.remove()
    }
  }
}


async function getPinButtons() {
  const allPinButtons = document.querySelectorAll("#pin-message")
  allPinButtons.forEach(pinButton => {
    pinButton.onclick = function () {
      onPinMessage(this)
    }
  })

  const allUnPinButtons = document.querySelectorAll("#unpin-message")
  allUnPinButtons.forEach(unpinButton => {
    unpinButton.onclick = function () {
      onUnpinMessage(this)
    }
  })
}


export async function pinMessage(data) {
  const messagePinned = document.getElementById(`message-content-${data._id}`)
  const pinIcon = messagePinned.querySelector("#pin-div")
  const pinnedButton = messagePinned.parentNode.parentNode.querySelector('#pin-message')
  pinIcon.classList.add("flex")
  pinIcon.classList.remove("hidden")
  pinnedButton.id = "unpin-message"
  pinnedButton.innerHTML = `Unpin`
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
      user_id: newData.user
    },
  };
  foued.unPinMsg(onMessageUnpin)
};



export function unpinMessage(data) {

  const messagePinned = document.getElementById(`message-content-${data._id}`)
  const unpinnedButton = messagePinned.parentNode.parentNode.querySelector('#unpin-message')
  const pinIcon = messagePinned.querySelector("#pin-div")
  pinIcon.classList.remove("flex")
  pinIcon.classList.add("hidden")
  if (unpinnedButton) {
    unpinnedButton.innerHTML = `Pin`
    unpinnedButton.id = "pin-message"
    unpinnedButton.onclick = function () {
      onPinMessage(this);

    };
  }
}


function onPinMessage(button) {
  let pinned = button.parentNode.querySelector("a")
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
  foued.pinMsg(onMessagePin)
};


export function setInTopConversation(){
  //select all the conversation , the conversation id that receive an action (message , pin ..)
 

}

//press enter key to send a message 
messageInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.maxHeight = "250px";
  this.style.height = this.scrollHeight + "px";
  });
  messageInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
  event.preventDefault();
  if (messageInput.value !== "")
  // Check if enter key is pressed
  sendMessage();
  }
  });
  


$(document).ready(function () {
  //connection 
  foued.connect(newData.user)
  //inform the other users except the sender about the new connection 
  foued.userConnection()
  //disconnection 
  foued.onDisconnected(newData.user)
  //get all the connected user (the agents)
  getExperts();
  //Select Expert to chat with 
  selectExpert()
  //get all the  conversations the user have 
  getMyConversations()

  // on message sent , create a new message div and save it to the data base
  foued.onMessageSent()
  // when the message is being delivered 
  foued.onMessageDelivered()
  //when the user receive a message
  foued.receiveMessage()
  //join member to conversation 
  foued.joinMembers()
  //update conversation status , updated at ... 
  foued.onConversationUpdated()
  notifyMe()
  //receive reaction
  foued.onReactMsg()
  //delete a reaction
  foued.onUnReactMsg()
  //receive pin message
  foued.onPinnedMsg()
  foued.onUnPinnedMsg()
  //unPin message
  foued.onUnPinnedMsg()

  //on Read message 
  foued.onMessageRead()

  foued.onMessageDeleted()

  foued.onMessageUpdated()

  foued.onTypingStarted()
  foued.onTypingStopped()
  //click handler for the conversation 
  $(document).on('click', '.conversation-click', handleConversationClick)
});