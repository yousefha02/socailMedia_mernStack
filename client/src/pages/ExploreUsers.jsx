import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useUsers } from '../hooks/useUsers'
import UserBox from '../components/UserBox'
import { Button, Paper } from '@mui/material'
import UserSkelton from '../Skeleton/UserSkelton'
import { useSelector } from 'react-redux'
export default function ExploreUsers() {

    const {data,isLoading} = useUsers()
    const [users,setUsers] = useState([])

    useEffect(()=>
    {
        if(data?.users)
        {
            setUsers(data.users.slice(0,7))
        }
    },[data])

    const {user} = useSelector((state)=>state.user)

    return (
        <Layout>
            <Paper sx={{padding:"20px"}}>
                {
                    isLoading?
                    <>
                        <UserSkelton width="70%"/>
                        <UserSkelton width="70%"/>
                        <UserSkelton width="55%"/>
                        <UserSkelton width="50%"/>
                    </>
                    :
                    <>
                    {
                    users.length>0&&users.filter(u=>u._id.toString()!==user._id.toString()).map((u,index)=>
                    {
                        return <UserBox user={u} key={index+'m1'} you={user._id}/>
                    })
                    }
                    {users?.length<data?.users?.length&&
                    <Button onClick={()=>setUsers(data.users.slice(0,users.length+5))}
                    fullWidth color="secondary" sx={{marginTop:"20px"}}>See More</Button>}
                    </>
                }
            </Paper>
        </Layout>
    )
}
