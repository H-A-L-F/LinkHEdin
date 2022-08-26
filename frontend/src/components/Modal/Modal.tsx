import React from 'react'
import '../LoadingOverlay/loading.scss'

export default function Modal({ open, setOpen, Content }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, Content?: React.ReactNode }) {
    function handleClickOutside() {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <div className={`lightbox ${open ? "" : "hide-lightbox"}`} onClick={handleClickOutside} />
            {open &&
                // <Content className={'modal'}/> 
                <div className='modal'>
                    {Content}
                </div>
            }
        </React.Fragment>
    )
}
