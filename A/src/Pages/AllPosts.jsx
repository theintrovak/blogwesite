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
            <Container >
                <div className='grid overflow-auto  grid-cols-1 grid-rows-2 md:grid-row-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 '>
                    {posts.map((post) => (
                        <div key={post.$id}
                            className='mt-4    h-20 w-20   lg:h-40 lg:w-40 hover:scale-105 transition duration-300 ease-in-out'
                        >
                            <Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts