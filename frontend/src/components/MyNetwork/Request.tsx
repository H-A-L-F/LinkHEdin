import { useQuery } from '@apollo/client'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useBackEnd } from '../../hooks/useBackEnd'
import { FIND_USER_QUERY } from '../../query/user'

interface RequestInterface {
    id: string
}

export default function Request({ id }: RequestInterface) {
    const { user } = useAuth()
    const { loading, data, error } = useQuery(FIND_USER_QUERY, { variables: { id: id } })
    const { accConnect, cancelConnect } = useBackEnd()

    function handleAccept() {
        accConnect(user, currUser)
    }

    function handleDecline() {
        cancelConnect(id, user.id)
    }

    if (error) {
        console.log(error)
        return <div></div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    const currUser = data.user

    console.log(id)

    return (
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
            <div className="flex flex-row py-4">
                <div className="btn-error" onClick={handleDecline}>
                    <div className="bg"></div>
                    <div className="py-2">Ignore</div>
                </div>
                <div className="w-4"></div>
                <div className="btn-primary" onClick={handleAccept}>
                    <div className="bg"></div>
                    <div className="py-2">Accept</div>
                </div>
            </div>
        </div>
    )
}
