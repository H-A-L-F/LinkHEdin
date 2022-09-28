import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../../config/firebase'
import { useAuth } from '../../hooks/useAuth'
import { useSnapCollection } from '../../hooks/useFirestoreSnapshot'
import Modal from '../Modal/Modal'

interface SharePostModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SharePostModal({ openModal, setOpenModal }: SharePostModalInterface) {
    const { user } = useAuth()
    const userState = useSnapCollection(query(collection(db, "user_chat_room"), where("userIds", "array-contains", user.id)))

    function handleClose() {
        setOpenModal(false)
    }

    function handleSubmit() {
        //emg kosong
    }

    return (
        <Modal
            title='Add Education'
            open={openModal}
            edit={false}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            Content=
            {
                <div className='form pr-2'>

                </div>
            }
        />
    )
}
