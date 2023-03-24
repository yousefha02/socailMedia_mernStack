import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import Post from '../components/Post'
import {useSavePosts} from '../hooks/useSavePosts'
import PostSkelton from '../Skeleton/PostSkelton'

export default function SavePosts() {
    const {token} = useSelector((state)=>state.user)
    const {data,isLoading} = useSavePosts(token)
    console.log(data)
    return (
        <Layout>
            {
                isLoading?
                <>
                    <PostSkelton/>
                    <PostSkelton/>
                </>
                :
                data.posts.length>0&&data.posts.map((post,index)=>
                {
                    return <Post post={post.postId}/>
                })
            }
        </Layout>
    )
}
