import React from 'react'
import { HiPencil } from "react-icons/hi";
import { toastError } from '../../config/toast';
import { useAuth } from '../../hooks/useAuth';
import { useBackEnd } from '../../hooks/useBackEnd';
import IconButton from '../Buttons/IconButton';

export default function EditProfileBg() {
    const {user} = useAuth()
    const {setBgPict} = useBackEnd()

    function imageOnChange(e: any) {
        if (!validateFile(e.target)) return
        const img = e.target.files[0]
        setBgPict(img, user.id)
    }

    function validateFile(form: any) {
        if (form.files.length == 0) {
            toastError("Please choose a picture")
            return false
        }
        return true;
    }

    return (
        <div className='profile-bg'>
            <img src={user.BgPhotoProfile} alt="" className='image' />
            <label htmlFor="input-file" className='edit'>
                <IconButton Icon={HiPencil} />
            </label>
            <input
                onChange={imageOnChange}
                className="none"
                id="input-file"
                type="file"
                hidden={true}
            />
        </div>
    )
}
