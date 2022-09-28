import { collection, query, where } from 'firebase/firestore'
import React from 'react'
import { db } from '../../config/firebase'
import { useAuth } from '../../hooks/useAuth'
import { FIRESTORE_FETCH_ERROR, FIRESTORE_FETCH_LOADING, useSnapCollection } from '../../hooks/useFirestoreSnapshot'
import ReactLoading from "react-loading";
import Modal from '../Modal/Modal'
import { RoomInterface } from '../Message/room'
import ProfileSelectionCard from '../Profile/ProfileSelectionCard'

interface ShareModalInterface {
    data: any,
    type: string,
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ShareModal({ data, type, openModal, setOpenModal }: ShareModalInterface) {
    const { user } = useAuth()
    const userState = useSnapCollection(query(collection(db, "user_chat_room"), where("userIds", "array-contains", user.id)))

    function handleClose() {
        setOpenModal(false)
    }

    function handleSubmit() {
        //emg kosong
    }

    function getOther(uids: string[]) {
        let ret = ""
        uids.forEach(element => {
            if (element !== user.id) ret = element
        })
        return ret
    }

    if (userState.status === FIRESTORE_FETCH_LOADING)
        return (
            <ReactLoading
                type="balls"
                className="mt-3"
                color="gray"
                height={"10%"}
                width={"10%"}
            ></ReactLoading>
        )

    if (userState.status === FIRESTORE_FETCH_ERROR) {
        console.log(userState.error)
        return <div></div>
    }

    const len = userState.data.length
    console.log(userState)

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
                    <div className='h-8'></div>
                    {userState.data.map((room: RoomInterface, idx: number) => {
                        return (
                            <React.Fragment key={'share-' + idx}>
                                <div className='bg-base-300 rounded-md p-2 mr-2'>
                                    <ProfileSelectionCard data={data} type={type} docRef={room.id} uid={getOther(room.userIds)} setOpenModal={setOpenModal} />
                                </div>
                                {idx < len - 1 && <div className='h-4'></div>}
                            </React.Fragment>
                        )
                    })}
                    <div className='h-8'></div>
                </div>
            }
        />
    )
}
