import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../Components/index'
import services from '../Appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            services.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])
        (post) ? (<div>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>) : null
}
export default EditPost