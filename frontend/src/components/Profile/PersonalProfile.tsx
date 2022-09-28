import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/firebase'
import { toastError } from '../../config/toast'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { useUserProfile } from '../../pages/Profile'
import { TidyRoomInterface } from '../Message/room'
import ShareModal from '../ShareModal/ShareModal'
import ShareProfileModal from './ShareProfileModal'

export default function PersonalProfile() {
    const { id, currUser, isUser, refetchCurrUser } = useUserProfile()
    const { followUser, connectRequest, cancelConnect } = useBackEnd()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [openShare, setopenShare] = useState(false)

    function handleFollow() {
        followUser(id)
    }

    function handleConnect() {
        connectRequest(id, user.name + " have sent you a connect request!")
        refetchCurrUser()
    }

    function handleCancel() {
        cancelConnect(user.id, id)
        refetchCurrUser()
    }

    function redirect(room: any) {
        const temp = room.docs[0]
        console.log({ id: room.docs[0].id, ...room.docs[0].data() })
        const data: TidyRoomInterface = {
            ref: temp.id,
            fromId: user.id,
            toId: id,
            fromName: user.name,
            toName: currUser.name
        }
        navigate('/messages/' + JSON.stringify(data))
    }

    async function handleSendMessage() {
        let room: any
        try {
            const q = query(collection(db, "user_chat_room"), where("userIds", "==", [id, user.id]))
            room = await getDocs(q)
            if (room.docs.length !== 0) {
                redirect(room)
                return
            }
        } catch (error) {
            console.log(error)
        }
        try {
            const q = query(collection(db, "user_chat_room"), where("userIds", "==", [user.id, id]))
            room = await getDocs(q)
            if (room.docs.length !== 0) {
                redirect(room)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleBlock() {

    }

    return (
        <React.Fragment>
            <div className='personal-position'>
                <div className='personal-content'>
                    <div className='user'>
                        <div className='text-lg font-semibold'>
                            {currUser.name}
                        </div>
                        <div className='text-md font-medium'>
                            {currUser.email}
                        </div>
                    </div>
                </div>
            </div>
            {isUser ?
                <div>

                </div>
                :
                <div className='footer-position'>
                    <div className='flex flex-row'>
                        <div className='btn-primary' onClick={handleFollow}>
                            <div className='bg'></div>
                            <div className='center-all py-2'>
                                {user.FollowedUser.includes(id) ? "Unfollow" : "Follow"}
                            </div>
                        </div>
                        <div className='w-4'></div>
                        {
                            user.ConnectedUser.includes(id) !== true ?
                                <React.Fragment>
                                    {
                                        currUser.RequestConnect.includes(user.id)
                                            ?
                                            <div className='btn-error' onClick={handleCancel}>
                                                <div className='bg'></div>
                                                <div className='center-all py-2'>
                                                    Cancel
                                                </div>
                                            </div>
                                            :
                                            <div className='btn-primary' onClick={handleConnect}>
                                                <div className='bg'></div>
                                                <div className='center-all py-2'>
                                                    Connect
                                                </div>
                                            </div>
                                    }
                                    <div className='w-4'></div>
                                </React.Fragment>
                                :
                                <div className='btn-primary mr-4' onClick={handleSendMessage}>
                                    <div className='bg'></div>
                                    <div className='center-all py-2'>
                                        Send Message
                                    </div>
                                </div>
                        }
                        <div className='btn-primary' onClick={() => { setopenShare(true) }}>
                            <div className='bg'></div>
                            <div className='center-all py-2'>
                                Share Profile
                            </div>
                        </div>
                        <div className='w-4'></div>
                        <div className='btn-primary' onClick={handleBlock}>
                            <div className='bg'></div>
                            <div className='center-all py-2'>
                                Block
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <ShareProfileModal uid={id} openModal={openShare} setOpenModal={setopenShare} /> */}
            <ShareModal data={currUser} openModal={openShare} setOpenModal={setopenShare} />
        </React.Fragment>
    )
}
