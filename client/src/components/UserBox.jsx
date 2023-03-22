import { Avatar, Box, Typography,Button } from '@mui/material'
import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function UserBox({user,you}) {

    const {token} = useSelector((state)=>state.user)
    const [isFollow,setIsFollow] = useState(user.followers.findIndex(u=>u.userId.toString()===you.toString())!==-1)

    async function followUser()
    {
        try{
            setIsFollow(back=>!back)
            const response = await fetch(`${process.env.REACT_APP_API}follow/${you}/${user._id}`,{
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
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Link to={`/user/${user._id}`}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"10px",marginY:"16px"}}>
                    <Avatar src={`${process.env.REACT_APP_API}images/${user.profileImage}`} sx={{width:"45px",height:"45px"}}/>
                    <Typography sx={{fontSize:"15px"}}>{user.name}</Typography>
                </Box>
            </Link>    
            <Button sx={{textTransform:"uppercase"}} onClick={followUser}>{isFollow?'Unfollow':'Follow'}</Button>
        </Box>
    )
}
