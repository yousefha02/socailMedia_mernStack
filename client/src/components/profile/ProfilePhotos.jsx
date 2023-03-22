import { Box,styled, Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import {useUserPhotos} from '../../hooks/useUserPhotos'

const Image = styled("img")({
    width:"100%",
    borderRadius:"8px",
    height:"300px"
})

export default function ProfilePhotos({userId}) {
    const {token} = useSelector((state)=>state.user)
    const {data,isLoading} = useUserPhotos(token,userId)

    return (
        <Box>
            <Grid container spacing={2}>
                {
                    !isLoading?
                    data?.photos?.length>0&&
                    data.photos.map((photo,index)=>
                    {
                        return(
                            <Grid item xs={6} key={index+'ui1'}>
                                <Image 
                                src={`${process.env.REACT_APP_API}images/${photo.image}`}/>
                            </Grid>
                        )
                    })
                    :
                    ""
                    
                }
            </Grid>
        </Box>
    )
}
