import React from 'react'
import { NotificationInterface } from './NotificationInterface'
import { HiTrash } from "react-icons/hi";
import { useBackEnd } from '../../hooks/useBackEnd';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

interface NotificationCardInterface {
    data: [NotificationInterface],
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export default function NotificationCard({ data, refetch }: NotificationCardInterface) {
    const { deleteNotification } = useBackEnd()

    function handleDelete(id: string) {
        deleteNotification(id)
        refetch()
    }



    const len: number = data.length

    if (len === 0) {
        return <div className='text-lg font-semibold py-4'>There are no notifications</div>
    }

    return (
        <div className='content'>
            {data.map((e, idx) => {
                return (
                    <React.Fragment key={'req-' + idx}>
                        <div className='flex flex-row justify-between center-all'>
                            <div className='flex flex-row'>
                                <div className='inv-avatar'>
                                    <img src={e.senderPhotoUrl === "" ? "https://picsum.photos/seed/picsum/200/300" : e.senderPhotoUrl} className='inv-avatar-image' />
                                </div>
                                <div className='w-4'></div>
                                <div className='flex flex-col justify-center'>
                                    <div className='text-md font-semibold'>{e.senderName}</div>
                                    <div className='text-sm font-normal'>{e.text}</div>
                                </div>
                            </div>
                            <div className='btn-plain w-fit h-fit py-2 px-2' onClick={() => { handleDelete(e.id) }}>
                                <div className='bg'></div>
                                <HiTrash size={24} />
                            </div>
                        </div>
                        {
                            idx < len - 1 && <div className='divider m-2'></div>
                        }
                    </React.Fragment>
                )
            })}

        </div>
    )
}
