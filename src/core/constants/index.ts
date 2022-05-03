export enum USER_TYPES {
  CONSUMER = "consumer",
  SUPPORT = "support",
};

export enum CHAT_ROOM_TYPES  {
  CONSUMER_TO_CONSUMER = "consumer-to-consumer",
  CONSUMER_TO_SUPPORT = "consumer-to-support",
};

export type userType = {
  [key in USER_TYPES]: string;
}

export type chatroomType ={
  [key in CHAT_ROOM_TYPES]: string;
}

export const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};