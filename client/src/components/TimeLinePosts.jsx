import { Paper } from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'
import { useTimelines } from '../hooks/useTimelines'
import PostSkelton from '../Skeleton/PostSkelton'
import Post from './Post'

export default function TimeLinePosts() {
    const {user,token} = useSelector((state)=>state.user)
    const {data,isLoading} = useTimelines(user?._id,token)
    const posts = data?.sort((a,b)=> Date.parse(b.createdAt) - Date.parse(a.createdAt))

    return (
        <Paper sx={{padding:"20px",marginY:"20px"}}>
            {
                !isLoading?
                posts?.length>0&&
                posts.map((post,index)=><Post post={post} key={index+'qw1'}/>)
                :
                <>
                <PostSkelton/>
                <PostSkelton/>
                </>
            }
        </Paper>
    )
}
