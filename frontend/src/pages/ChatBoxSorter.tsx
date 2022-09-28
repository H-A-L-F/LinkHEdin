import React from 'react'
import ChatBox from '../components/Message/ChatBox'
import { useMessageProvider } from '../components/Message/DirectChat'
import EmptyChatBox from '../components/Message/EmptyChatBox'
import { TidyRoomInterface } from '../components/Message/room'

interface ChatBoxSorterInterface {
    currRef: TidyRoomInterface
}

export default function ChatBoxSorter({ currRef }: ChatBoxSorterInterface) {

    return (
        (currRef === undefined || currRef.ref === "") ?
            <EmptyChatBox />
            :
            <ChatBox currRef={currRef} />
    )
}
