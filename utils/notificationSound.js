import { logo } from "../env.js";

export function playNotificationSound() {
    const sendSound = document.getElementById("send-sound");
    sendSound.play();
  }
  
  export const notifyMe = () => {
    if (!window.Notification) {
    } else {
      // check if permission is already granted
      if (Notification.permission === "granted") {
        // show notification here
        const notify = new Notification("New Message", {
          body: "You have received a new message!",
          icon: `images/${logo}`,
        });
      } else {
        // request permission from the user
        Notification.requestPermission()
          .then(function (p) {
            if (p === "granted") {
              // show notification here
              const notify = new Notification("New Message", {
                body: "You have received a new message!",
                icon: `images/${logo}`,
              });
            } else {
              //blocked notification
            }
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    }
  };