export function formatDate(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute}`;
  }
  
 export function formatWeekdayDate(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekday = daysOfWeek[date.getDay()];
    const time = formatDate(date);
    return `${weekday}, ${time}`;
  }
  
  export function formatFullDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = formatDate(date);
    return `${day}/${month}/${year}, ${time}`;
  }