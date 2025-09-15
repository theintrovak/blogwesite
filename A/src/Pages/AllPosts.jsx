import React, { useEffect, useState } from 'react'
import { Container, Card } from '../Components/index'
import services from '../Appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => { }, [])
    services.getPosts([]).then((post) => {
        if (post) {
            setPosts(post.documents)
        }
    })
    return (
        <div>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id} >
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts