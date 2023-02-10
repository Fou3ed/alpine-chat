import event from './lib_client/client_2.js'
const foued = new event()
import * as data from './lib_client/data.js'



//connect to the socket when press the login button and redirect you to the index.html file 
window.connected = async () => {
   foued.connect(data.onConnect);
    return await foued.onConnected().then((newData) => {
      if (newData){
        window.location.href = "./index.html"
      }else {
          alert("error")
      }

  });
};
window.createConversation=async()=>{
  foued.createConversation(data.onConversationCreate)
  return await foued.onConversationStart().then((res)=>{
    if(res){
        console.log(res)
    }else{
      alert('error creating the conversation ')
    }
  })

}



window.sendMsg=async()=>{
  const messagesContainer=document.getElementById("messages-container")
  const messageInput=document.getElementById("message-input")
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
    foued.createMessage(info)
  return await foued.onMessageDelivered().then((res)=>{
    if(res){
      document.querySelector("#message").innerText=res.content
      document.querySelector("#date_msg").innerText=res.date
      messageInput.value = "";
    }else{
      alert('error sending a message ')
    }
  })
}







// const messagesContainer=document.getElementById("messages-container")

// const info={
//   app: "638dc76312488c6bf67e8fc0",
//   user: "6390b2efdfb49a27e7e3c0b9",
//   action: "message.create",
//   metaData: {
//       type: "MSG",
//       conversation_id: "63971dd761f3ef13725a96d2",
//       user:"6390b2efdfb49a27e7e3c0b9",
//       message: messageInput.value,
//       data:"non other data",
//       origin:"web",
//   },
// };

// window.sendMsg=async()=>{

//   foued.createMessage(info)

//       // const messageDiv=document.createElement("div");
//       // messageDiv.innerHTML=message;
//       // messagesContainer.appendChild(messageDiv)
//       // //clear the input field
//       // messageInput.value="";
//   return await foued.onMessageDelivered().then((res)=>{
//     if(res){
//       console.log(res)
//       document.querySelector("#message").innerText=res.content
//       document.querySelector("#date_msg").innerText=res.date
//       const newMessage = document.createElement("div");
//       newMessage.innerHTML = res.content;

//     }else{  
//       alert('error sending a message ')
//     }
//   })