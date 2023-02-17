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
const conversationPanel=document.querySelector('#conversation')
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
      user: "6390b2efdfb49a27e7e3c0b9",
      action: "message.create",
      metaData: {
        type: "MSG",
        conversation_id: "63971dd761f3ef13725a96d2",
        user: "6390b2efdfb49a27e7e3c0b9",
        message: messageInput.value,
        data: "non other data",
        origin: "web",
      },
    };

    foued.createMessage(info);

    messageInput.value = "";
   
  }
})

foued.onMessageReceived()

const conversation=`<div :class="$store.breakpoints.smAndUp &amp;&amp; 'scrollbar-sm'" id="conversation-container" class="grow overflow-y-auto px-[calc(var(--margin-x)-.5rem)] py-5 transition-all duration-[.25s] scrollbar-sm"><div :class="$store.breakpoints.smAndUp &amp;&amp; 'scrollbar-sm'" class="grow overflow-y-auto px-[calc(var(--margin-x)-.5rem)] py-5 transition-all duration-[.25s] scrollbar-sm">
<div x-show="activeChat.chatId === 'chat-1'" x-transition:enter="transition-all duration-500 easy-in-out" x-transition:enter-start="opacity-0 [transform:translate3d(0,1rem,0)]" x-transition:enter-end="opacity-100 [transform:translate3d(0,0,0)]" class="space-y-5" id="big-container-message">
  <div class="mx-4 flex items-center space-x-3">
    <div class="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
    <p>Sunday</p>
    <div class="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
  </div>
</div>
</div></div>`


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
          $('.swiper-wrapper').append('<div id="' + avatarId + '" class="swiper-slide flex w-13 shrink-0 flex-col items-center justify-center"><div class="h-13 w-13  p-0.5"><img class="h-full w-full dark:border-slate-700 mask is-squircle" src="images/avatar/avatar-20.jpg" alt="avatar" /></div><p class="mt-1 w-14 break-words text-center text-xs text-slate-600 line-clamp-1 dark:text-navy-100">' + name + '</p></div>');
        }

        $('.swiper-wrapper').on('click', '.swiper-slide', function() {
          // Get the unique ID of the clicked avatar element
          var avatarId = $(this).attr('id');
          console.log('Clicked on avatar with ID: ' + avatarId);
          // Implement your conversation code here
          $('#conversation-container').html(conversation);
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

