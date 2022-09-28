import { useQuery } from '@apollo/client'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { FIND_USER_QUERY } from '../../query/user'
import { UserInterface } from './UserInterface'

interface ProfileSelectionCardInterface {
    data: any,
    type: string,
    docRef: string,
    uid: string,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ProfileSelectionCard({ data, type, docRef, uid, setOpenModal }: ProfileSelectionCardInterface) {
    const currUser = useQuery(FIND_USER_QUERY, { variables: { id: uid } })
    const { shareProfile, sharePost } = useBackEnd()
    const { user } = useAuth()

    function handleShareProfile(data: UserInterface) {
        if (type === "profile") {
            shareProfile(docRef, user.id, uid, JSON.stringify(data))
        } else if (type === "post") {
            sharePost(docRef, user.id, uid, JSON.stringify(data))
        }
        setOpenModal(false)
    }

    if (!currUser.data) {
        return <div></div>
    }

    console.log(currUser.data)

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <div className="inv-avatar">
                    <img src={currUser.data.user.PhotoProfile} className="inv-avatar-image" />
                </div>
                <div className="w-4"></div>
                <div className="flex flex-col">
                    <div className="text-md font-semibold">{currUser.data.user.name}</div>
                    <div className="text-sm font-medium">{currUser.data.user.email}</div>
                </div>
            </div>
            <div className="flex flex-row py-4">
                <div className="w-4"></div>
                <div className="btn-primary" onClick={() => { handleShareProfile(data) }}>
                    <div className="bg"></div>
                    <div className="py-2">Share</div>
                </div>
            </div>
        </div>
    )
}
