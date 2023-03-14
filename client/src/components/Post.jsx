import { Avatar, Box ,Paper, Typography,styled, Button, TextField,Menu,MenuItem} from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import {Link} from 'react-router-dom'
const Image = styled('img')({
    width:"100%",
    marginTop:"16px",
    borderRadius:"4px"
})

export default function Post() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Paper sx={{padding:"20px",marginY:"20px"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Link to="/user/1">
                    <Box sx={{display:"flex",columnGap:"8px",alignItems:"center"}}>
                        <Avatar/>
                        <Box>
                            <Typography sx={{fontWeight:"500"}}>Yousef Abohani</Typography>
                            <Typography sx={{fontSize:"13px",color:"#747579"}}>2 hours ago</Typography>
                        </Box>
                    </Box>
                </Link>
                <Button sx={{minWidth:"0px"}} onClick={handleClick}><MoreHorizIcon/></Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose} sx={{columnGap:"8px",marginBottom:"6px",width:"160px"}}>
                        <BookmarkBorderIcon/>
                        <Typography sx={{fontSize:"15px"}}>Save Post</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{columnGap:"8px",marginBottom:"6px"}}>
                        <DeleteOutlineIcon/>
                        <Typography sx={{fontSize:"15px"}}>Delete</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{columnGap:"8px",marginBottom:"6px"}}>
                        <NotificationsActiveOutlinedIcon/>
                        <Typography sx={{fontSize:"15px"}}>Turn notifications</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose} sx={{columnGap:"8px",marginBottom:"6px"}}>
                        <ClearIcon/>
                        <Typography sx={{fontSize:"15px"}}>Hide Post</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            <Typography sx={{fontSize:"15px",marginTop:"12px"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
            </Typography>
            <Image 
            src={'https://cdn.britannica.com/44/102944-050-18D72EC5/Domes-mosque-Malaysia.jpg'}/>
            <Box sx={{marginTop:"16px",display:"flex",columnGap:"30px",alignItems:"center"}}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"6px"}}>
                    <FavoriteBorderIcon/>
                    <Typography>12</Typography>
                </Box>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"6px"}}>
                    <ChatBubbleOutlineIcon/>
                    <Typography>43</Typography>
                </Box>
            </Box>
            <Box sx={{marginTop:"20px",display:"flex",alignItems:"center",columnGap:"8px"}}>
                <Avatar sx={{width:"45px",height:"45px"}}/>
                <TextField fullWidth/>
            </Box>
        </Paper>
    )
}