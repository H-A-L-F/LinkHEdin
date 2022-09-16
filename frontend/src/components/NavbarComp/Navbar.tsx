import React, { createRef } from 'react'
import { HiSearch, HiHome, HiUserGroup, HiBriefcase, HiChatAlt, HiBell } from "react-icons/hi";
import NavbarLink from './NavbarLink';
import linkedinlogo from '../../assets/LinkedInIcon.png'
import { ROUTE } from '../../config/constants';
import Avatar from './Avatar';
import '../../styles/index.scss'
import './navbar.scss'
import ThemeToggle from '../ThemeSwitch/ThemeToggle';
import { useBackEnd } from '../../hooks/useBackEnd';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { refetchUser } = useBackEnd()
    const navigate = useNavigate()
    const searchRef = createRef<HTMLInputElement>()

    function handleNetwork() {
        refetchUser()
    }

    function handleEnter(event: any) {
        if (event.key === 'Enter') handleSearch()
    }

    function handleSearch() {
        if (searchRef.current === null) return
        const input = searchRef.current.value
        navigate("/search/" + input)
    }

    return (
        <div className='nav'>
            <div className="header__left">
                <img src={linkedinlogo} />

                <div className="header__search">
                    <HiSearch />
                    <input className='text-base-content' placeholder="Search" type="text" ref={searchRef} onKeyDown={handleEnter} />
                </div>
                <div className='w-6'></div>
                <ThemeToggle />
            </div>

            <div className='nav-item--container'>
                <NavbarLink route={ROUTE.ROUTE_HOME} Icon={HiHome} title={"Home"} />
                <div className='w-4'></div>
                <div onClick={handleNetwork}>
                    <NavbarLink route={ROUTE.ROUTE_MYNETWORK} Icon={HiUserGroup} title={"My Network"} />
                </div>
                <div className='w-4'></div>
                <NavbarLink route={ROUTE.ROUTE_JOBS} Icon={HiBriefcase} title={"Jobs"} />
                <div className='w-4'></div>
                <NavbarLink route={ROUTE.ROUTE_MESSAGES} Icon={HiChatAlt} title={"Messages"} />
                <div className='w-4'></div>
                <NavbarLink route={ROUTE.ROUTE_NOTIFICATIONS} Icon={HiBell} title={"Notifications"} />

                <Avatar />
            </div>
        </div>
    )
}
