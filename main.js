import event from "./lib_client/client_2.js";
const foued = new event();
const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const timeString =
  hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
  const conversationContainer = document.getElementById('conversation-container');
  const messagesContainer = document.getElementById("big-container-message")

const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-message");
const newData = JSON.parse(localStorage.getItem("newData"));
console.log("LOCAL STORAGE",newData);


//message configuration : delete,edit,reply,forward ..
const msgButt = `<div x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex mt-2">
            <button x-ref="popperRef" @click="isShowPopper = !isShowPopper" class="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                </path>
              </svg>
            </button>       
            <div x-ref="popperRoot" class="popper-root" :class="isShowPopper &amp;&amp; 'show'" style="position: fixed; inset: 0px 0px auto auto; margin: 0px; transform: translate(-594px, 231px);" data-popper-placement="bottom-end">
              <div class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                <ul>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Edit</a>
                  </li>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Forward</a>
                  </li>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Copy</a>
                  </li>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Reply</a>
                  </li>
                </ul>
                <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
                <ul>
                  <li>
                    <a href="#" class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>`;

//global variables
let user_id = document.querySelector("#user-id");
let conversation_id;
let receiverUserName;
let to;
//log in
window.connected = async () => {
  const connectionInfo = {
    app_id: "638dc76312488c6bf67e8fc0",
    user: user_id.value,
    action: "connect",
    metaData: {
      app_id: "638dc76312488c6bf67e8fc0",
      user_id: user_id.value,
      api_token: "123456789123456",
    },
    device: {
      ip: "192.168.1.1",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
    },
  };
  foued.connect(connectionInfo);
};
foued.onConnected();      

//disable the send message button if it's empty .
messageInput.addEventListener("input", () => {
  if (messageInput.value.trim() === "") {
    sendButton.disabled = true;
  } else {
    sendButton.disabled = false;
  }
});


/**after login  display the main page with the  latest conversation   */



/**
 * Get the experts and when click to an avatar it direct the user to the left conversation  
 */
function getExperts() {
  axios.get("http://127.0.0.1:3000/users").then(function (response) {
    if (response.data.message === "success") {
      let users = response.data.data;
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let name = user.full_name;

        // Generate a unique ID for each avatar element
        let avatarId = users[i]._id;
        $(".swiper-wrapper").append(
          '<div id="' +
          avatarId +
          '" data-name="' +
          name +
          '" class="swiper-slide flex w-13 shrink-0 flex-col items-center justify-center"><div class="h-13 w-13  p-0.5"><img class="h-full w-full dark:border-slate-700 mask is-squircle" src="images/avatar/avatar-20.jpg" alt="avatar" /></div><p class="mt-1 w-14 break-words text-center text-xs text-slate-600 line-clamp-1 dark:text-navy-100">' +
          name +
          "</p></div>"
        );
      }
    }
  });
}
function selectExpert(){
  document.getElementById('big-container-message').style.display = 'block'

  $(".swiper-wrapper").on("click", ".swiper-slide", function () {
    // Get the unique ID of the clicked avatar element
    let avatarId = $(this).attr("id");
    let name = $(this).data("name");
    receiverUserName=name
    to=avatarId
    checkConversation(newData.user, avatarId)
    
    console.log("Clicked on avatar with ID: " + avatarId + '  ' + name);
    //route to left conversation then e left conversation display the big container message 
      
    // Update the active chat with the conversation data
    let activeChat = { chatId: avatarId, name: name, avatar_url: 'images/avatar/avatar-19.jpg' };
    $(document).trigger('change-active-chat', { detail: activeChat });
  });
}


// check  the conversation between the first(connected user ) and the second user 
// get the conversation , if there is no conversation between them , create for both the users a conversation member then a conversation 
function checkConversation(user_id, to) {
  axios.get(`http://192.168.1.19:3000/conv/?user1=${user_id}&user2=${to}`)
    .then(function (response) {
      if (response.data.data.length == 0) {
        createConversation(user_id,to).then(function (res) {
          const memberInfo = {
            conversation_id: res._id,
            user_id: user_id,
            conversation_name: receiverUserName,
          };
          foued.addMembers(memberInfo);
          foued.addMembers({
            conversation_id: res._id,
            user_id: avatarId,
            conversation_name: user_id
          })
          conversation_id = res._id
        });
      } else {
        conversation_id = response.data.data[0]._id
        let currentPage = 1;
        // Load the first page of messages on page load
        loadMessages(currentPage, conversation_id, true);
        console.log("conversation : " ,conversation_id)
      }
     
    });
}



// create conversation function 
function createConversation(user_id,to) {
  const   conversationInfo={
      app: "638dc76312488c6bf67e8fc0",
      user: user_id,
      action: "conversation.create",
      metaData: {
          name: receiverUserName,
          channel_url: "foued/test",
          conversation_type: "private",
          description: "private chat",
          operators: [1],
          members: [user_id,to],
          permissions: {"key":"value"},
          members_count:2,
          max_length_message: "256",
      },
    }
  foued.createConversation(conversationInfo);
  return foued.onConversationStart()
}
foued.onConversationMemberJoined();

function displayMessages(messages, currentScrollPos, scrollToBottom = false) {
  if (!messages || !messages.messages) {
    console.log('No messages to display');
    return;
  }
  // Reverse the messages array to display them in the opposite order
  const reversedMessages = messages.messages.reverse();
  for (let i = 0; i < reversedMessages.length; i++) {
    let message = reversedMessages[i];
    const messageId = reversedMessages[i]._id;
    const messageContainer = document.getElementById(`message-${messageId}`);
    if (!messageContainer) {
      console.log(message.message)
      let direction =
        message.user === user_id ?
        "justify-end" :
        "justify-start";
      const msgStyle =
        direction === "justify-start" ?
        "rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100" :
        "rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white";
      messagesContainer.insertAdjacentHTML(
        "afterbegin",
        `
                <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
                <div class="flex flex-col items-end space-y-3.5">
                <div class="flex flex-row">
                ${direction == "justify-end" ? msgButt : ""}
                  <div class="ml-2 max-w-lg sm:ml-5">
                    <div class="${msgStyle}">
                      ${message.message} 
                    </div>
                    <p  id="date_msg" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
                          ${timeString}      
                    </p>
                  </div>
                ${direction == "justify-start" ? msgButt : ""}
                </div>
                <div class="flex flex-row">
                    </div>
                  </div>
                </div>
              </div>
                </div>
              `
      );
    }
  }
  // Set the scroll position to the previous position or bottom of the container
  conversationContainer.scrollTop = scrollToBottom ? conversationContainer.scrollHeight : currentScrollPos;
}



/**
 * get all the conversation the user connected have 
 */

function getMyConversations(newData) {
  const leftConversationContainer = document.getElementById('left-conversation');
  let latestConversationId = null;
  axios.get(`http://127.0.0.1:3000/conversation/${newData.user}`)
    .then(function (response) {
      const conversations = response.data.data;
      console.log(conversations);
      conversations.forEach((conversation) => {
        const {
          _id: conversationId,
          name,
          description,
        } = conversation;
        const html = `
          <div class="conversation" data-conversation-id="${conversationId}" data-name="${name}">
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
                    <span class="text-tiny+ text-slate-400 dark:text-navy-300">11:03</span>
                  </div>
                  <div class="mt-1 flex items-center justify-between space-x-1">
                    <p class="text-xs+ text-slate-400 line-clamp-1 dark:text-navy-300">
                      ${description}
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
        leftConversationContainer.innerHTML += html;

        // Update the latest conversation ID
        latestConversationId = conversationId;
      });

      // Trigger a click event on the latest conversation
      if (latestConversationId) {
        $(`[data-conversation-id="${latestConversationId}"]`).trigger('click');
      }
    });
}


function handleConversationClick() {
  document.getElementById('big-container-message').style.display = 'block'

  const conversationId = $(this).data('conversation-id');
  const name = $(this).data('name');
  conversation_id=conversationId
  const conversationName=document.getElementById('conversation-name')
  conversationName.textContent=name

  // Load the first page of messages on page load
  let currentPage=1
   loadMessages(currentPage, conversationId, true);
  console.log("Clicked on conversation with ID: " + conversationId + " " + name);
          
  // Update the active chat with the conversation data

  let activeChat = { chatId: conversationId, name: name, avatar_url: 'images/avatar/avatar-19.jpg' };
  // window.dispatchEvent(new CustomEvent('change-active-chat', { detail: activeChat }));
  $(document).trigger('change-active-chat', { detail: activeChat });
}
//get the messages  between the user connected and the avatar(2nd user)
let prevScrollHeight = 0;

function loadMessages(page, conversation, scrollToBottom = false) {
  const limit = 10;
  const spinner = document.createElement("span");
  spinner.classList.add("loader");
  conversationContainer.appendChild(spinner); // add the spinner to the conversation container

  // Store the previous scroll height
  prevScrollHeight = conversationContainer.scrollHeight;
  // Remove all child elements from the messages container
  messagesContainer.innerHTML = '';

  axios
    .get(
      `http://127.0.0.1:3000/messages/${conversation}?page=${page}&limit=${limit}`
    )
    .then(function (response) {
      
      if (response.data.message === "success") {
        let messages = response.data.data;
        console.log(messages)
        const currentScrollPos = conversationContainer.scrollTop;

        displayMessages(messages, currentScrollPos, scrollToBottom);

        // Set the scroll position to the previous position
        conversationContainer.scrollTop += conversationContainer.scrollHeight - prevScrollHeight;

        // Set currentPage to the current page number minus 1
        let currentPage = page - 1;

        // Add an event listener to the conversation container for scrolling up
        conversationContainer.addEventListener("scroll", function () {
          const scrollPosition = conversationContainer.scrollTop;
          if (scrollPosition === 0) {
            currentPage++;
            loadMessages(currentPage, conversation, true);
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      conversationContainer.removeChild(spinner); // remove the spinner once the GET request is completed
    });
}




// send message by pressing the send button
sendButton.addEventListener("click", () => {
  console.log("me:",newData.user,"he:",to,"conversation",conversation_id)
  if (messageInput.value.trim() !== "") {
    const info = {
      app: "638dc76312488c6bf67e8fc0",
      user: newData.user,
      action: "message.create",
      metaData: {
        type: "MSG",
        conversation_id: conversation_id,
        user: newData.user,
        message: messageInput.value,
        data: "non other data",
        origin: "web",
      },
      to:receiverUserName, // the id of the receiver(to change later ) 
    };

    foued.createMessage(info);
    messageInput.value = "";
  }
});
foued.onMessageDelivered()
foued.onMessageReceived();


$(document).ready(function () {
  //Get the list of users (experts)
  getExperts();
  //select expert to start communicating 
  selectExpert();
  getMyConversations(newData)
// Add a click event listener to each conversation element
  $(document).on('click', '.conversation-click', handleConversationClick);


});
















