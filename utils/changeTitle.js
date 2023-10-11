import {  updateNotifyNumber } from "../main.js";

export function changeTitle(number) {
    if (number === 0) {
      // remove the notification number
      document.title = document.title.replace(/^\(\d+\)\s/, "");
      updateNotifyNumber(0)
      // notifyNumber = 0;
    } else if (number === 1) {
      document.title = `(${number}) ` + document.title;
    } else document.title = document.title.replace(/^\(\d+\)\s/, `(${number}) `);
  }
  