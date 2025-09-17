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
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, setError] = useState("")
    const handleSignup = async (data) => {
        setError("")
        try {
            const user = await authservice.createAccount({
                email: data.email,
                password: data.password,
                name: data.name,
            })
            console.log("user means account created " + user);

            if (user) {
                const userData = await authservice.getCurrentUser()
                console.log("user data means account created and current user is fetched" + userData);
                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                    console.log("login successful");
                }
            }
        } catch (err) {
            setError(err?.message || "Something went wrong")
            console.log("error in login");

        }
    }
    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:py-16 bg-gradient-to-t from-[#ff0606] to-[#101828] ">
            <div className={`mx-auto w-full max-w-lg bg-[#ffffff33] rounded-xl p-10 border border-black/10`}>
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
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-2 text-center text-base text-red-600">{error}
                </p>}
                <form onSubmit={handleSubmit(handleSignup)} className="mt-8">
                    <Input label="Name"
                        placeholder="Enter your name"
                        {...register("name")} />
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
                    <Button type="submit" className='w-full mt-5  hover:bg-amber-600' disabled={isSubmitting} children={(isSubmitting) ? "Signing Up..." : "Sign Up"} />
                </form>
            </div>
        </div>
    )
}

export default Signup