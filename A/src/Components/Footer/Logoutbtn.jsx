import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice'
import authservice from '../../Appwrite/Auth'

function Logoutbtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            onClick={logoutHandler}
            className='bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded'
        >Logout</button>
    )
}

export default Logoutbtn