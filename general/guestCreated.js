import { max_length_message } from "../env.js";
import { timeString, updateConversationId, updateExpert, updateNewData } from "../main.js";
import { inputLEngth } from "../utils/resetCnvMaxLength.js";
const leftConversationContainer = document.getElementById("left-conversation");

export async function guestCreated(data) {
  console.log("guestCreated",data)
    const newUser = {
      user: data.user,
      contact: data.contact,
      accountId: data.accountId,
      status: 0,
      ...(data?.contactId && { sourceId: data.contactId,type:"contact" ,source:"gocc" }),
      ...(data.leadId && { sourceId: data.leadId ,type:"lead",source:"gocc" }),
    };

    updateNewData(newUser)
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
    updateExpert(data.availableAgent)
    updateConversationId(data.conversationId)
   
  }