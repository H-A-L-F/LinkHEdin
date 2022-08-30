import { ApolloQueryResult } from '@apollo/client';
import React, { useState } from 'react'
import { toastError } from '../../config/toast';
import { useBackEnd } from '../../hooks/useBackEnd';
import Modal from '../Modal/Modal';
import { ExperienceInterface } from './ExperienceInterface';

interface ExperienceModalInterface {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    uid: string,
    refetch: (variables?: Partial<{
        UserID: string | undefined;
    }> | undefined) => Promise<ApolloQueryResult<any>>,
    ex?: ExperienceInterface,
    isUser: boolean
}

enum EMPLOYMENT_TYPE {
    FULL_TIME = "Full Time",
    PART_TIME = "Part Time",
    FREELANCE = "Freelace",
    APPRENTICESHIP = "Apprenticeship",
    CONTRACT = "Contract"
}

export default function ExperienceModal({ openModal, setOpenModal, uid, refetch, ex, isUser }: ExperienceModalInterface) {
    const { addExperience, updateExperience } = useBackEnd()
    const [activeJob, setActiveJob] = useState(false)

    async function handleSubmit() {
        const title = (document.getElementById("Title-cex") as HTMLInputElement).value
        const employmentType = (document.getElementById("EmploymentType-cex") as HTMLInputElement).value
        const companyName = (document.getElementById("CompanyName-cex") as HTMLInputElement).value
        const location = (document.getElementById("Location-cex") as HTMLInputElement).value
        const active = (document.getElementById("Active-cex") as HTMLInputElement).checked
        const startYear = (document.getElementById("StartYear-cex") as HTMLInputElement).value
        const endYear = (document.getElementById("EndYear-cex") as HTMLInputElement).value
        const industry = (document.getElementById("Industry-cex") as HTMLInputElement).value
        const description = (document.getElementById("Description-cex") as HTMLInputElement).value

        if (!validateInput(title, employmentType, companyName, location, active, startYear, endYear, industry, description)) return

        try {
            const resAdd = await addExperience(uid, title, employmentType, companyName, location, active, startYear, endYear, industry, description)
            refetch({ UserID: uid })
        } catch (err: any) {
            toastError(err)
        }

        handleClose()
    }

    async function handleEdit(id: string) {
        const title = (document.getElementById("Title-udex") as HTMLInputElement).value
        const employmentType = (document.getElementById("EmploymentType-udex") as HTMLInputElement).value
        const companyName = (document.getElementById("CompanyName-udex") as HTMLInputElement).value
        const location = (document.getElementById("Location-udex") as HTMLInputElement).value
        const active = (document.getElementById("Active-udex") as HTMLInputElement).checked
        const startYear = (document.getElementById("StartYear-udex") as HTMLInputElement).value
        const endYear = (document.getElementById("EndYear-udex") as HTMLInputElement).value
        const industry = (document.getElementById("Industry-udex") as HTMLInputElement).value
        const description = (document.getElementById("Description-udex") as HTMLInputElement).value

        if (!validateInput(title, employmentType, companyName, location, active, startYear, endYear, industry, description)) return

        try {
            const resUd = await updateExperience(id, uid, title, employmentType, companyName, location, active, startYear, endYear, industry, description)
            refetch({ UserID: uid })
        } catch (err: any) {
            toastError(err)
        }

        handleClose()
    }

    function validateInput(title: string, employmentType: string, companyName: string, location: string, active: boolean, startYear: string, endYear: string, industry: string, description: string) {
        var start: number = +startYear
        var end: number = +endYear

        if (title === "" || employmentType === "" || companyName === "" || location === "" || startYear === "" || endYear === "" || industry === "" || description === "") {
            toastError("Please fill all the fields")
            return false
        }

        if (startYear === undefined || endYear === undefined || active === undefined) {
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

    if (ex !== undefined) {
        return (
            <Modal
                title='Edit Experience'
                open={openModal}
                edit={isUser}
                handleClose={handleClose}
                handleSubmit={() => {
                    handleEdit(ex.ID)
                }}
                Content=
                {
                    <div className='form pr-2'>
                        <div className='h-2'></div>
                        <div className='w-full flex-col'>
                            <p className='text-s'>Title</p>
                            <input id='Title-udex' type="text" className='text-input ' placeholder='Ex: Software Engineer' defaultValue={ex.Title} />
                        </div>

                        <div className='w-full flex-col'>
                            <p className='text-s'>Employment Type</p>
                            <select className='text-input ' id="EmploymentType-udex">
                                <option value={EMPLOYMENT_TYPE.FULL_TIME} defaultChecked={ex.EmploymentType === EMPLOYMENT_TYPE.FULL_TIME}>{EMPLOYMENT_TYPE.FULL_TIME}</option>
                                <option value={EMPLOYMENT_TYPE.PART_TIME} defaultChecked={ex.EmploymentType === EMPLOYMENT_TYPE.PART_TIME}>{EMPLOYMENT_TYPE.PART_TIME}</option>
                                <option value={EMPLOYMENT_TYPE.FREELANCE} defaultChecked={ex.EmploymentType === EMPLOYMENT_TYPE.FREELANCE}>{EMPLOYMENT_TYPE.FREELANCE}</option>
                                <option value={EMPLOYMENT_TYPE.APPRENTICESHIP} defaultChecked={ex.EmploymentType === EMPLOYMENT_TYPE.APPRENTICESHIP}>{EMPLOYMENT_TYPE.APPRENTICESHIP}</option>
                                <option value={EMPLOYMENT_TYPE.CONTRACT} defaultChecked={ex.EmploymentType === EMPLOYMENT_TYPE.CONTRACT}>{EMPLOYMENT_TYPE.CONTRACT}</option>
                            </select>
                        </div>

                        <div className='w-full flex-col'>
                            <p className='text-s'>Company Name</p>
                            <input id='CompanyName-udex' type="text" className='text-input ' placeholder="Ex: SLC" defaultValue={ex.CompanyName} />
                        </div>

                        <div className='w-full flex-col'>
                            <p className='text-s'>Location</p>
                            <input id='Location-udex' type="text" className='text-input ' placeholder="Ex: Jakarta, Indonesia" defaultValue={ex.Location} />
                        </div>

                        <div className='w-full flex-row'>
                            <p className='text-s'>This is my current active job</p>
                            <input onClick={() => { setActiveJob((document.getElementById("Active-udex") as HTMLInputElement).checked) }} id='Active-udex' type="checkbox" className='text-input ' defaultChecked={ex.Active} />
                        </div>

                        <div className='w-full flex-row space-between mb-20 no-spinner'>
                            <p className='text-s'>Start Year</p>
                            <input type="number" id='StartYear-udex' className='num-input bg-base-100 text-s' defaultValue={ex.StartYear} />
                        </div>
                        {
                            activeJob ?
                                <div className='w-full flex-row space-between mb-20'>
                                    <p className='text-s'>End Year</p>
                                    <input disabled={activeJob} type="text" id='EndYear-udex' className=' text-s text-input' defaultValue={ex.EndYear} />
                                </div>
                                :
                                <div className='w-full flex-row space-between mb-20 no-spinner'>
                                    <p className='text-s'>End Year</p>
                                    <input type="number" id='EndYear-udex' className='num-input bg-base-100 text-s' defaultValue={ex.EndYear} />
                                </div>
                        }

                        <div className='w-full flex-col'>
                            <p className='text-s'>Industry</p>
                            <input id='Industry-udex' type="text" className='text-input ' placeholder="Ex: Retail" defaultValue={ex.Industry} />
                        </div>

                        <div className='w-full flex-col'>
                            <p className='text-s'>Profile Headline</p>
                            <input id='Description-udex' type="text" className='text-input ' placeholder="" defaultValue={ex.Description} />
                        </div>
                    </div>
                }
            />
        )
    }

    return (
        <Modal
            title='Add Experience'
            open={openModal}
            edit={isUser}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            Content=
            {
                <div className='form pr-2'>
                    <div className='h-2'></div>
                    <div className='w-full flex-col'>
                        <p className='text-s'>Title</p>
                        <input id='Title-cex' type="text" className='text-input ' placeholder='Ex: Software Engineer' />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-s'>Employment Type</p>
                        <select className='text-input ' id="EmploymentType-cex">
                            <option value={EMPLOYMENT_TYPE.FULL_TIME} >{EMPLOYMENT_TYPE.FULL_TIME}</option>
                            <option value={EMPLOYMENT_TYPE.PART_TIME} >{EMPLOYMENT_TYPE.PART_TIME}</option>
                            <option value={EMPLOYMENT_TYPE.FREELANCE} >{EMPLOYMENT_TYPE.FREELANCE}</option>
                            <option value={EMPLOYMENT_TYPE.APPRENTICESHIP} >{EMPLOYMENT_TYPE.APPRENTICESHIP}</option>
                            <option value={EMPLOYMENT_TYPE.CONTRACT} >{EMPLOYMENT_TYPE.CONTRACT}</option>
                        </select>
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-s'>Company Name</p>
                        <input id='CompanyName-cex' type="text" className='text-input ' placeholder="Ex: SLC" />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-s'>Location</p>
                        <input id='Location-cex' type="text" className='text-input ' placeholder="Ex: Jakarta, Indonesia" />
                    </div>

                    <div className='w-full flex-row'>
                        <p className='text-s'>This is my current active job</p>
                        <input onClick={() => { setActiveJob((document.getElementById("Active-cex") as HTMLInputElement).checked) }} id='Active-cex' type="checkbox" className='text-input ' />
                    </div>

                    <div className='w-full flex-row space-between mb-20'>
                        <p className='text-s'>Start Year</p>
                        <input type="number" id='StartYear-cex' className='num-input bg-base-100 text-s' defaultValue={2020} />
                    </div>
                    {
                        activeJob ?
                            <div className='w-full flex-row space-between mb-20'>
                                <p className='text-s'>End Year</p>
                                <input disabled={activeJob} type="text" id='EndYear-cex' className=' text-s text-input' defaultValue="Present" />
                            </div>
                            :
                            <div className='w-full flex-row space-between mb-20'>
                                <p className='text-s'>End Year</p>
                                <input type="number" id='EndYear-cex' className='num-input bg-base-100 text-s' defaultValue={2022} />
                            </div>
                    }

                    <div className='w-full flex-col'>
                        <p className='text-s'>Industry</p>
                        <input id='Industry-cex' type="text" className='text-input ' placeholder="Ex: Retail" />
                    </div>

                    <div className='w-full flex-col'>
                        <p className='text-s'>Profile Headline</p>
                        <input id='Description-cex' type="text" className='text-input ' placeholder="" />
                    </div>
                </div>
            }
        />
    )
}