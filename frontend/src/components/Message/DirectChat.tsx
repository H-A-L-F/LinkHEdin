import { collection, query, where } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { HiOutlineDotsHorizontal, HiPencilAlt } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase'
import { useAuth } from '../../hooks/useAuth'
import { useSnapCollection } from '../../hooks/useFirestoreSnapshot'
import ChatBox from './ChatBox'
import ChatRooms from './ChatRooms'
import EmptyChatBox from './EmptyChatBox'
import { TidyRoomInterface } from './room'

const directChatContext = createContext({} as any)

export default function DirectChat() {
    const { user } = useAuth()
    const { room } = useParams()
    const [currRef, setCurrRef] = useState<TidyRoomInterface>(parseRoom())
    const roomState = useSnapCollection(query(collection(db, "user_chat_room"), where("userIds", "array-contains", user.id)))

    function parseRoom() {
        const obj = room !== undefined && JSON.parse(room)
        const temp: TidyRoomInterface = {
            ref: obj.ref,
            fromId: obj.fromId,
            fromName: obj.fromName,
            toId: obj.toId,
            toName: obj.toName
        }
        return temp
    }

    useEffect(() => {
        console.log("useeffec", parseRoom())
        setCurrRef(parseRoom())
    }, [room])

    useEffect(() => {
        console.log("ref berubah ajg");
    }, [currRef])

    console.log("parse", currRef, parseRoom());
    console.log("kebuat ulangs");


    return (
        <directChatContext.Provider value={{ currRef, setCurrRef }}>
            <div className='box w-full'>
                <div className='flex flex-col h-full justify-start'>
                    <div className='flex flex-row center-all w-full'>
                        <div className='flex flex-row justify-between w-96'>
                            <div className='text-lg font-semibold'>Messaging</div>
                            <div className='btn-plain px-2'>
                                <div className='bg'></div>
                                <HiPencilAlt size={24} />
                            </div>
                        </div>
                        <div className='divider-h'></div>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='text-lg font-semibold'>{user.name}</div>
                            <div className='btn-plain'>
                                <div className='bg'></div>
                                <HiOutlineDotsHorizontal size={24} />
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='flex flex-row center-all w-full h-full justify-start'>
                        <ChatRooms roomState={roomState} />
                        <div className='divider-h'></div>
                        {/* {
                            currRef.ref === "" ?
                                <EmptyChatBox />
                                :
                                <ChatBox currRef={currRef} />
                        } */}
                        <ChatBox currRef={currRef} />
                    </div>
                </div>
            </div>
        </directChatContext.Provider>
    )
}

export function useMessageProvider() {
    return useContext(directChatContext)
}