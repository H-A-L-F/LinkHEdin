import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import ConnectedUser from './ConnectedUser'
import Request from './Request'
import UserYouMightKnow from './UserYouMightKnow'

export default function Invitation() {
    const { user } = useAuth()

    const len = user.RequestConnect.length
    return (
        <div className='flex flex-col mr-8'>
            <div className="box w-full h-fit">
                <div className="header">
                    Invitations
                    {/* <div className='btn-plain'>
                <div className='bg'></div>
                <div className='text-sm font-medium py-2'>See all 4</div>
            </div> */}
                </div>
                <div className="divider"></div>
                {user.RequestConnect.map((e: string, idx: number) => {
                    return (
                        <React.Fragment key={"inv-" + idx}>
                            <Request id={e} />
                            {
                                idx < len - 1 && <div className='divider'></div>
                            }
                        </React.Fragment>
                    )
                })}
            </div>
            <div className='h-4'></div>
            <UserYouMightKnow />
            <div className='h-4'></div>
            <ConnectedUser />
        </div>
    )
}
