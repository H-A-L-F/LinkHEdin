import { createCollection } from "../config/firebase"

type UserChatRoom = {
    userIds: [string],
    userNames: [string]
}


export const usersCol = createCollection<UserChatRoom>('user_chat_room')