export interface RoomInterface {
  id: string;
  userIds: string[];
  userNames: string[];
}

export interface ChatInterface {
  content: string;
  type: string,
  idFrom: string;
  idTo: string;
  timestamp: Date;
}

export interface TidyRoomInterface {
  ref: string;
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
}
