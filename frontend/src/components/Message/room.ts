export interface RoomInterface {
    userIds: string[],
    userNames: string[]
}

export interface ChatInterface {
    content: string,
    idFrom: string,
    idTo: string,
    timestamp: Date
}