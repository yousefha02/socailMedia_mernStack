import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useTimelines } from '../hooks/useTimelines'
import PostSkelton from '../Skeleton/PostSkelton'
import Post from './Post'

export default function TimeLinePosts({newPost}) {
    const {user,token} = useSelector((state)=>state.user)
    const {data,isLoading} = useTimelines(user?._id,token);
    const [posts , setPosts] = useState([]);
    // const posts = data?.sort((a,b)=> Date.parse(b.createdAt) - Date.parse(a.createdAt));

    useEffect(()=>{
        setPosts(data?.sort((a,b)=> Date.parse(b.createdAt) - Date.parse(a.createdAt)));
    },[data]);

    useEffect(()=>{
        newPost && setPosts(pre=>[newPost , ...pre])
    },[newPost])

    

    return (
        <Paper sx={{padding:"20px",marginY:"20px"}}>
            {
                !isLoading?
                posts?.length>0&&
                posts.map((post,index)=><Post post={post} key={post._id+'qw1'}/>)
                :
                <>
                <PostSkelton/>
                <PostSkelton/>
                </>
            }
        </Paper>
    )
}
