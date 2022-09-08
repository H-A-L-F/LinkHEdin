import { collection, doc, query, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../../config/firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, useSnapCollection } from '../../hooks/useFirestoreSnapshot'
import UserChatRoom from './UserChatRoom'
import ReactLoading from "react-loading";
import { RoomInterface, TidyRoomInterface } from './room'
import { useAuth } from '../../hooks/useAuth'
import { useMessageProvider } from '../../pages/Message'

interface ChatRoomsInterface {
    roomState: {
        status: string;
        data: any;
        error: undefined;
    } | {
        status: string;
        data: undefined;
        error: any;
    }
}

export default function ChatRooms({ roomState }: ChatRoomsInterface) {
    const { user } = useAuth()
    const { currRef, setCurrRef } = useMessageProvider()

    function getName(room: RoomInterface) {
        if (room.userIds[0] === user.id) return room.userNames[1]
        return room.userNames[0]
    }

    function tidyRoom(room: RoomInterface) {
        let currData: TidyRoomInterface = {
            ref: room.id,
            fromId: "",
            fromName: "",
            toId: "",
            toName: "",
        }
        if (room.userIds[0] === user.id) {
            currData.toId = room.userIds[1]
            currData.toName = room.userNames[1]
            currData.fromId = room.userIds[0]
            currData.fromName = room.userNames[0]
            return currData
        }
        currData.toId = room.userIds[0]
        currData.toName = room.userNames[0]
        currData.fromId = room.userIds[1]
        currData.fromName = room.userNames[1]
        return currData
    }

    function handleClick(room: RoomInterface) {
        setCurrRef(tidyRoom(room))
    }

    if (roomState.status === FIRESTORE_FETCH_LOADING)
        return (
            <div className='flex flex-col w-96 h-full'>
                <ReactLoading
                    type="balls"
                    className="mt-3"
                    color="gray"
                    height={"10%"}
                    width={"10%"}
                ></ReactLoading>
            </div>
        )

    if (roomState.status === FIRESTORE_FETCH_ERROR) {
        console.log(roomState.error)
        return <div></div>
    }

    return (
        <div className='flex flex-col w-96 h-full'>
            {roomState.data.map((room: RoomInterface, idx: number) => {
                return (
                    <div onClick={() => { handleClick(room) }} key={"room-" + idx} >
                        <UserChatRoom name={getName(room)} />
                    </div>
                )
            })}
        </div>
    )
}
