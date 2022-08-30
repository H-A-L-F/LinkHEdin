import React from 'react'
import { HiPencil } from "react-icons/hi";
import { toastError } from '../../config/toast';
import { useAuth } from '../../hooks/useAuth';
import { useBackEnd } from '../../hooks/useBackEnd';
import { useUserProfile } from '../../pages/Profile';
import IconButton from '../Buttons/IconButton';

export default function EditProfileBg() {
    const { user } = useAuth()
    const { currUser, isUser } = useUserProfile()
    const { setBgPict } = useBackEnd()

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
            <img src={currUser.BgPhotoProfile === "https://picsum.photos/seed/picsum/200/300" ? "" : currUser.BgPhotoProfile} alt="" className='image' />
            {isUser &&
                <div>
                    <label htmlFor="input-file-bg" className='edit'>
                        <IconButton Icon={HiPencil} />
                    </label>
                    <input
                        onChange={imageOnChange}
                        className="none"
                        id="input-file-bg"
                        type="file"
                        hidden={true}
                    />
                </div>
            }
        </div>
    )
}
