import { ApolloClient, ApolloQueryResult } from '@apollo/client'
import { useBackEnd } from '../../hooks/useBackEnd'
import Modal from '../Modal/Modal'

interface EducationModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    uid: string,
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
}

export default function EducationModal({ openModal, setOpenModal, uid, refetch }: EducationModalInterface) {
    const { addEducation } = useBackEnd()

    function handleSubmit() {
        const school = (document.getElementById("School-ced") as HTMLInputElement).value
        const degree = (document.getElementById("Degree-ced") as HTMLInputElement).value
        const studyField = (document.getElementById("StudyField-ced") as HTMLInputElement).value
        const startDate = (document.getElementById("StartDate-ced") as HTMLInputElement).value
        const endDate = (document.getElementById("EndDate-ced") as HTMLInputElement).value
        const grade = parseFloat((document.getElementById("Grade-ced") as HTMLInputElement).value)
        const activities = (document.getElementById("Activities-ced") as HTMLInputElement).value
        const description = (document.getElementById("Description-ced") as HTMLInputElement).value

        addEducation(uid, school, degree, studyField, startDate, endDate, grade, activities, description)
        refetch({ UserID: uid })

        handleClose()
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
                <div className='form pr-2'>
                    <div className='h-2'></div>
                    <div className='w-full flex flex-col'>
                        <p className='text-s'>School</p>
                        <input id='School-ced' type="text" className='text-input ' placeholder='Ex: Binus University' />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Degree</p>
                        <input id='Degree-ced' type="text" className='text-input ' placeholder="Ex: Bachelor's" />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Field of Study</p>
                        <input id='StudyField-ced' type="text" className='text-input ' placeholder="Ex: Computer Science" />
                    </div>

                    <div className='w-full flex flex-row my-4 no-spinner'>
                        <p className='text-s w-20'>Start Year</p>
                        <div className='w-4'></div>
                        <input type="number" id='StartDate-ced' className='num-input bg-base-100 text-s' placeholder='2020' defaultValue={2022} />
                    </div>

                    <div className='w-full flex flex-row center-all no-spinner'>
                        <p className='text-s w-20'>End Year</p>
                        <div className='w-4'></div>
                        <input type="number" id='EndDate-ced' className='num-input bg-base-100 text-s' placeholder='2022' defaultValue={2022} />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Grade</p>
                        <input id='Grade-ced' type="text" className='text-input ' placeholder="" />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Activities</p>
                        <input id='Activities-ced' type="text" className='text-input ' placeholder="Ex: Voleyball, Basketball" />
                    </div>

                    <div className='w-full flex flex-col'>
                        <p className='text-s'>Description</p>
                        <input id='Description-ced' type="text" className='text-input ' placeholder="" />
                    </div>
                    <div className='h-2'></div>
                </div>
            }
        />
    )
}