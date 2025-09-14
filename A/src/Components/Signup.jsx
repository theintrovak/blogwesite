import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { login } from '../Store/authSlice'
import { Input, Button, Logo } from './index'
import { useDispatch } from 'react-redux'
import authservice from '../Appwrite/Auth'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const handleSignup = async (data) => {
        setError("")
        try {
            const session = await authservice.signup(data)
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
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-2 text-center text-base text-red-600">{error}
                </p>}
                <form onSubmit={handleSubmit(handleSignup)} className="mt-8">
                    <Input label="Name" {...register("name")} />
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
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,64}$/,
                            message: "Password is Invalid"
                        }
                    })} className='border border-gray-300 rounded-md p-2 w-full' />
                    <Button type="submit" className='w-full bg-blue-500 hover:bg-blue-600' children={"Sign Up"} />
                </form>
            </div>
        </div>
    )
}

export default Signup