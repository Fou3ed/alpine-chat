import event from './lib_client/client_2.js'
const foued = new event()
import * as data from './lib_client/data.js'
const currentDate = new Date();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
const messagesContainer = document.getElementById("big-container-message")
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-message');
const conversationContainer = document.getElementById('conversation-container');
const butt=`<div x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex mt-2">
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
          </div>`



//disable the send message button if it's empty .
messageInput.addEventListener('input', () => {
  if (messageInput.value.trim() === '') {
    sendButton.disabled = true;
  } else {
    sendButton.disabled = false;
  }
});


window.connected = async () => {
  foued.connect(data.onConnect)
  return await foued.onConnected().then((newData) => {
    if (newData) {
      window.location.href = "./index.html"
    } else {
      alert("error")
    }
  });
};


window.createConversation = async () => {
  foued.createConversation(data.onConversationCreate)
  return await foued.onConversationStart().then((res) => {
    if (res) {
      console.log(res)
    } else {
      alert('error creating the conversation ')
    }
  })
}

sendButton.addEventListener('click', () => {
  if (messageInput.value.trim() !== '') {
    const info = {
      app: "638dc76312488c6bf67e8fc0",
      user: "6390b4d54a1ba0044836d613",
      action: "message.create",
      metaData: {
        type: "MSG",
        conversation_id: "63971dd761f3ef13725a96d2",
        user: "6390b4d54a1ba0044836d613",
        message: messageInput.value,
        data: "non other data",
        origin: "web",
      },
    };

    foued.createMessage(info)
    messageInput.value = "";

  }
})

foued.onMessageReceived()


/**
 * Get the experts 
 */
$(document).ready(function() {
  axios.get('http://127.0.0.1:3000/users')  
    .then(function(response) {
      if (response.data.message === 'success') {
        var users = response.data.data;

        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          var name = user.full_name;

          // Generate a unique ID for each avatar element
          var avatarId =users[i]._id;
          $('.swiper-wrapper').append('<div id="' + avatarId + '" data-name="' + name + '" class="swiper-slide flex w-13 shrink-0 flex-col items-center justify-center"><div class="h-13 w-13  p-0.5"><img class="h-full w-full dark:border-slate-700 mask is-squircle" src="images/avatar/avatar-20.jpg" alt="avatar" /></div><p class="mt-1 w-14 break-words text-center text-xs text-slate-600 line-clamp-1 dark:text-navy-100">' + name + '</p></div>');
        }

        $('.swiper-wrapper').on('click', '.swiper-slide', function() {
          // Get the unique ID of the clicked avatar element
          var avatarId = $(this).attr('id');
          var username = $(this).data('name');
          console.log('Clicked on avatar with ID: ' + avatarId);
          // Implement the  conversation code here

          $('#big-container-message').html(`
          <div class="mx-4 flex items-center space-x-3">
            <div class="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
            <p>${username}</p>
            <div class="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
          </div>`);

       




let currentPage = 1;
const limit = 10;

// Add an event listener to the conversation container for scrolling up
conversationContainer.addEventListener('scroll', function() {
  const scrollPosition = conversationContainer.scrollTop;
  if (scrollPosition === 0) {
    currentPage++;
    loadMessages(currentPage, true);
  }
});

function loadMessages(page, scrollToBottom = false) {
  axios.get(`http://127.0.0.1:3000/messages/63971dd761f3ef13725a96d2?page=${page}&limit=${limit}`)
    .then(function(response){

      if(response.data.message==='success'){
        let messages = response.data.data;
        displayMessages(messages, scrollToBottom);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displayMessages(messages, scrollToBottom = false) {
  // Reverse the messages array to display them in the opposite order
  const reversedMessages = messages.messages.reverse();
  
  for (var i = 0; i < reversedMessages.length; i++) {
    var message = reversedMessages[i]; 
    const messageId = reversedMessages[i]._id; 
    const messageContainer = document.getElementById(`message-${messageId}`);
    if (!messageContainer) {
      let direction = message.user === "6390b4d54a1ba0044836d613" ? 'justify-end' : 'justify-start';
      const msgStyle = direction === 'justify-start' ? 'rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100' : 'rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white';
      messagesContainer.insertAdjacentHTML("beforeend", `
        <div id="message-${messageId}" class="flex items-start ${direction} space-x-2.5 sm:space-x-5">
        <div class="flex flex-col items-end space-y-3.5">
        <div class="flex flex-row">
        ${direction =="justify-start" ? butt :'' }
          <div class="ml-2 max-w-lg sm:ml-5">
            <div class="${msgStyle}">
              ${message.message}
            </div>
            <p  id="date_msg" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
                  ${timeString}      
            </p>
          </div>
        ${direction =="justify-end" ? butt :''}
        </div>
        <div class="flex flex-row">
            </div>
          </div>
        </div>
      </div>
        </div>
      `);
    }
  } 
  if (scrollToBottom) {
    conversationContainer.scrollTop = conversationContainer.scrollHeight;

  }
}

// Load the first page of messages on page load
loadMessages(currentPage, true);
}
        )} 
})
})


