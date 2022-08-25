import { useAuth } from '../../hooks/useAuth'
import Dropdown from './Dropdown'

export default function Avatar() {
    const { user } = useAuth()

    return (
        <div className='nav-item' tabIndex={1}>
            <div className='bg'></div>
            <div className='avatar content'>
                <img src={user.photoprofile} className='image'></img>
                <div className='name'>{user.name}</div>
            </div>
            <Dropdown />
        </div>
    )
}
