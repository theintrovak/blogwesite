import React from 'react'
import services from '../Appwrite/config'
import { Link } from 'react-router-dom'


function Card({ $id, title, featuredImage }) {
    const getFilePreview = featuredImage ? services.getFilePreview(featuredImage) : null
    return (
        <Link to={`/post/${encodeURIComponent($id)}`} >
            <div className='w-auto bg-gray-100 rounded-xl p-4'>
                <div className='w-auto flex justify-center mb-4'>
                    <img src={getFilePreview} alt="img" />
                </div>
                <div>{title}</div>
            </div>
        </Link>
    )
}

export default Card