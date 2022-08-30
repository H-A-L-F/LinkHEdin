import { ApolloClient, ApolloQueryResult } from '@apollo/client'
import { toastError } from '../../config/toast';
import { useBackEnd } from '../../hooks/useBackEnd'
import Modal from '../Modal/Modal'
import { EducationInterface } from './EducationInterface';

interface EducationModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    uid: string,
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
    ed?: EducationInterface,
    isUser: boolean
}

export default function EducationModal({ openModal, setOpenModal, uid, refetch, ed, isUser }: EducationModalInterface) {
    const { addEducation, updateEducation } = useBackEnd()

    async function handleSubmit() {
        const school = (document.getElementById("School-ced") as HTMLInputElement).value
        const degree = (document.getElementById("Degree-ced") as HTMLInputElement).value
        const studyField = (document.getElementById("StudyField-ced") as HTMLInputElement).value
        const startDate = (document.getElementById("StartDate-ced") as HTMLInputElement).value
        const endDate = (document.getElementById("EndDate-ced") as HTMLInputElement).value
        const grade = parseFloat((document.getElementById("Grade-ced") as HTMLInputElement).value)
        const activities = (document.getElementById("Activities-ced") as HTMLInputElement).value
        const description = (document.getElementById("Description-ced") as HTMLInputElement).value

        if (!validateInput(school, degree, studyField, startDate, endDate, grade, activities, description)) return

        try {
            const resAdd = await addEducation(uid, school, degree, studyField, startDate, endDate, grade, activities, description)
            refetch({ UserID: uid })
        } catch (err: any) {
            toastError(err)
        }

        handleClose()
    }

    async function handleEdit(id: string) {
        const school = (document.getElementById("School-uded") as HTMLInputElement).value
        const degree = (document.getElementById("Degree-uded") as HTMLInputElement).value
        const studyField = (document.getElementById("StudyField-uded") as HTMLInputElement).value
        const startDate = (document.getElementById("StartDate-uded") as HTMLInputElement).value
        const endDate = (document.getElementById("EndDate-uded") as HTMLInputElement).value
        const grade = parseFloat((document.getElementById("Grade-uded") as HTMLInputElement).value)
        const activities = (document.getElementById("Activities-uded") as HTMLInputElement).value
        const description = (document.getElementById("Description-uded") as HTMLInputElement).value

        if (!validateInput(school, degree, studyField, startDate, endDate, grade, activities, description)) return

        try {
            const resUd = await updateEducation(id, uid, school, degree, studyField, startDate, endDate, grade, activities, description)
            refetch({ UserID: uid })
        } catch (err: any) {
            toastError(err)
        }

        handleClose()
    }

    function validateInput(school: string, degree: string, studyField: string, startDate: string, endDate: string, grade: number, activities: string, description: string) {
        var start: number = +startDate
        var end: number = +endDate
        if (school === "" || degree === "" || studyField === "" || activities === "" || description === "") {
            toastError("Please fill all the fields")
            return false
        }

        if (startDate === undefined || endDate === undefined || grade === undefined) {
            toastError("Please fill all the fields")
            return false
        }

        if (start <= 0 || end <= 0) {
            toastError("Date must atleast be 1")
            return false
        }

        if (end < start) {
            toastError("End date can't be less than start date")
            return false
        }

        return true
    }

    function handleClose() {
        setOpenModal(false)
    }

    if (ed !== undefined) {
        return (
            <Modal
                title='Edit Education'
                open={openModal}
                edit={isUser}
                handleClose={handleClose}
                handleSubmit={() => {
                    handleEdit(ed.ID)
                }}
                Content=
                {
                    <div className='form pr-2'>
                        <div className='h-2'></div>
                        <div className='w-full flex flex-col'>
                            <p className='text-s'>School</p>
                            <input id='School-uded' type="text" className='text-input ' placeholder='Ex: Binus University' defaultValue={ed.School} />
                        </div>

                        <div className='w-full flex flex-col'>
                            <p className='text-s'>Degree</p>
                            <input id='Degree-uded' type="text" className='text-input ' placeholder="Ex: Bachelor's" defaultValue={ed.Degree} />
                        </div>

                        <div className='w-full flex flex-col'>
                            <p className='text-s'>Field of Study</p>
                            <input id='StudyField-uded' type="text" className='text-input ' placeholder="Ex: Computer Science" defaultValue={ed.FieldOfStudy} />
                        </div>

                        <div className='w-full flex flex-row my-4 no-spinner'>
                            <p className='text-s w-20'>Start Year</p>
                            <div className='w-4'></div>
                            <input type="number" id='StartDate-uded' className='num-input bg-base-100 text-s' placeholder='2020' defaultValue={ed.StartDate} />
                        </div>

                        <div className='w-full flex flex-row center-all no-spinner'>
                            <p className='text-s w-20'>End Year</p>
                            <div className='w-4'></div>
                            <input type="number" id='EndDate-uded' className='num-input bg-base-100 text-s' placeholder='2022' defaultValue={ed.EndDate} />
                        </div>

                        <div className='w-full flex flex-col'>
                            <p className='text-s'>Grade</p>
                            <input id='Grade-uded' type="text" className='text-input ' placeholder="" defaultValue={ed.Grade} />
                        </div>

                        <div className='w-full flex flex-col'>
                            <p className='text-s'>Activities</p>
                            <input id='Activities-uded' type="text" className='text-input ' placeholder="Ex: Voleyball, Basketball" defaultValue={ed.Activities} />
                        </div>

                        <div className='w-full flex flex-col'>
                            <p className='text-s'>Description</p>
                            <input id='Description-uded' type="text" className='text-input ' placeholder="" defaultValue={ed.Description} />
                        </div>
                        <div className='h-2'></div>
                    </div>
                }
            />
        )
    }

    return (
        <Modal
            title='Add Education'
            open={openModal}
            edit={isUser}
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