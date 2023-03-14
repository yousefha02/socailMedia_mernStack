import React from 'react'
import Layout from '../components/Layout'
import Post from '../components/Post'
import SharePost from '../components/SharePost'

export default function Home() {
    return (
        <Layout>
            <SharePost/>
            <Post/>
            <Post/>
            <Post/>
        </Layout>
    )
}
