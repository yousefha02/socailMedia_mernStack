import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useFollowings } from '../../hooks/useFollowings'
import UserSkelton from '../../Skeleton/UserSkelton';
import UserBox from '../UserBox';

export default function ProfileFolloweing({userId}) {
    const {data , isLoading} = useFollowings(userId);
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
                        data?.following.map(user=>{
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
