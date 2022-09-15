import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import Request from './Request'

export default function Invitation() {
    const { user } = useAuth()

    const len = user.RequestConnect.length
    return (
        <div className="box w-full h-full">
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
    )
}
