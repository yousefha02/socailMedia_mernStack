import React from 'react'
import {Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import {Link} from 'react-router-dom'
import {logoutUser} from '../redux/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
export default function Layout({children}) {

    const {user} = useSelector((state)=>state.user)
    const topics = [
        {title:"Home",link:"",icon:HomeOutlinedIcon},
        {title:"Saved Posts",link:"save-posts",icon:BookmarkBorderIcon},
        {title:"Notifications",link:"",icon:NotificationsNoneIcon},
        {title:"Explore",link:"explore",icon:ExploreOutlinedIcon},
        {title:"Profile",link:`user/${user._id}`,icon:PersonIcon},
        {title:"Messages",link:"",icon:MailOutlineIcon},
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout()
    {
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <Container sx={{marginY:"30px"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={3}>
                    <Paper sx={{padding:"20px"}}>
                        <List>
                            {topics.map((topic, index) => (
                            <Link to={`/${topic.link}`} key={index+'a1'}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                    <ListItemIcon>
                                        <topic.icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={topic.title} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            ))}
                            <ListItem disablePadding onClick={handleLogout}>
                                <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={9}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}
