import { Paper,styled,Box, Avatar, Typography, Button,Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useUser} from '../hooks/useUser'
import { deepPurple } from '@mui/material/colors';
import ImageIcon from '@mui/icons-material/Image';
import EditProfile from '../components/profile/EditProfile';
import ChatIcon from '@mui/icons-material/Chat';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    Timestamp,
    or,
} from "firebase/firestore";
import { db } from '../firebase'

const CoverImage = styled("img")({
    width:"100%",
    height:"200px"
})

const Label = styled('label')({
    cursor:"pointer",
    width:"100%",
    display:"flex",
    backgroundColor:"#fefffc"
})

const ProfileLabel = styled('label')({
    cursor:"pointer",
    backgroundColor:"#F0F2F5",
    display:"flex",
    height:"35px",
    width:"35px",
    borderRadius:"50%",
    justifyContent:"center",
    alignItems:"center"
})

export default function Profile() {

    /** handle tabs */
    const [value, setValue] =  useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {id} = useParams()
    const {user,token} = useSelector((state)=>state.user)
    const {data,isLoading} = useUser(id)

    const [coverImage,setCoverImage] = useState()
    const [profileImage,setProfileImage] = useState()

    async function changeCoverImage(image)
    {
        setCoverImage(image)
        const formData = new FormData()
        formData.append('image',image)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}user/change-cover/${user._id}`,{
                method:"POST",
                headers:{
                    "Authorization":token
                },
                body:formData
            })
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
        }   
        catch(err)
        {
            console.log(err)
        }
    }

    async function changeProfileImage(image)
    {
        setProfileImage(image)
        const formData = new FormData()
        formData.append('image',image)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}user/change-profile-image/${user._id}`,{
                method:"POST",
                headers:{
                    "Authorization":token
                },
                body:formData
            })
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
        }   
        catch(err)
        {
            console.log(err)
        }
    }

    const [openEditProfile, setOpenEditProfile] = useState(false);
    
    const handleClickOpen = () => {
        setOpenEditProfile(true);
    };

    const handleClose = () => {
        setOpenEditProfile(false);
    };

    const navigate = useNavigate();
    const handleCreateMessage = async () =>{
        const q = query(collection(db, "chats"), 
        where("members", "in", [[user._id , id]]),
        );
        const res = await getDocs(q);
        console.log(res.empty);
        if(res.empty){
            console.log(res.docs);
            const time = Timestamp.now();
            await addDoc(collection(db, "chats"), { messages: [] , members :[user._id,id],lastmessage:time });
        }
        // navigate(`/messages`);
    }

    return (
        <Layout>
            {
            !isLoading&&
            <Paper>
                <Box sx={{position:"relative"}}>
                    <CoverImage src={!coverImage?`${process.env.REACT_APP_API}images/${data?.user?.coverImage}`:URL.createObjectURL(coverImage)}/>
                    {user._id===id&&
                    <>
                        <Box sx={{position:"absolute",top:"75%",right:"10px"}} htmlFor='image'>
                            <Button variant="contained" color="Gray" sx={{textTransform:"capitalize"}}>
                                <Label htmlFor='image'>Change Cover Image</Label>
                            </Button>
                        </Box>
                        <input type="file" id='image' hidden onChange={(e)=>changeCoverImage(e.target.files[0])}/>
                    </>
                    }
                </Box>
                <Box sx={{paddingX:"20px"}}>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <Box sx={{display:"flex",alignItems:"center",columnGap:"16px"}}>
                            <Box sx={{position:"relative"}}>
                                <Avatar alt={data?.user?.name} src={profileImage?URL.createObjectURL(profileImage):`${process.env.REACT_APP_API}images/${data?.user?.profileImage}`} 
                                sx={{width:"120px",height:"120px",marginTop:"-30px",fontSize:"54px",bgcolor: deepPurple[500]}}/>
                                {user._id===id&&
                                    <>
                                        <Box sx={{position:"absolute",top:"70%",right:"10px"}} htmlFor='image'>
                                            <ProfileLabel htmlFor='image_profile'>
                                                <ImageIcon sx={{fontSize:"22px",color:"#070815"}}/>
                                            </ProfileLabel>
                                        </Box>
                                        <input type="file" id='image_profile' hidden onChange={(e)=>changeProfileImage(e.target.files[0])}/>
                                    </>
                                }
                            </Box>
                            <Box>
                                <Typography sx={{fontSize:"24px",fontWeight:"600"}}>{data?.user?.name}</Typography>
                                <Typography sx={{color:"#747579",fontSize:"15px"}}>{data?.user?.country}</Typography>
                            </Box>
                        </Box>
                        {user._id===id?
                        <Button onClick={handleClickOpen}
                        variant="contained" color="Gray" sx={{textTransform:"capitalize"}}>Edit Profile</Button>
                        :
                        <Button onClick={handleCreateMessage}>
                            <ChatIcon/>
                        </Button>
                        }
                        <Dialog open={openEditProfile} onClose={handleClose}>
                            <EditProfile handleClose={handleClose} name={data?.user?.name} country={data?.user?.country}/>
                        </Dialog>
                    </Box>
                    <Box sx={{ width: '100%', typography: 'body1',marginTop:"16px"}}>
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
                            <TabPanel value="1"><ProfilePosts userId={id}/></TabPanel>
                            <TabPanel value="2"><ProfileAbout about={data?.user?.about}/></TabPanel>
                            <TabPanel value="3"><ProfileFolloweing userId={id}/></TabPanel>
                            <TabPanel value="4"><ProfileFollowers userId={id}/></TabPanel>
                            <TabPanel value="5"><ProfilePhotos userId={id}/></TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Paper>
            }
        </Layout>
    )
}
