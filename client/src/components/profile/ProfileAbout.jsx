import { Box, Typography } from '@mui/material'
import React from 'react'

export default function ProfileAbout({about}) {
    return (
        <Box>
            <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"8px"}}>About Me</Typography>
            <Typography sx={{fontSize:"16px"}}>
                {about}
            </Typography>
        </Box>
    )
}
