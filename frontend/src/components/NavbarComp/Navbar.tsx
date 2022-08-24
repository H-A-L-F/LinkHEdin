import React from 'react'
import { HiSearch, HiHome, HiUserGroup, HiBriefcase, HiChatAlt, HiBell } from "react-icons/hi";
import './navbar.scss'
import NavbarLink from './NavbarLink';
import linkedinlogo from '../../assets/LinkedInIcon.png'

export default function Navbar() {

    function handleLogout() {

    }

    return (
        <div className="header">
            <div className="header__left">
                <img src={linkedinlogo} />

                <div className="header__search">
                    <HiSearch />
                    <input className='text-base-content' placeholder="Search" type="text" />
                </div>
            </div>

            <div className="header__right">
                <NavbarLink Icon={HiHome} title="Home" />
                <NavbarLink Icon={HiUserGroup} title="My Network" />
                <NavbarLink Icon={HiBriefcase} title="Jobs" />
                <NavbarLink Icon={HiChatAlt} title="Messages" />
                <NavbarLink Icon={HiBell} title="Notifications" />
                <NavbarLink avatar={true} title="me" onClick={handleLogout} />
            </div>
        </div>
    )
}
