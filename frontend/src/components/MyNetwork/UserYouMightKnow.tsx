import { useQuery } from '@apollo/client';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { USER_SUGGESTION_QUERY } from '../../query/user';
import { UserInterface } from '../Profile/UserInterface';
import { ROUTE } from '../../config/constants';

export default function UserYouMightKnow() {
    const { data } = useQuery(USER_SUGGESTION_QUERY);
    const navigate = useNavigate();

    function handleViewProfile(id: string) {
        navigate(ROUTE.ROUTE_PROFILE(id))
    }

    if (!data || data.userSuggestion.length === 0) {
        return <div></div>
    }

    const len = data.length
    return (
        <div className='box w-full h-full'>
            <div className="header">
                User you might know
            </div>
            <div className="divider"></div>
            {data.userSuggestion.map((currUser: UserInterface, idx: number) => {
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
                            <div className="btn-primary" onClick={() => { handleViewProfile(currUser.id) }}>
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
