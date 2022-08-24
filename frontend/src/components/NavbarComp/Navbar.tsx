import React from 'react'
import { HiSearch, HiHome, HiUserGroup, HiBriefcase, HiChatAlt, HiBell } from "react-icons/hi";
import NavbarLink from './NavbarLink';
import linkedinlogo from '../../assets/LinkedInIcon.png'
import { ROUTE } from '../../config/constants';
import Avatar from './Avatar';
import '../../styles/index.scss'
import './navbar.scss'
import NavbarIcon from './NavbarIcon';

export default function Navbar() {

    function handleLogout() {

    }

    return (
        // <div className="header">
        //     <div className="header__left">
        //         <img src={linkedinlogo} />

        //         <div className="header__search">
        //             <HiSearch />
        //             <input className='text-base-content' placeholder="Search" type="text" />
        //         </div>
        //     </div>

        //     <div className="header__right">
        //         <NavbarLink Icon={HiHome} title="Home" />
        //         <NavbarLink Icon={HiUserGroup} title="My Network" />
        //         <NavbarLink Icon={HiBriefcase} title="Jobs" />
        //         <NavbarLink Icon={HiChatAlt} title="Messages" />
        //         <NavbarLink Icon={HiBell} title="Notifications" />
        //         <NavbarLink avatar={true} title="me" onClick={handleLogout} />
        //     </div>
        // </div>
        <div className='nav'>
            <div className="header__left">
                <img src={linkedinlogo} />

                <div className="header__search">
                    <HiSearch />
                    <input className='text-base-content' placeholder="Search" type="text" />
                </div>
            </div>

            <div className='nav-item--container'>
                <NavbarLink route={ROUTE.ROUTE_HOME} Icon={HiHome} title={"Home"} />
                <NavbarLink route={ROUTE.ROUTE_MYNETWORK} Icon={HiUserGroup} title={"My Network"} />
                <NavbarLink route={ROUTE.ROUTE_JOBS} Icon={HiBriefcase} title={"Jobs"} />
                <NavbarLink route={ROUTE.ROUTE_MESSAGES} Icon={HiChatAlt} title={"Messages"} />
                <NavbarLink route={ROUTE.ROUTE_NOTIFICATIONS} Icon={HiBell} title={"Notifications"} />
                
                <Avatar />
            </div>
        </div>
    )
}
