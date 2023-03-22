import React from 'react'
import Layout from '../components/Layout'
import Post from '../components/Post'
import SharePost from '../components/SharePost'
import TimeLinePosts from '../components/TimeLinePosts'

export default function Home() {
    return (
        <Layout>
            <SharePost/>
            <TimeLinePosts/>
        </Layout>
    )
}
