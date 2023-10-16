import { MY_API_ADDRESS, accountId } from "../env.js";
import {  displayedUsers, updateConnectUsers } from "../main.js";
import { getTranslationValue } from "../utils/traduction.js";
let expertAppended = false;
let offline;
export async function getExperts() {
    const response = await axios.get(
      `${MY_API_ADDRESS}/users/connected/?accountId=${accountId}`
    );
    if (response.data.message === "success") {
    //   connectUsers = response.data.data;
        updateConnectUsers(response.data.data)
      //   console.log("response data",response.data.data.length)
      // if (response.data.data.length > 0 && !expertAppended) {
      //   const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_on"  >${getTranslationValue("left_side.experts_on")}</span>`;
      //   $("#expert-msg").empty().append(html);
      //   expertAppended = true;
      // } else {
      //   offline = true;
      //   const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_off" >${getTranslationValue("left_side.experts_off")} </span>`;
      //   $("#expert-msg").empty().append(html);
      //   expertAppended = true;
      // }

      response.data.data.forEach((user) => {
        displayExpert(user);
      });
    }
  }



  
  export function displayExpert(user) {
    const agentDisco = document.getElementById(`${user._id}`);
    if (!agentDisco) {
      displayedUsers.add(user._id);
      const html = `
      <div id="${user._id}" data-name="${user.full_name}" class="swiper-slide flex w-11 shrink-0 flex-col items-center justify-center">
        <div class="h-11 w-11 rounded-full bg-gradient-to-r from-purple-500 to-orange-600 p-0.5">
          <img class="h-full w-full rounded-full border-2 border-white object-cover dark:border-slate-700"
          src=images/avatar/avatar-${user.id}.jpg  alt="avatar" />
        </div>
        <p class="mt-1 w-14  text-center text-xs text-slate-600 dark:text-navy-100">
          ${user.full_name}
        </p>
      </div>
      `;
      $(".swiper-wrapper").append(html);

    }
  }
  
  export async function removeExpert(userId) {
    const agentDisco = document.getElementById(`${userId}`);
    if (agentDisco) {
      agentDisco.remove();
    }
  }



  export function checkForExpertMessages() {
    const swiper = document.querySelector(".swiper");
    const swiperWrapper = swiper.querySelector(".swiper-wrapper");
    const divsInsideSwiper = Array.from(
      swiperWrapper.querySelectorAll("div.swiper-slide")
    );
    console.log("divsINSIDE swiper",divsInsideSwiper)
    if (divsInsideSwiper.length > 0) {
      const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_on">${getTranslationValue("left_side.experts_on")}</span>`;
      $("#expert-msg").empty().append(html);
      expertAppended = true;

    } else {
    offline = true;


      const html = `<span class="text-xs+ font-medium uppercase" data-translation="left_side.experts_off" >${getTranslationValue("left_side.experts_off")} </span>`;
      $("#expert-msg").empty().append(html);
      expertAppended = true;

    }
  }