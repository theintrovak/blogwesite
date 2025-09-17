import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { login } from '../Store/authSlice'
import { Input, Button, Logo } from './index'
import { useDispatch } from 'react-redux'
import authservice from '../Appwrite/Auth'
import { useForm } from 'react-hook-form'

function LoginBox() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, setError] = useState("")
    const handleLogin = async (data) => {
        setError("")
        try {
            const session = await authservice.login(data)
            if (session) {
                const userData = await authservice.getCurrentUser()
                if (userData) {
                    dispatch(login({ userData }))
                    navigate("/")
                }
            }
        } catch (err) {
            setError(err?.message || "Something went wrong")

        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='w-full flex justify-center mb-4'>
                    <div className='text-2xl font-bold'>
                        <Logo width='100%' />
                    </div>
                    <h2 className='text-center text-2xl font-bold leading-tight text-gray-900' >Sign In To Your Account</h2>
                    <p className='mt-2 text-center text-base text-black/60'>Don&nbsp;t have an account? <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>Sign Up</Link></p>
                    {error && <span className='text-red-500 mt-8 text-center'>{error}</span>}
                    <form onSubmit={handleSubmit(handleLogin)} className='mt-8 space-y-6' noValidate>
                        <div className='w-full'>
                            <Input
                                type="email"
                                placeholder='Enter your email'
                                label='Email: '
                                {...register("email",
                                    {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email Address is Invalid"
                                        }
                                    }
                                )
                                }
                                className='border border-gray-300 rounded-md p-2 w-full' />
                            <Input type="password" placeholder='Enter your password' label='Password: ' {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: "Password is Invalid"
                                }
                            })} className='border border-gray-300 rounded-md p-2 w-full' />
                            <Button type='submit' disabled={isSubmitting} children={(isSubmitting) ? "Loading..." : "Login"} />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginBox