import React from 'react'
import '../LoadingOverlay/loading.scss'
import { HiX } from "react-icons/hi";

interface Modal {
    open: boolean,
    handleClose: React.MouseEventHandler,
    handleSubmit: React.MouseEventHandler,
    Content?: React.ReactNode,
    title: string
}

export default function Modal({ open, handleClose, Content, title }: Modal) {
    return (
        <React.Fragment>
            <div className={`lightbox ${open ? "" : "hide-lightbox"}`} onClick={handleClose} />
            {open &&
                <div className='modal'>
                    <div className='header'>
                        <div className='title'>{title}</div>
                        <HiX className='icon' size={28} onClick={handleClose} />
                    </div>
                    <div className='content'>
                        {Content}
                        {/* <Content /> */}
                    </div>
                    <div className='footer'>
                        <div className='btn-ghost'>
                            <div className='bg'></div>
                            <div className='text'>Discard</div>
                        </div>
                        <div className='w-2'></div>
                        <div className='btn-primary'>
                            <div className='bg'></div>
                            <div className='text'>Save</div>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
