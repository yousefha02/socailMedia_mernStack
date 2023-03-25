import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout'
import Post from '../components/Post'
import {useSavePosts} from '../hooks/useSavePosts'
import PostSkelton from '../Skeleton/PostSkelton'

export default function SavePosts() {
    const {token} = useSelector((state)=>state.user)
    const {data,isLoading} = useSavePosts(token);
    const [posts , setPosts] = useState([]);

    useEffect(()=>{
        setPosts(data?.posts);
    },[data]);

    const filterPosts = (_id) => {
        setPosts(pre => pre.filter(post=>post.postId._id != _id));
    }

    return (
        <Layout>
            {
                isLoading?
                <>
                    <PostSkelton/>
                    <PostSkelton/>
                </>
                :
                posts?.length>0&&posts?.map((post,index)=>
                {
                    return <Post post={post.postId} filterPosts={filterPosts} savePage={true}/>
                })
            }
        </Layout>
    )
}
