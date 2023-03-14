import { Paper,styled,Box, Avatar, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfilePosts from '../components/profile/ProfilePosts';
import ProfileAbout from '../components/profile/ProfileAbout';
import ProfileFolloweing from '../components/profile/ProfileFolloweing';
import ProfileFollowers from '../components/profile/ProfileFollowers';
import ProfilePhotos from '../components/profile/ProfilePhotos';

const CoverImage = styled("img")({
    width:"100%",
    height:"200px"
})

export default function Profile() {

    /** handle tabs */
    const [value, setValue] =  useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Paper>
                <CoverImage src="https://hips.hearstapps.com/hmg-prod/images/champagne-beach-espiritu-santo-island-vanuatu-royalty-free-image-1655672510.jpg?crop=1.00xw:0.755xh;0,0.173xh&resize=1200:*"/>
                <Box sx={{paddingX:"20px"}}>
                    <Box sx={{display:"flex",alignItems:"center",columnGap:"16px"}}>
                        <Avatar src="https://mui.com/static/images/avatar/2.jpg" sx={{width:"120px",height:"120px",marginTop:"-30px"}}/>
                        <Box>
                            <Typography sx={{fontSize:"24px",fontWeight:"600"}}>Yousef Abohani</Typography>
                            <Typography sx={{color:"#747579",fontSize:"15px"}}>Gaza, Palestine</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab sx={{textTransform:"capitalize"}} label="Posts" value="1" />
                                <Tab sx={{textTransform:"capitalize"}} label="About" value="2" />
                                <Tab sx={{textTransform:"capitalize"}} label="Followings" value="3" />
                                <Tab sx={{textTransform:"capitalize"}} label="Followers" value="4" />
                                <Tab sx={{textTransform:"capitalize"}} label="Photos" value="5" />
                            </TabList>
                            </Box>
                            <TabPanel value="1"><ProfilePosts/></TabPanel>
                            <TabPanel value="2"><ProfileAbout/></TabPanel>
                            <TabPanel value="3"><ProfileFolloweing/></TabPanel>
                            <TabPanel value="4"><ProfileFollowers/></TabPanel>
                            <TabPanel value="5"><ProfilePhotos/></TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Paper>
        </Layout>
    )
}
