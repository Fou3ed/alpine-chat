import { accountId } from "../env.js";
import { conversationId, expert, newData, socketLib } from "../main.js";

export async function addLogs(log, aux = {}) {
    const logData = {
      user_id: newData.contact.toString(),
      action: log.action,
      element: log.element,
      element_id: log.element_id,
      log_date: new Date(),
      source: "3",
    };
    if (log.messageId) {
      logData.messageId = log.messageId;
    }
  
    socketLib.onCreateMessage({
      app: accountId,
      user: newData.user,
      action: "message.create",
      metaData: {
        type: "log",
        conversation_id: conversationId,
        user: newData.user,
        message: JSON.stringify(logData),
        origin: "web",
      },
      to: expert,
      aux: aux,
      logData: logData,
    });
  }