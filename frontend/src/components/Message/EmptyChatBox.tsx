import { collection } from 'firebase/firestore';
import React, { createRef } from 'react'
import { HiPaperAirplane } from "react-icons/hi";
import { db } from '../../config/firebase';
import { useSnapCollection } from '../../hooks/useFirestoreSnapshot';

export default function EmptyChatBox() {
    return (
        <div className='chat-box'>
            <div className='chat'>
            </div>
            <div className='footer'>
                <div className='input'>
                    <input type="text" className='input-real' placeholder='Message...' />
                </div>
                <div className='w-10'></div>
                <div className='btn-plain px-2 rounded-xl'>
                    <div className='bg'></div>
                    <HiPaperAirplane size={24} />
                </div>
            </div>
        </div>
    )
}
