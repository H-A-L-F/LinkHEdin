import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { createRef, useEffect } from 'react'
import { HiPaperAirplane } from "react-icons/hi";
import { db } from '../../config/firebase';
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, useSnapCollection } from '../../hooks/useFirestoreSnapshot';
import ReactLoading from "react-loading";
import { ChatInterface, TidyRoomInterface } from './room';
import { useBackEnd } from '../../hooks/useBackEnd';
import { usersCol } from '../../query/FirestoreCollection';
import { useAuth } from '../../hooks/useAuth';
import { useMessageProvider } from './DirectChat';
import ChatProfile from './ChatProfile';
import ChatPost from './ChatPost';

interface ChatBoxInterface {
    currRef: TidyRoomInterface
}

export default function ChatBox({ currRef }: ChatBoxInterface) {
    // export default function ChatBox() {
    const { user } = useAuth()
    // const { currRef } = useMessageProvider()
    let chatState = useSnapCollection(query(collection(db, "user_chat_room", currRef.ref, "chats"), orderBy('timestamp', 'asc')))
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

    function chatWrapper(chat: ChatInterface) {
        switch (chat.type) {
            case "profile": {
                return (
                    <ChatProfile content={chat.content} />
                )
            }
            case "post": {
                return (
                    <ChatPost ps={chat.content} />
                )
            }
            default: {
                return chat.content
            }
        }
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

    return (
        <div className='chat-box'>
            <div className='chat'>
                {chatState.data.map((chat: ChatInterface, idx: number) => {
                    return (
                        <React.Fragment key={'msg-' + idx}>
                            {
                                chat.idFrom === user.id ?
                                    <div className='bubble mx-2 place-self-end mb-2' >
                                        {chatWrapper(chat)}
                                    </div>
                                    :
                                    <div className='bubble mx-2 place-self-start' >
                                        {chatWrapper(chat)}
                                    </div>
                            }
                            {idx < len - 1 && <div className='h-4'></div>}
                        </React.Fragment>
                    )
                })}
                <div>{currRef.ref}</div>
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

interface ChatWrapperInterface {
    chat: ChatInterface
}

function ChatWrapper({ chat }: ChatWrapperInterface) {

    return (
        chat.type === "profile" ?
            <div className='flex flex-col center-all'>
                {
                    <ChatProfile content={chat.content} />
                }
            </div>
            :
            chat.content
    )
}