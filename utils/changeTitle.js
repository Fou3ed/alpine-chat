import {  updateNotifyNumber } from "../main.js";

export function changeTitle(number) {
  if (number === 0) {
    // Remove the notification number
    document.title = document.title.replace(/^\(\d+\)\s/, "");
    updateNotifyNumber(0);
  } else {
    // Update the notification number in the title
    document.title = `(${number}) ` + document.title.replace(/^\(\d+\)\s/, "");
  }
}
