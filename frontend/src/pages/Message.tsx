import { collection, query, where } from 'firebase/firestore';
import React, { createContext, createRef, useContext, useRef, useState } from 'react'
import { HiPencilAlt, HiOutlineDotsHorizontal } from "react-icons/hi";
import ChatBox from '../components/Message/ChatBox';
import ChatRooms from '../components/Message/ChatRooms';
import EmptyChatBox from '../components/Message/EmptyChatBox';
import { TidyRoomInterface } from '../components/Message/room';
import UserChatRoom from '../components/Message/UserChatRoom';
import { db } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useSnapCollection } from '../hooks/useFirestoreSnapshot';

const messageContext = createContext({} as any)

export default function Message() {
    const { user } = useAuth()
    const [currRef, setCurrRef] = useState<TidyRoomInterface>({ ref: "", fromId: "", fromName: "", toId: "", toName: "" })
    const roomState = useSnapCollection(query(collection(db, "user_chat_room"), where("userIds", "array-contains", user.id)))

    return (
        <messageContext.Provider value={{ currRef, setCurrRef }}>
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
                        {
                            currRef.ref === "" ?
                                <EmptyChatBox />
                                :
                                <ChatBox currRef={currRef} />
                        }
                    </div>
                </div>
            </div>
        </messageContext.Provider>
    )
}

export function useMessageProvider() {
    return useContext(messageContext)
}

// export default function Message() {
//     const { user } = useAuth()
//     const msgRef = createRef<HTMLInputElement>();

//     function sendMessage() {
//         console.log(msgRef.current?.value)
//     }

//     function handleEnter(event: any) {
//         if (event.key === 'Enter') sendMessage()
//     }

//     return (
//         <div className='box w-full'>
//             <div className='flex flex-col h-full justify-start'>
//                 <div className='flex flex-row center-all w-full'>
//                     <div className='flex flex-row justify-between w-96'>
//                         <div className='text-lg font-semibold'>Messaging</div>
//                         <div className='btn-plain px-2'>
//                             <div className='bg'></div>
//                             <HiPencilAlt size={24} />
//                         </div>
//                     </div>
//                     <div className='divider-h'></div>
//                     <div className='flex flex-row justify-between w-full'>
//                         <div className='text-lg font-semibold'>{user.name}</div>
//                         <div className='btn-plain'>
//                             <div className='bg'></div>
//                             <HiOutlineDotsHorizontal size={24} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='divider'></div>
//                 <div className='flex flex-row center-all w-full h-full justify-start'>
//                     <ChatRooms />
//                     <div className='divider-h'></div>
//                     <div className='chat-box'>
//                         <div className='chat'>
//                             <div className='bubble place-self-end'>adsdass</div>
//                             <div className='bubble place-self-start'>adsdass</div>
//                         </div>
//                         <div className='footer'>
//                             <div className='input'>
//                                 <input type="text" className='input-real' placeholder='Message...' ref={msgRef} onKeyDown={handleEnter} />
//                             </div>
//                             <div className='w-10'></div>
//                             <div className='btn-plain px-2 rounded-xl' onClick={sendMessage}>
//                                 <div className='bg'></div>
//                                 <HiPaperAirplane size={24} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
