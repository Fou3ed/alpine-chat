export function showEmoji() {
    const emoji = document.getElementById("emoji");
    if (emoji.classList.contains("hidden")) {
      emoji.classList.remove("hidden");
    } else {
      emoji.classList.add("hidden");
    }
  }