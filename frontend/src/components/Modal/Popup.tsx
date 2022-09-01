import React from 'react'

interface PopupInterface {
    open: boolean,
    handleClose: React.MouseEventHandler,
    Content: React.ReactNode,
}

export default function Popup({ open, handleClose, Content }: PopupInterface) {
    return (
        <React.Fragment>
            <div className={`lightbox ${open ? "" : "hide-lightbox"}`} onClick={handleClose} />
            {open &&
                <div className='modal'>
                    <div className='content'>
                        {Content}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
