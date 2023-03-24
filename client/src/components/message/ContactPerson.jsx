import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import React from 'react'
import { useSelector } from 'react-redux';
import { useUser } from '../../hooks/useUser';

export default function ContactPerson({item , selectChat,lastMessage,active}) {
    const {user} = useSelector((state)=>state.user);
    const id = item.members.find(i => i!= user._id);
    const {data} = useUser(id);
    const seen = item.messages.filter(ms=> ms.userId!= user._id && ms.seen === false).length
    return (
            <Box sx={{display:"flex",columnGap:"12px",marginBottom:"20px",
            cursor:"pointer" , backgroundColor:active?"#eee":"" , padding:"12px 8px" , borderRadius:"6px"}} onClick={selectChat}>
                <Avatar alt={data?.user?.name} src={`${process.env.REACT_APP_API_KEY}images/${data?.user?.image}`} sx={{width:"45px",height:"45px"}}/>
                <Box sx={{flex:1}}>
                    <Stack direction={"row"} spacing={1} alignItems="center" justifyContent={"space-between"}>
                        <Typography sx={{margin:0}}>{data?.user?.name}</Typography>
                        {
                            seen !== 0 &&
                            <Stack alignItems={"center"} justifyContent={"center"} sx={{
                                fontSize:"10px", width:"20px", height:"20px" , borderRadius:"50%" , backgroundColor:red[500], color:"white"}}
                                >
                                {seen}
                            </Stack>
                        }
                    </Stack>
                    <Stack>
                        <Typography sx={{fontSize:"12px"}}>{lastMessage?.text?.slice(0.30)}</Typography>
                    </Stack>
                </Box>
            </Box>
    )
}
