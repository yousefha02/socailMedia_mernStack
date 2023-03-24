import { Paper,Box, Avatar, Typography, Divider, TextField, Button , styled} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useForm, Controller } from "react-hook-form";
import {
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { db } from '../../firebase'
import { useSelector } from 'react-redux';
import { useUser } from '../../hooks/useUser';
import Message from './Message';

const Form = styled("form")({})

export default function Conversaition({messages}) {
    const { register,control, handleSubmit  , reset , watch} = useForm({
        defaultValues: {
            message:'',
        }
    });

    const {user} = useSelector((state)=>state.user);
    const id = messages.members.find(i => i!= user._id);
    const {data} = useUser(id);


    const ref = useRef();
    


    const onSubmit = async (data) =>{
        const text = data.message;
        reset({message:""})
        const time = Timestamp.now();
        await updateDoc(doc(db, "chats", messages.id), {
            messages: arrayUnion({
              id: uuid(),
              text : text,
              userId: user._id,
              seen:false,
              date: time,
            }),
            lastmessage:time
          });
        }

        useEffect(()=>
        {
            ref.current?.scrollIntoView({behavior:"smooth"})
        },[messages])
    

    return (
        <Paper sx={{width:"100%",paddingY:"20px"}}>
            <Box sx={{display:"flex",alignItems:"center",columnGap:"12px",paddingX:"20px"}}>
                <Avatar alt={`${data?.user?.name}`}
                src={`${process.env.REACT_APP_API_KEY}images/${data?.user?.image}`} sx={{width:"45px",height:"45px"}}/>
                <Typography>{data?.user?.name}</Typography>
            </Box>
            <Divider sx={{marginY:"10px"}}/>
            <Box sx={{paddingX:"20px" , height:"400px" , overflowY:"auto"}}>
                {
                    messages?.messages?.map((msg,index)=>
                    {
                        const you= user._id == msg.userId
                        return <div ref={ref}>
                            <Message you={you} key={index+'pq1'} message={msg}/>
                        </div>
                    })
                }
            </Box>
            <Form sx={{marginY:"10px",paddingX:"20px",display:"flex",alignItems:"center",columnGap:"8px"}} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth autoComplete='off'/>}
                    {...register("message", { required: "message Address is required" })}
                    />
                    {watch('message')&&<Button variant="contained"  type='submit'>Send</Button>}
            </Form>
        </Paper>
    )
}
