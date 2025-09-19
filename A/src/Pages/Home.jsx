import React, { useEffect, useState } from 'react'
import services from '../Appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@/Components'
function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state?.auth?.status)
    useEffect(() => {
        services.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])
    return (
        <Container>
            <div className="min-h-screen flex flex-col items-center justify-center  px-8 py-20">

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                    Welcome to SNAZAPEX
                </h1>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {/* Card 1 */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Fast</h2>
                        <p className="text-gray-600">
                            Optimized performance with minimal setup.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Responsive</h2>
                        <p className="text-gray-600">
                            Looks great on all devices, from mobile to desktop.
                        </p>
                    </div>


                    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                        <h2 className="text-xl font-semibold mb-2">Customizable</h2>
                        <p className="text-gray-600">
                            Easily styled with Tailwind’s utility-first classes.
                        </p>
                    </div>
                </div>


                <button className="mt-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-3 transition-all"
                    onClick={() => authStatus ? navigate("/all-posts") : navigate("/login")}
                >
                    Get Started
                </button>
            </div>
        </Container>
    )
}

export default Home