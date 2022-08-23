import mainLogo from '../assets/mainLogo.png'

export default function Verification() {
    function handleVerfication(e: any) {
        e.preventDefault()
    }

    return (
        <div className='full-screen center-all'>
            <div className='flex flex-col center-all w-fit h-fit px-4'>
                <img className='w-72 mb-4' alt='LinkHEdIn' src={mainLogo} />
                <form action="" onSubmit={handleVerfication}>
                    <div className='flex flex-col w-96 py-4 center-all'>
                        <div className='form-space-y'></div>
                        <input className='text-input' type={"text"} placeholder={"Code"} name={"code"} />
                        <div className='form-space-y'></div>
                        <button className='btn btn-primary'>Activate</button>
                    </div>
                </form>
            </div>
        </div>
    )
}