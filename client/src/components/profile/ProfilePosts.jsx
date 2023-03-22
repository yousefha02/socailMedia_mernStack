import { Box } from '@mui/material'
import React from 'react'
import Post from '../Post'
import {useUserPosts} from '../../hooks/useUserPosts'
import {useSelector} from 'react-redux'
import PostSkelton from '../../Skeleton/PostSkelton'

export default function ProfilePosts({userId}) {
    const {token} = useSelector((state)=>state.user)
    const {data,isLoading} = useUserPosts(token,userId)

    return (
        <Box>
            {
                isLoading?
                <>
                    <PostSkelton/>
                    <PostSkelton/>
                </>
                :
                data?.posts?.length>0&&
                data.posts.map((post,index)=>
                {
                    return <Post key={index+"z1"} post={post}/>
                })
            }
        </Box>
    )
}
