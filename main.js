import event from './lib_client/client_2.js'
const foued = new event()
import * as data from './lib_client/data.js'

const currentDate = new Date();
const fullDate = currentDate.toLocaleString();
const messagesContainer=document.getElementById("big-container-message")
const messageInput=document.getElementById("message-input")


//connect to the socket when press the login button and redirect you to the index.html file 
window.connected = async () => {
  foued.connect(data.onConnect);
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


window.sendMsg=async()=>{
  const info={
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "message.create",
    metaData: {
        type: "MSG",
        conversation_id: "63971dd761f3ef13725a96d2",
        user:"6390b2efdfb49a27e7e3c0b9",
        message: messageInput.value,
        data:"non other data",
        origin:"web",
    },
  };
   await foued.createMessage(info)
    document.querySelector("#message").innerText=info.metaData.message
    document.querySelector("#date_msg").innerText=fullDate
    messageInput.value = "";
    createMsg(info.metaData.message)
  
}
foued.onMessageDelivered((res=>{
}))

window.createMsg=function(msg,direction="in"){
messagesContainer.insertAdjacentHTML("beforeend", `<div class="flex items-start ${direction == 'in' ? 'justify-end' : ''} space-x-2.5 sm:space-x-5">
<div class="flex flex-col items-end space-y-3.5">
  <div class="flex flex-row">
    <div x-data="usePopper({placement:'bottom-end',offset:4})" @click.outside="isShowPopper &amp;&amp; (isShowPopper = false)" class="inline-flex mt-2">
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
    </div>
    <div class="ml-2 max-w-lg sm:ml-5">
      <div class="rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white">
        ${msg}
      </div>
      <p  id="date_msg" class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
              ${fullDate}      
      </p>
    </div>
  </div>
  <div class="flex flex-row">
      </div>
    </div>
  </div>
</div>
</div>`)
}