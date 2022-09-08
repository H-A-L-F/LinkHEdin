import { Timestamp } from "firebase/firestore"
import { createCollection } from "../config/firebase"

type UserChatRoom = {
    userIds: [string],
    userNames: [string]
}

type UserMessage = {
    content: string,
    idFrom: string,
    idTo: string,
    timestamp: Date
}

export function genUserMessageCol(refId: string) {
    const userMessageCol = createCollection<UserMessage>('user_chat_room/' + refId + '/chats')
    return userMessageCol
}

export const usersCol = createCollection<UserChatRoom>('user_chat_room')