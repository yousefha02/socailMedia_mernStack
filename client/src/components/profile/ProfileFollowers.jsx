import { Box, Typography } from '@mui/material'
import React from 'react'
import { useFollowers } from '../../hooks/useFollowers'
import UserBox from '../UserBox'

export default function ProfileFollowers({userId}) {
    const {data,isLoading} = useFollowers(userId)
    
    return (
        <Box>
            {
                !isLoading?
                ""
                :
                {
                    
                }
            }
        </Box>
    )
}
