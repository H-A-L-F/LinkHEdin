import { useQuery } from '@apollo/client'
import React from 'react'
import NotificationCard from '../components/Notification/NotificationCard'
import { MY_NOTIFICATION_QUERY } from '../query/notification'

export default function Notification() {
    const { loading, data, error, refetch } = useQuery(MY_NOTIFICATION_QUERY)

    if (error) {
        console.log(error)
        return <div></div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    const notification = data.myNotification
    return (
        <div className='box'>
            <NotificationCard data={notification} refetch={refetch}/>
        </div>
    )
}
