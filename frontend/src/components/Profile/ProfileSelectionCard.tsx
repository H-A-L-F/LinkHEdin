import { useQuery } from '@apollo/client'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { FIND_USER_QUERY } from '../../query/user'
import { UserInterface } from './UserInterface'

interface ProfileSelectionCardInterface {
    docRef: string,
    uid: string,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ProfileSelectionCard({ docRef, uid, setOpenModal }: ProfileSelectionCardInterface) {
    const { data } = useQuery(FIND_USER_QUERY, { variables: { id: uid } })
    const { shareProfile } = useBackEnd()
    const { user } = useAuth()

    function handleShareProfile(data: UserInterface) {
        shareProfile(docRef, user.id, uid, JSON.stringify(data))
        setOpenModal(false)
    }

    if (!data) {
        return <div></div>
    }

    console.log(data)

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-row">
                <div className="inv-avatar">
                    <img src={data.user.PhotoProfile} className="inv-avatar-image" />
                </div>
                <div className="w-4"></div>
                <div className="flex flex-col">
                    <div className="text-md font-semibold">{data.user.name}</div>
                    <div className="text-sm font-medium">{data.user.email}</div>
                </div>
            </div>
            <div className="flex flex-row py-4">
                <div className="w-4"></div>
                <div className="btn-primary" onClick={() => { handleShareProfile(data.user) }}>
                    <div className="bg"></div>
                    <div className="py-2">Share</div>
                </div>
            </div>
        </div>
    )
}
