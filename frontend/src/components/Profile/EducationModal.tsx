import React from 'react'

export default function EducationModal({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    function handleCreate() {

    }

    function close() {
        setOpen(false)
        console.log(open)
    }

    return (
        <div className='form'>
            <div className='w-full flex-row mb-20'>
                <p className='text-black text-l bold'>Add education</p>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>School</p>
                <input id='School' type="text" className='text-input white-bg' placeholder='Ex: Binus University' />
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Degree</p>
                <input id='Degree' type="text" className='text-input white-bg' placeholder="Ex: Bachelor's" />
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Field of Study</p>
                <input id='StudyField' type="text" className='text-input white-bg' placeholder="Ex: Computer Science" />
            </div>

            <div className='w-full flex-row space-between mb-20'>
                <p className='text-black text-s'>Start Year</p>
                <input type="number" id='StartDate' className='white-bg text-black text-s border-sering-pake' placeholder='2020' />
            </div>

            <div className='w-full flex-row space-between mb-20'>
                <p className='text-black text-s'>End Year</p>
                <input type="number" id='EndDate' className='white-bg text-black text-s border-sering-pake' placeholder='2022' />
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Grade</p>
                <input id='Grade' type="text" className='text-input white-bg' placeholder="" />
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Activities</p>
                <input id='Activities' type="text" className='text-input white-bg' placeholder="Ex: Voleyball, Basketball" />
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Description</p>
                <input id='Description' type="text" className='text-input white-bg' placeholder="" />
            </div>

            <div className='w-full flex-row space-evenly'>
                <button onClick={handleCreate} className='blue-button-smaller text-white'>Save</button>
                <button onClick={close} className='red-button-smaller text-white'>Cancel</button>
            </div>
        </div>
    )
}