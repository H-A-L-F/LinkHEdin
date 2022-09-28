import React from 'react'
import Modal from '../Modal/Modal'

interface SharePostModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SharePostModal({ openModal, setOpenModal }: SharePostModalInterface) {

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
                    <div className='h-8'></div>
                    {userState.data.map((room: RoomInterface, idx: number) => {
                        return (
                            <React.Fragment key={'share-' + idx}>
                                <div className='bg-base-300 rounded-md p-2 mr-2'>
                                    <ProfileSelectionCard docRef={room.id} uid={getOther(room.userIds)} setOpenModal={setOpenModal} />
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
