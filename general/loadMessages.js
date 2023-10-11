import { conversationId, socketLib } from "../main.js";
import { displayMessages } from "./displayMessages.js";

let isLoading = false;
let isEndOfMessages = false; // Track if all messages have been loaded
const spinner = document.getElementById("conversation-spinner");
const bigSpinner = document.getElementById("page-one-spinner");
const conversationContainer = document.getElementById("conversation-container");

const limit = 10;
export async function loadMessages(response) {
  // Show the big container message
  document.getElementById("big-container-message").style.display = "block";

  if (conversationId) {
    try {
      if (response.message !== "success") {
        throw new Error("Failed to load messages");
      }
      displayMessages(response.data);
      if (response.data.currentPage == 1) {
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
        bigSpinner.classList.remove("hidden");
      } else {
        spinner.classList.remove("hidden");
      }
      if (
        response.data.currentPage === response.data.totalPages ||
        response.data.currentPage > response.data.totalPages
      ) {
        // All messages have been loaded
        isEndOfMessages = true;
      }
      if (conversationContainer.scrollTop === 0 && !isEndOfMessages) {
        socketLib.loadMessages({
          page: response.data.currentPage + 1,
          conversationId: conversationId,
          limit: limit,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Hide the spinner
      spinner.classList.add("hidden");
      isLoading = false;
    }
  }
}

// Listen for the scroll event on the container element
const container = document.getElementById("conversation-container");
if (container) {
  container.addEventListener("scroll", () => {
    const currentPage = Math.ceil(
      container.scrollHeight / container.clientHeight
    );
    if (container.scrollTop === 0 && !isLoading) {
      // Load messages only if all messages have not been loaded
      if (!isEndOfMessages) {
        container.scrollTop = container.scrollHeight * 0.1;

        socketLib.loadMessages({
          page: currentPage,
          conversationId: container.dataset.conversationId,
        });
      }
    }
  });
}
