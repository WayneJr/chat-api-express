export enum USER_TYPES {
  CONSUMER = "consumer",
  SUPPORT = "support",
};

export type userTypeInterface = {
  [key in USER_TYPES]: string;
}