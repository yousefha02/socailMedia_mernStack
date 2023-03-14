import { Box, Typography,styled, Grid } from '@mui/material'
import React from 'react'

const Image = styled("img")({
    width:"100%",
    borderRadius:"8px"
})

export default function ProfilePhotos() {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Image 
                    src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
                </Grid>
                <Grid item xs={6}>
                    <Image 
                    src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
                </Grid>
                <Grid item xs={6}>
                    <Image 
                    src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
                </Grid>
                <Grid item xs={6}>
                    <Image 
                    src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
                </Grid>
            </Grid>
        </Box>
    )
}
