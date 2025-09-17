import React from 'react'
import { Container, Logoutbtn, Logo } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
    const authStatus = useSelector((state) => state?.auth?.status);
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
            active: authStatus

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

        <header className='bg-gray-900  border-none '>

            <div className='flex items-center justify-between py-4'>
                <Link to='/' className='text-white  hover:text-gray-400' ><Logo /></Link>
                <nav className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-4'>

                        <div className='flex items-center'>
                            <ul className='flex items-center'>
                                {
                                    navitems.map((item) =>
                                        (item.active) ? <li key={item.name} className='text-gray-200 py-3 px-3  bg-amber-400 hover:bg-amber-600 rounded-2xl flex mx-1 '>
                                            <button className='text-white hover:text-gray-400 ' onClick={() => navigate(item.slug)} >
                                                {item.name}</button></li> : null
                                    )

                                }
                                {authStatus && <li><Logoutbtn /></li>}

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </header>
    )
}

export default Header