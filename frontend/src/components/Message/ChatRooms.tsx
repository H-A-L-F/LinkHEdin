import { collection, doc, query, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../../config/firebase'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, useSnapCollection } from '../../hooks/useFirestoreSnapshot'
import UserChatRoom from './UserChatRoom'
import ReactLoading from "react-loading";
import { RoomInterface } from './room'
import { useAuth } from '../../hooks/useAuth'

export default function ChatRooms() {
    const { user } = useAuth()
    const roomState = useSnapCollection(query(collection(db, "user_chat_room"), where("userIds", "array-contains", user.id)))

    function getName(room: RoomInterface) {
        if (room.userIds[0] === user.id) return room.userNames[1]
        return room.userNames[0]
    }

    console.log(roomState)
    if (roomState.status === FIRESTORE_FETCH_LOADING)
        return (
            <ReactLoading
                type="balls"
                className="mt-3"
                color="gray"
                height={"10%"}
                width={"10%"}
            ></ReactLoading>
        )

    if (roomState.status === FIRESTORE_FETCH_ERROR) {
        console.log(roomState.error)
        return <div></div>
    }

    return (
        <div className='flex flex-col w-96 h-full'>
            {roomState.data.map((room: RoomInterface, idx: number) => {
                return (
                    <UserChatRoom name={getName(room)} key={"room-" + idx} />
                )
            })}
        </div>
    )
}
