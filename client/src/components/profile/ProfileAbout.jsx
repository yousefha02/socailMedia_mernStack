import { Box, Typography } from '@mui/material'
import React from 'react'

export default function ProfileAbout() {
    return (
        <Box>
            <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"8px"}}>About Me</Typography>
            <Typography sx={{fontSize:"16px"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </Typography>
        </Box>
    )
}
