import Modal from '../Modal/Modal'

export default function EducationModal({ openModal, setOpenModal }: { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    function handleSubmit() {
        const school = (document.getElementById("School-ced") as HTMLInputElement).value
        const degree = (document.getElementById("Degree-ced") as HTMLInputElement).value
        const studyField = (document.getElementById("StudyField-ced") as HTMLInputElement).value
        const startDate = (document.getElementById("StartDate-ced") as HTMLInputElement).value
        const endDate = (document.getElementById("EndDate-ced") as HTMLInputElement).value
        const grade = parseFloat((document.getElementById("Grade-ced") as HTMLInputElement).value)
        const activities = (document.getElementById("Activities-ced") as HTMLInputElement).value
        const description = (document.getElementById("Description-ced") as HTMLInputElement).value
    }

    function handleClose() {
        setOpenModal(false)
    }

    return (
        <Modal
            title='Add Education'
            open={openModal}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            Content=
            {
                <div className='form'>
                    <div className='h-2'></div>
                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>School</p>
                        <input id='School-ced' type="text" className='text-input white-bg' placeholder='Ex: Binus University' />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Degree</p>
                        <input id='Degree-ced' type="text" className='text-input white-bg' placeholder="Ex: Bachelor's" />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Field of Study</p>
                        <input id='StudyField-ced' type="text" className='text-input white-bg' placeholder="Ex: Computer Science" />
                    </div>

                    <div className='w-full flex-row space-between mb-20'>
                        <p className='text-black text-s'>Start Year</p>
                        <input type="number" id='StartDate-ced' className='white-bg text-black text-s border-sering-pake' placeholder='2020' />
                    </div>

                    <div className='w-full flex-row space-between mb-20'>
                        <p className='text-black text-s'>End Year</p>
                        <input type="number" id='EndDate-ced' className='white-bg text-black text-s border-sering-pake' placeholder='2022' />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Grade</p>
                        <input id='Grade-ced' type="text" className='text-input white-bg' placeholder="" />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Activities</p>
                        <input id='Activities-ced' type="text" className='text-input white-bg' placeholder="Ex: Voleyball, Basketball" />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-black text-s'>Description</p>
                        <input id='Description-ced' type="text" className='text-input white-bg' placeholder="" />
                    </div>

                    {/* <div className='w-full flex-row space-evenly'>
                        <button onClick={handleSubmit} className='blue-button-smaller text-white'>Save</button>
                        <button onClick={handleClose} className='red-button-smaller text-white'>Cancel</button>
                    </div> */}
                </div>
            }
        />
    )
}