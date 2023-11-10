export let latestConversationId = null;
const minimizedSideBar = document.getElementById("mini-sidebar");
const leftConversationContainer = document.getElementById("left-conversation");
import { accountId,MY_API_ADDRESS } from "../env.js";
import {  connectUsers, conversationId, displayedUsers, newData, updateAllConversations, updateConversationId } from "../main.js";
import { formatDate, formatFullDate, formatWeekdayDate } from "../utils/dateConfig.js";
import { getTime } from "../utils/getTime.js";
import { getTranslationValue } from "../utils/traduction.js";
import { truncateMessage } from "../utils/truncateMessage.js";
import { checkForExpertMessages } from "./getConnectedAgents.js";

export async function getAllConversations() {
    // latestConversationId = null;
    leftConversationContainer.innerHTML = "";
    let userConversation = "";
  
    const conversationsResponse = await axios.get(
      `${MY_API_ADDRESS}/conversation/${accountId}/?user_id=${newData.user}`
    );
  
    if (conversationsResponse.data.data.length > 0) {
      const conversations = conversationsResponse.data.data;
        updateAllConversations(conversations)
        updateConversationId(conversations[0]?._id)
      const conversationPromises = conversations.map(
        async (conversation, index) => {
          conversation.members.forEach((user) => {
            if (newData?.user !== user._id) userConversation = user._id;
    
          });
          const { _id: conversationId, name } = conversation;
  
        //   const timestamp = conversation.updated_at;
        //   const now = new Date();
        // const messageDate = new Date(conversation.updated_at);
          const time= getTime(conversation.updated_at)
      
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
              checkForExpertMessages()
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
                conversation.last_message.user === newData?.user
                  ? "You sent a link"
                  : `${getTranslationValue("left_side.tab_1.sent_link")} `;
              break;
            case "plan":
              msg =
                conversation.last_message.user === newData?.user
                  ? "You sent a plan"
                  : `${getTranslationValue("left_side.tab_1.sent_plan")}`;
              break;
            case "form":
              msg =
                conversation.last_message.user === newData?.user
                  ? "You sent a form"
                  : `${getTranslationValue("left_side.tab_1.sent_form")}`;
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
        }" data-conversation-id="${conversationId}" data-user-id="${userConversation}" data-name="${agentFullNames}" data-timestamp="${conversation.updated_at}" id="left-conversation-${conversationId}">
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
                <span class="text-tiny+ text-slate-400 dark:text-navy-300" data-time="${conversation.updated_at}" >${time}</span>
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
          ? conversation.last_message?.user === newData?.user
            ? "You deleted a message"
            : conversation.member_details.find(
                (member) => member._id === conversation.last_message.user
              ).full_name + " deleted a message"
          : conversation.last_message?.user === newData.user
          ? getTranslationValue("general.me") +
            " " +
            ":" +
            truncateMessage(msg, 20)
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
          }" data-conversation-id="${conversationId}" data-user-id="${userConversation}" data-name="${agentFullNames}" data-timestamp="${conversation.updated_at}" id="left-mini-conversation-${conversationId}">
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