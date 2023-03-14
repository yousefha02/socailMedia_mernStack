import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

export default function UserBox() {
    return (
        <Link to="/user/1">
            <Box sx={{display:"flex",alignItems:"center",columnGap:"10px",marginY:"16px"}}>
                <Avatar src="https://mui.com/static/images/avatar/2.jpg" sx={{width:"45px",height:"45px"}}/>
                <Typography sx={{fontSize:"15px"}}>Yousef abohani</Typography>
            </Box>
        </Link>
    )
}
