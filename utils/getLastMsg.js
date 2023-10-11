import { MY_API_ADDRESS } from "../env.js";

export async function getTheLastMsg(conversationId) {
    return axios
      .get(`${MY_API_ADDRESS}/messages/lastMsg/${conversationId}`)
      .then(function (response) {
        if (response) {
          const lastMessage = response.data.data;
          return lastMessage;
        }
      });
  }