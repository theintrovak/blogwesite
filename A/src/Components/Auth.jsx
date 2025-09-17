import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state?.auth?.status)
    useEffect(() => {
        console.log(authStatus);

        if (authStatus === undefined || authStatus === null) {
            return;
        }
        if (authentication && authStatus === false) {
            navigate("/login", { replace: true });
        } else if (!authentication && authStatus === true) {
            navigate("/", { replace: true });
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
    return loader ? <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div> : <>{children}</>
}