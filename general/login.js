import { accountId } from "../env.js";
import { newData, socketLib, updateNewData } from "../main.js";

export function login(data){
    
    socketLib.socket.emit("user-connected", {
        app_id: accountId,
        user: data.id,
        contact: data.id,
        action: "user-connected",
        metaData: {
          app_id: accountId,
          api_token: "123456789123456",
          user_id:data._id,
        },
        device: {
          ip: "123.213.121",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
        },
      });

      const newUser = {
        user: data._id,
        contact: data.id,
        accountId: accountId,
        status: 0,
        
      };
      updateNewData(newUser)
      document.cookie =
        "myData=" +
        JSON.stringify(newUser) +
        "; expires=Tue, 31 Dec 9999 23:59:59 GMT; path=/";
    
  
}