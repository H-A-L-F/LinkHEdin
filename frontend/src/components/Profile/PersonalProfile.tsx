import React from 'react'
import { useUserProfile } from '../../pages/Profile'

export default function PersonalProfile() {
    const { currUser } = useUserProfile()

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
            <div className='footer-position'>
                <div className='flex flex-row'>
                    <div className='btn-primary'>
                        <div className='bg'></div>
                        <div className='center-all py-2'>
                            Follow
                        </div>
                    </div>
                    <div className='w-4'></div>
                    <div className='btn-primary'>
                        <div className='bg'></div>
                        <div className='center-all py-2'>
                            Connect
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
