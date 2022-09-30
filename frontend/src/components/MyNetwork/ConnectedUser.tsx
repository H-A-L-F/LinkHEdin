import { useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../config/constants';
import { GET_CONNECTED_USER_QUERY } from '../../query/user';
import { UserInterface } from '../Profile/UserInterface'

export default function ConnectedUser() {
    const { data } = useQuery(GET_CONNECTED_USER_QUERY)
    const navigate = useNavigate();

    function handleViewProfile(id: string) {
        navigate(ROUTE.ROUTE_PROFILE(id))
    }

    if (!data || data.searchConnected.length === 0) {
        return <div></div>
    }

    const len = data.searchConnected.length

    return (
        <div className='box w-full h-fit'>
            <div className="header">
                Connected user
            </div>
            <div className="divider"></div>
            {data.searchConnected.map((currUser: UserInterface, idx: number) => {
                return (
                    <React.Fragment key={"inv-" + idx}>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                                <div className="inv-avatar">
                                    <img src={currUser.PhotoProfile} className="inv-avatar-image" />
                                </div>
                                <div className="w-4"></div>
                                <div className="flex flex-col">
                                    <div className="text-md font-semibold">{currUser.name}</div>
                                    <div className="text-sm font-medium">{currUser.email}</div>
                                </div>
                            </div>
                            <div className="w-4"></div>
                            <div className="btn-primary my-4" onClick={() => { handleViewProfile(currUser.id) }}>
                                <div className="bg"></div>
                                <div className="py-2">See profile</div>
                            </div>
                        </div>
                        {
                            idx < len - 1 && <div className='divider'></div>
                        }
                    </React.Fragment>
                )
            })}
        </div>
    )
}
