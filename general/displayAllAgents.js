import { conversationId, newData, socketLib } from "../main.js";
import { truncateMessage } from "../utils/truncateMessage.js";
const conversationContainer = document.getElementById("conversation-container");
let messagesContainer = document.getElementById("big-container-message");

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
          button.addEventListener(
            "click",
            async () => {
              // clickedAgent(agent.user_id, agent.UserID);
              socketLib.availableAgent({
                accountId: newData.accountId,
                conversationId: conversationId,
                userId: newData.user,
                agentId: agent.user_id,
              });
            },
            { once: true }
          );
        }
      });
  
      containerDiv.appendChild(agentContainer);
      messagesContainer.appendChild(containerDiv);
    }
  }


  export function createAgentCard(agent) {
    const agentCard = document.createElement("div");
    agentCard.className = "card w-72 shrink-0 space-y-2 rounded-xl p-4 sm:px-5";
  
    agentCard.innerHTML = `
      <div class="flex items-center justify-between space-x-2">
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <img class="mask is-squircle" src="images/avatar/avatar-${
              agent.UserID
            }.jpg" alt="image">
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
          <p class="text-md font-semibold text-slate-700 dark:text-navy-100">${
            agent.country
          }</p>
        </div>
        <div>
          <p class="text-tiny">Languages</p>
          <p class="text-md font-semibold text-slate-700 dark:text-navy-100">${
            agent.languages
          }</p>
        </div>
        <div>
          <p class="text-tiny">Expertise</p>
          <p class="text-md font-semibold text-slate-700 dark:text-navy-100">${
            agent.expertise
          }</p>
        </div>
      </div>
      <div class="grow">
        <p class="text-xs text-left">
        ${truncateMessage(agent.presentation, 150)}
         
        </p>
      </div>
      <button id="right-agent-${
        agent.user_id
      }" class="btn h-9 w-full justify-between bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <span>Chatter</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
    `;
  
    return agentCard;
  }
  