import { MY_API_ADDRESS, applicationName } from "../env.js";
import { newData } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";
import { getAgentPresentation } from "./getAgentPresentation.js";
import { selectAgent } from "./selectAgent.js";
let messagesContainer = document.getElementById("big-container-message");

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
      ${getTranslationValue("modal.welcome")} ${applicationName}
      </h2>
      <p class="mt-2">
      ${getTranslationValue("modal.fillForm")}  
        </p>
      <button @click="showModal = false" class="btn mt-6 bg-success font-medium text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90">
      ${getTranslationValue("modal.close")}  
  
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