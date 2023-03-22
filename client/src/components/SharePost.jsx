import { Box, Paper,Input, Button, Typography,styled } from '@mui/material'
import React, { useState } from 'react'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useForm, Controller } from "react-hook-form";
import EmojiPicker from 'emoji-picker-react';
import {useSelector} from 'react-redux'

const Label = styled("label")({
    width:"100%",
    display:"flex",
    alignItems:"center",
    cursor:"pointer"
})

const Image = styled('img')({width:"100%"})

export default function SharePost() {
    const [image,setImage] = useState(null)
    const [load,setLoad] = useState(false);
    const [openEmoji,setOpenEmoji] = useState(false)
    
    const { register,control, handleSubmit,reset,watch } = useForm({
        defaultValues: {
            content:'',
        }
    });

    const {token} = useSelector((state)=>state.user)

    async function onSubmit(data)
    {
        const formData = new FormData()
        formData.append('image',image)
        formData.append('content',data.content)
        setLoad(true)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}create_post`,{
                method:"POST",
                headers:{
                    "Authorization":token
                },     
                body:formData
            })
            const data = await response.json()
            setImage("")
            reset({content:""})
            setLoad(false)
            console.log(data)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Paper sx={{padding:"20px"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                name="content"
                control={control}
                render={({ field }) => <Input multiline rows={2} fullWidth {...field}/>}/>
                {
                image&&
                <Box sx={{height:"300px",overflow:"auto",marginTop:"10px"}}>
                    <Image src={URL.createObjectURL(image)}/>
                </Box>
                }
                <Box sx={{marginTop:"32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Box sx={{display:"flex",columnGap:"16px"}}>
                        <Button color="success" sx={{textTransform:"capitalize",fontSize:"16px"}}>
                            <Label htmlFor='image'>
                                <InsertPhotoOutlinedIcon sx={{fontSize:"28px",marginX:"4px"}}/>
                                <Typography sx={{color:"#65676B"}}>Photo</Typography>
                            </Label>
                            <input type="file" id="image" hidden accept='image/*' 
                            onChange={(e)=>setImage(e.target.files[0])}/>
                        </Button>
                        <Button color="warning" sx={{textTransform:"capitalize",fontSize:"16px"}}
                        onClick={()=>setOpenEmoji(back=>!back)}>
                            <EmojiEmotionsOutlinedIcon sx={{fontSize:"28px",marginX:"4px"}}/>
                            <Typography sx={{color:"#65676B"}}>Feelings</Typography>
                        </Button>
                    </Box>
                    {
                        !load?
                        <Button variant='contained' type="submit">Share</Button>
                        :
                        <Button variant='contained'>Share ...</Button>
                    }
                </Box>
                {openEmoji&&
                <Box sx={{width:"100%",marginTop:"10px"}}>
                    <EmojiPicker width="100%" onEmojiClick={(e)=>reset({content:watch('content')+e.emoji})}/>
                </Box>}
            </form>
        </Paper>
    )
}
