import { Avatar, Box, Skeleton, Typography } from '@mui/material'
import React from 'react'

export default function UserSkelton({width}) {
    return (
        <Box sx={{display:"flex",alignItems:"center",columnGap:"12px",marginBottom:"26px"}}>
            <Skeleton variant="circular">
                <Avatar sx={{width:"65px",height:"65px"}}/>
            </Skeleton>
            <Skeleton variant="rectangular" width={width} height="20px" sx={{borderRadius:"8px"}}>
                <Typography>.</Typography>
            </Skeleton>
        </Box>
    )
}
