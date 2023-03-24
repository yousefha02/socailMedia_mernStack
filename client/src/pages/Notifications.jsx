import { Box, Paper,styled,Typography } from '@mui/material'
import React from 'react'
import Layout from '../components/Layout'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useNotifications } from '../hooks/useNotifications';
import { useSeenNot } from '../hooks/useSeenNot';
import { useSelector } from 'react-redux';

const Wrapper = styled(Box)({
    display:"flex",
    columnGap:"10px",
    justifyContent:"center"
})

const IconWrapper = styled(Box)({
    width:"55px",
    height:"55px",
    borderRadius:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
})

export default function Notifications() {
    const {token} = useSelector((state)=>state.user)
    const {data,isLoading} = useNotifications(token)

    const notifications = useSeenNot(token)

    return (
        <Layout>
            <Paper sx={{padding:"20px"}}>
                {
                isLoading?
                ""
                :
                data.notifications.length>0&&data.notifications.map((noti,index)=>
                {
                    return(
                        <Wrapper sx={{marginBottom:"35px"}} key={index+'p1'}>
                            <IconWrapper sx={{backgroundColor:!noti.seen?"#e66b4c47":"#40c0dc33"}}>
                                <NotificationsActiveOutlinedIcon sx={{color:"black",fontSize:"26px",transform:'rotate(45deg)'}}/>
                            </IconWrapper>
                            <Box sx={{width:"90%"}}>
                                <Typography sx={{fontSize:"15px",color:"#303030",fontWeight:"400",marginBottom:"8px"}}>
                                    {noti.content}
                                </Typography>
                                <Typography sx={{fontSize:"13px",color:"#949494",fontWeight:"500"}}> قبل 5 دقائق  </Typography>
                            </Box>
                        </Wrapper>
                    )
                })
                }
            </Paper>
        </Layout>
    )
}
