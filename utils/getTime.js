import { getTranslationValue } from "./traduction.js";

export  function getTime(timestamp){
    const messageDate = new Date(timestamp);
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const messageDay = messageDate.getDate();
    const messageMonth = messageDate.getMonth();
    const messageYear = messageDate.getFullYear();
    let time;
    if (
      currentDay === messageDay &&
      currentMonth === messageMonth &&
      currentYear === messageYear
    ) {
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes().toString().padStart(2, "0");
      time = `${hour}:${minute}`;
    } else {
      // const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const daysOfWeek = getTranslationValue("days");
      const dayOfWeek = daysOfWeek[messageDate.getDay()];
      const hour = messageDate.getHours();
      const minute = messageDate.getMinutes().toString().padStart(2, "0");
  
      if (currentYear === messageYear) {
        if (currentMonth === messageMonth && currentDay - messageDay <= 7) {
          time = `${dayOfWeek}, ${hour}:${minute}`;
        } else {
          const formattedDate = `${messageDay}/${
            messageMonth + 1
          }/${messageYear}`;
          time = `${formattedDate}, ${hour}:${minute}`;
        }
      } else {
        const formattedDate = `${messageDay}/${
          messageMonth + 1
        }/${messageYear}`;
        time = `${formattedDate}, ${hour}:${minute}`;
      }
      
    }
    return time;
  }