import { Avatar, Box ,Paper, Typography,styled, Button,Menu,MenuItem} from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import {Link} from 'react-router-dom'
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTimelines } from '../hooks/useTimelines';

const Image = styled('img')({
    width:"100%",
    marginTop:"16px",
    borderRadius:"4px"
})

export default function Post({post,filterPosts,savePage}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const {refetch} = useTimelines();
    const {user,token} = useSelector((state)=>state.user)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const [isSave,setIsSave] = useState(post.userSaved?.findIndex(u=>u.userId.toString()===user._id.toString())!==-1)
    const [isLike,setIsLike] = useState(post.usersLike?.findIndex(u=>u.userId.toString()===user._id.toString())!==-1)
    const [likes,setLikes] = useState(post?.usersLike.length)

    async function savePost()
    {
        try{
            if(savePage){
                isSave && filterPosts(post._id)
            }
            setIsSave(back=>!back)
            const response = await fetch(`${process.env.REACT_APP_API}save/${post._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
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

    async function deletePost()
    {
        try{
            const response = await fetch(`${process.env.REACT_APP_API}delete/${post._id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
            })
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
            refetch();
        }
        catch(err)
        {
            console.log(err)
        }
    }

    async function likePost()
    {
        try{
            isLike?setLikes(back=>back-1):setLikes(back=>back+1)
            setIsLike(back=>!back)
            const response = await fetch(`${process.env.REACT_APP_API}like/${post._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
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

    return (
        <Paper sx={{padding:"20px",marginY:"20px"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Link to={`/user/${post.ceatorId._id}`}>
                    <Box sx={{display:"flex",columnGap:"8px",alignItems:"center"}}>
                        <Avatar src={`${process.env.REACT_APP_API}images/${post.ceatorId?.profileImage}`}/>
                        <Box>
                            <Typography sx={{fontWeight:"500"}}>{post.ceatorId?.name}</Typography>
                            <Typography sx={{fontSize:"13px",color:"#747579"}}>{format(post.createdAt)}</Typography>
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
                    {
                    !isSave?
                    <MenuItem onClick={()=>{savePost();handleClose()}} sx={{columnGap:"8px",marginBottom:"6px",width:"160px"}}>
                        <BookmarkBorderIcon/>
                        <Typography sx={{fontSize:"15px"}}>Save Post</Typography>
                    </MenuItem>
                    :
                    <MenuItem onClick={()=>{savePost();handleClose()}} sx={{columnGap:"8px",marginBottom:"6px",width:"160px"}}>
                        <BookmarkRemoveOutlinedIcon/>
                        <Typography sx={{fontSize:"15px"}}>Unsave Post</Typography>
                    </MenuItem>
                    }
                    {
                        user._id === post.ceatorId._id &&
                        <MenuItem onClick={()=>{deletePost(); handleClose();}} sx={{columnGap:"8px",marginBottom:"6px"}}>
                            <DeleteOutlineIcon/>
                            <Typography sx={{fontSize:"15px"}}>Delete</Typography>
                        </MenuItem>
                    }
                </Menu>
            </Box>
            <Typography sx={{fontSize:"15px",marginTop:"12px"}}>
                {post?.content}
            </Typography>
            {post.image&&<Image src={`${process.env.REACT_APP_API}images/${post.image}`}/>}
            <Box sx={{marginTop:"16px",display:"flex",columnGap:"30px",alignItems:"center"}}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"6px"}}>
                    {!isLike?
                    <FavoriteBorderIcon color="error" sx={{cursor:"pointer"}} onClick={likePost}/>
                    :
                    <FavoriteIcon color='error' sx={{cursor:"pointer"}} onClick={likePost}/>
                    }
                    <Typography>{likes}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}