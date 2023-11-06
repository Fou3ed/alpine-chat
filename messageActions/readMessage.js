import { accountId } from "../env.js";
import { socketLib,  newData } from "../main.js";
import { getTheLastMsg } from "../utils/getLastMsg.js";
let messagesContainer = document.getElementById("big-container-message");

export async function markMessageAsSeen(conversationId) {
    if (conversationId) {
      getTheLastMsg(conversationId).then((res) => {
        if (res.user !== newData.user && !res.read) {
          socketLib.markMessageAsRead({
            app: accountId,
            user: newData.user,
            action: "message.read",
            metaData: {
              conversation: conversationId,
              message: res?._id,
            },
          });
          // const unreadCount = document.getElementById(`unread-count-${conversationId}`)
          // if (unreadCount) {
          //   unreadCount.classList.add("hidden")
          //   unreadCount.classList.remove("flex")
          // }
        }
      });
    } else {
    }
  }

  export async function onReadMsg() {
    const msgTimeSpans = messagesContainer.querySelectorAll("p#date_msg");
    msgTimeSpans.forEach((time) => {
      if (time.dataset.direction == "justify-end") {
        const timeContent = time.textContent;
        time.innerHTML = `${timeContent} <i class="fas fa-eye ps-2" style="font-size:10px;"></i>`;
      }
    });
  }