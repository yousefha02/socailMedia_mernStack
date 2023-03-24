import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFollowers } from '../../hooks/useFollowers'
import UserSkelton from '../../Skeleton/UserSkelton'
import UserBox from '../UserBox'

export default function ProfileFollowers({userId}) {
    const {data,isLoading} = useFollowers(userId)
    const {user : currentUser} = useSelector((state)=>state.user)
    
    return (
        <Box>
            {
                isLoading?
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserSkelton width={"100%"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserSkelton width={"100%"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserSkelton width={"100%"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserSkelton width={"100%"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserSkelton width={"100%"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <UserSkelton width={"100%"}/>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={2}>
                    {
                        data?.followers.map(user=>{
                            return <Grid key={user._id} item xs={12} sm={6} md={4}>
                                <UserBox user={user.userId} you={currentUser._id}/>
                            </Grid>
                        })
                    }
                </Grid>
            }
        </Box>
    )
}
