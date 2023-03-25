import React, { useState } from 'react'
import Layout from '../components/Layout'
import Post from '../components/Post'
import SharePost from '../components/SharePost'
import TimeLinePosts from '../components/TimeLinePosts'

export default function Home() {
    const [newPost , setNewPost] = useState(null);
    return (
        <Layout>
            <SharePost setNewPost={setNewPost}/>
            <TimeLinePosts newPost={newPost}/>
        </Layout>
    )
}
