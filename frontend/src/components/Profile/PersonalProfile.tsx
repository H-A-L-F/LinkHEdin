import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { useUserProfile } from '../../pages/Profile'

export default function PersonalProfile() {
    const { id, currUser, isUser } = useUserProfile()
    const { followUser, connectRequest } = useBackEnd()
    const { user } = useAuth()

    function handleFollow() {
        followUser(id)
    }

    function handleConnect() {
        connectRequest(id, user.name + " have sent you a connect request!")
    }

    function handleBlock() {

    }

    console.log(user)

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
                        <div className='btn-primary' onClick={handleConnect}>
                            <div className='bg'></div>
                            <div className='center-all py-2'>
                                Connect
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
        </React.Fragment>
    )
}
