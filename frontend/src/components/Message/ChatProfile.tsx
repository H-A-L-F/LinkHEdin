import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../config/constants'
import { UserInterface } from '../Profile/UserInterface'

interface ChatProfileInterface {
    content: string,
}

export default function ChatProfile({ content }: ChatProfileInterface) {
    let temp = JSON.parse(content)
    let user: UserInterface = {
        id: temp.id,
        name: temp.name,
        email: temp.email,
        FollowedUser: temp.FollowedUser,
        PhotoProfile: temp.PhotoProfile,
        ConnectedUser: temp.ConnectedUser,
        RequestConnect: temp.RequestConnect,
        BgPhotoProfile: temp.BgPhotoProfile,
        Headline: temp.Headline,
        ProfileViews: temp.ProfileViews,
        __typename: "user"
    }
    const navigate = useNavigate()

    function parseUser() {
        const temp = JSON.parse(content)
        user.PhotoProfile = temp.PhotoProfile
        user.name = temp.name
        user.email = temp.email
        user.Headline = temp.Headline
    }

    return (
        <div className='flex flex-col center-all cursor-pointer' onClick={() => { navigate(ROUTE.ROUTE_PROFILE(user.id)) }}>
            <div className="inv-avatar">
                <img src={user.PhotoProfile} className="inv-avatar-image" />
            </div>
            <div className="text-md font-semibold">{user.name}</div>
            <div className="text-sm font-medium">{user.email}</div>
        </div>
    )
}
