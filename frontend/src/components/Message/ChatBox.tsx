import { collection, doc, orderBy, query } from 'firebase/firestore';
import React, { createRef } from 'react'
import { HiPaperAirplane } from "react-icons/hi";
import { db } from '../../config/firebase';
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, useSnapCollection } from '../../hooks/useFirestoreSnapshot';
import ReactLoading from "react-loading";
import { ChatInterface, TidyRoomInterface } from './room';
import { useBackEnd } from '../../hooks/useBackEnd';
import { usersCol } from '../../query/FirestoreCollection';
import { useAuth } from '../../hooks/useAuth';

interface ChatBoxInterface {
    currRef: TidyRoomInterface
}

export default function ChatBox({ currRef }: ChatBoxInterface) {
    const { user } = useAuth()
    const chatState = useSnapCollection(query(collection(db, "user_chat_room", currRef.ref, "chats"), orderBy('timestamp', 'asc')))
    const { sendMessage } = useBackEnd()
    const msgRef = createRef<HTMLInputElement>()

    function sendMessageFunc() {
        const text = msgRef.current?.value
        sendMessage(currRef.ref, currRef.fromId, currRef.toId, text)
        (document.getElementById('msg-input') as HTMLInputElement).value = null
    }

    function handleEnter(event: any) {
        if (event.key === 'Enter') sendMessageFunc()
    }

    if (chatState.status === FIRESTORE_FETCH_LOADING)
        return (
            <div className='chat-box'>
                <div className='chat'>
                    <ReactLoading
                        type="balls"
                        className="mt-3"
                        color="gray"
                        height={"10%"}
                        width={"10%"}
                    ></ReactLoading>
                </div>
                <div className='footer'>
                    <div className='input'>
                        <input type="text" className='input-real' placeholder='Message...' ref={msgRef} onKeyDown={handleEnter} />
                    </div>
                    <div className='w-10'></div>
                    <div className='btn-plain px-2 rounded-xl' onClick={sendMessage}>
                        <div className='bg'></div>
                        <HiPaperAirplane size={24} />
                    </div>
                </div>
            </div>
        )

    if (chatState.status === FIRESTORE_FETCH_ERROR) {
        console.log(chatState.error)
        return <div></div>
    }

    const len = chatState.data.length
    console.log(currRef)

    return (
        <div className='chat-box'>
            <div className='chat'>
                {chatState.data.map((chat: ChatInterface, idx: number) => {
                    return (
                        <React.Fragment>
                            {
                                chat.idFrom === user.id ?
                                    <div className='bubble mx-2 place-self-end' key={'msg-' + idx}>{chat.content}</div>
                                    :
                                    <div className='bubble mx-2 place-self-start' key={'msg-' + idx}>{chat.content}</div>
                            }
                            {idx < len - 1 && <div className='h-4'></div>}
                        </React.Fragment>
                    )
                })}
            </div>
            <div className='footer'>
                <div className='input'>
                    <input type="text" className='input-real' id='msg-input' placeholder='Message...' ref={msgRef} onKeyDown={handleEnter} />
                </div>
                <div className='w-10'></div>
                <div className='btn-plain px-2 rounded-xl' onClick={sendMessageFunc}>
                    <div className='bg'></div>
                    <HiPaperAirplane size={24} />
                </div>
            </div>
        </div>
    )
}
