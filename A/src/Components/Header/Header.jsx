import React from 'react'
import { Container, Logoutbtn, Logo } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
    const authStatus = useSelector((state) => state.auth.status);
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
            name: 'all Post',
            slug: '/posts',
            active: authStatus
        }, {
            name: 'login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'logout',
            slug: '/logout',
            active: authStatus
        }, {
            name: 'singup',
            slug: '/singup',
            active: !authStatus
        }
    ]
    return (

        <header className='bg-gray-900'>
            <Container>
                <div className='flex items-center justify-between py-4'>
                    <Logo />
                    <nav className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-4'>
                            <Link to='/' className='text-white hover:text-gray-400' ><Logo /></Link>
                            <div className='flex items-center'>
                                <ul className='flex items-center'>
                                    {
                                        navitems.map((item) =>
                                            (item.active) ? <li key={item.name} className='text-gray-200'>
                                                <button className='text-white hover:text-gray-400' onClick={() => navigate(item.slug)} >
                                                    {item.name}</button></li> : null
                                        )

                                    }
                                    {authStatus && <li><Logoutbtn /></li>}

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header