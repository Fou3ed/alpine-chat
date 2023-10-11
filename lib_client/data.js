/**
 * Connection
 */

export const onConnect = {
    app_id: "638dc76312488c6bf67e8fc0",
    user: "6391f3fbbac5ef031945cf51",
    action: "connect",
    metaData: {
        app_id:"638dc76312488c6bf67e8fc0",
        user_id: "6391f3fbbac5ef031945cf51",
        api_token:"123456789123456"
    },
    "device":{
        "ip": "192.168.1.1",
        "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        "platform": navigator.platform,
        "userAgent": navigator.userAgent
      }
};

export const onDisconnect = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "disconnect",
    metaData: "",
    device: {
        ip: "192.168.1.1",
        timezone: "America/Los Angeles",
        platform: "desktop",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
    },
};

export const onUsersConnected = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "connections",
};

/**
 * conversations
 */

export const onConversationCreate = {

    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.create",
    metaData: {
        name: "room 1",
        channel_url: "socketLib/test",
        conversation_type: "private",
        description: "private chat",
        operators: [1],
        members: [2],
        permissions: {"key":"value"},
        members_count:2,
        max_length_message: "256",
    },
};
export const onConversationUpdate = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.update",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        fields: {
            name: "New friendly name",
        },
    },
};

export const onConversationDelete = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.delete",
    metaData: {
        conversation: "63d39f8c1da497496e1700ce"
        ,
    },
};
export const onConversationEnd = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.end",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        reason: "Time Out",
    },
};

/**
 * Conversation Members
 */
export const ConversationMemberRequest = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.member.request",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        user: ["6390b2efdfb49a27e7e3c0b9"],
    },
};
export const onConversationMemberJoin = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.member.join",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        request: "63907b74266e3b8358516cd1",
    },
};

export const onConversationMemberLeft = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.member.left",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        reason: "hang out",
    },
};

export const onConversationMemberBan = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.member.left",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        reason: "unaccepted behavior",
    },
};
export const onConversationMemberUnBan = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.member.unban",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        user: "6390b2efdfb49a27e7e3c0b9",
        reason: "forgiveness",
    },
};
export const onConversationMembersList = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.members.get",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
    },
};

/**
 * Conversation Transfers
 */
export const onConversationTransferRequest = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.transfer.request",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        user: ["6390b2efdfb49a27e7e3c0b9"],
    },
};

export const onConversationTransferAccept = {
    app: "638dc76312488c6bf67e8fc0D",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "conversation.transfer.accept",
    metaData: {
        conversation: "63907b74266e3b8358516cd1",
        transfer: "63907b74266e3b8358516cd1",
    },
};

export const onConversationTransferReject = {
    app: "ID",
    user: "ID",
    action: "conversation.transfer.reject",
    metaData: {
        conversation: "ID",
        transfer: "ID",
        reason: "",
    },
};
/***
 * Messages
 */

export const onMessageCreate = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "message.create",
    metaData: {
        type: "MSG",
        conversation_id: "63971dd761f3ef13725a96d2",
        user:"6390b2efdfb49a27e7e3c0b9",
        message: String,
        data:"non other data",
        origin:"web",
    },
};
export const onMessageUpdate = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "message.update",
    metaData: {
        conversation: "63d3aeb269348fc037b5867d",
        message: "63cead7784364b8298ef570b",
        fields: {
            content: "olla",
        },
    },
};
export const onMessageDelete = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "message.delete",
    metaData: {
        conversation: "63d3aeb269348fc037b5867d",
        message: "63ceaccb70d1e6f31f2f1f45",
    },
};
export const onMessageReceive = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "message.receive",
    metaData: "",
};

/**
 * Media
 */
export const onMediaCreate = {
    app: "ID",
    user: "ID",
    action: "media.create",
    metaData: {
        conversation: "ID",
        message: "ID",
        type: "PDF",
        name: "",
        content: "",
        content_type: "",
        size: "",
        url: "",
    },
};
export const onMediaDelete = {
    app: "ID",
    user: "ID",
    action: "media.delete",
    metaData: {
        conversation: "ID",
        media: "ID",
    },
};
export const onMediaReceive = {
    app: "ID",
    user: "ID",
    action: "media.receive",
    metaData: "",
};
/**
 * Actions
 */
export const onMessageRead = {
    app: "638dc76312488c6bf67e8fc0",
    user: "6390b2efdfb49a27e7e3c0b9",
    action: "message.read",
    metaData: {
        conversation: "63d3aeb269348fc037b5867d",
        message: "6390bb6609fab28cfc1269e6",
    },
};

export const onMessagePin = {
    app: "ID",
    user: "ID",
    action: "message.pin",
    metaData: {
        conversation: "ID",
        message: "ID",
        type: "",
    },
};
export const onMessageUnpin = {
    app: "ID",
    user: "ID",
    action: "message.unpin",
    metaData: {
        conversation: "ID",
        message: "ID",
    },
};

export const onMessageReact = {
    app: "ID",
    user: "ID",
    action: "message.react",
    metaData: {
        conversation: "ID",
        message: "ID",
        type: "",
    },
};
export const onMessageUnReact = {
    app: "ID",
    user: "ID",
    action: "message.unReact",
    metaData: {
        conversation: "ID",
        message: "ID",
        type: "",
    },
};
export const onMentionRequest = {
    app: "ID",
    user: "ID",
    action: "mention.create",
    metaData: {
        conversation: "ID",
        message: "ID",
        user: [],
    },
};
export const onMentionDelete = {
    app: "ID",
    user: "ID",
    action: "mention.delete",
    metaData: {
        conversation: "ID",
        message: "ID",
    },
};
export const onMentionReceive = {
    app: "ID",
    user: "ID",
    action: "mention.receive",
    metaData: "",
};
export const onTypingStart = {
    app: "ID",
    user: "ID",
    action: "typing.start",
    metaData: {
        conversation: "ID",
    },
};
export const onTypingStop = {
    app: "ID",
    user: "ID",
    action: "typing.stop",
    metaData: {
        conversation: "ID",
    },
};