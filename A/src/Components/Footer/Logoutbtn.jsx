import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice'
import authservice from '../../Appwrite/Auth'
import { Button, buttonVariants } from '../ui/button'

function Logoutbtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        Button({ onClick: logoutHandler, className: buttonVariants({ variant: "destructive" }), children: "Logout" })
    )
}

export default Logoutbtn