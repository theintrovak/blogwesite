import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from "lucide-react"
import Logo from '../Logo'




function Header() {
    const authStatus = useSelector((state) => state?.auth?.status);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeslug, setActiveslug] = useState(null)
    const navigate = useNavigate();

    const navitems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'add post',
            slug: '/addpost',
            active: authStatus
        }
        ,
        {
            name: 'about',
            slug: '/about',
            active: authStatus
        },
        {
            name: 'contact',
            slug: '/contact',
            active: true

        },
        {
            name: 'all-posts',
            slug: '/all-posts',
            active: authStatus
        }, {
            name: 'login',
            slug: '/login',
            active: !authStatus
        },
        , {
            name: 'SignUp',
            slug: '/SignUp',
            active: !authStatus
        }
    ]
    return (

        <header className="w-full border-none sticky top-0 bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

                {/* Logo / Brand */}
                <div>
                    <Logo />
                </div>

                {/* Desktop Nav */}

                <ul className='hidden md:flex space-x-3'>
                    {
                        navitems.map((item) => (
                            (item.active) ?
                                <li key={item.slug}>
                                    <Button onClick={() => { setActiveslug(item.slug); navigate(item.slug) }} variant="link" className={(item.slug === activeslug) ? "block py-1 px-3 rounded  bg-[#10A4B0] pb" : "block py-1 px-3rounded bg-[#ffffff] hover:bg-[#10A4B0]"}>
                                        {item.name}
                                    </Button>
                                </li> : null
                        ))
                    }

                </ul>


                {/* Right Section */}
                <div className="hidden md:flex">
                    <Button variant="default"
                        onClick={(authStatus) ? () => navigate("/addpost") : () => navigate("/login")}>Get Started</Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <ul>
                    {
                        navitems.map((item) => (
                            (item.active) ?
                                <li key={item.slug}>
                                    <Button onClick={() => { setActiveslug(item.slug); navigate(item.slug) }} variant="link" className={(item.slug === activeslug) ? "block py-1 px-3 rounded  bg-[#10A4B0] pb" : "block py-1 px-3rounded bg-[#ffffff] hover:bg-[#10A4B0]"}>
                                        {item.name}
                                    </Button>
                                </li> : null

                        ))
                    }

                </ul>
            )}
        </header>

    )
}

export default Header