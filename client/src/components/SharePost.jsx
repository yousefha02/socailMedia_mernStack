import { Avatar, Box, Paper,Input, Button, Typography,styled } from '@mui/material'
import React, { useState } from 'react'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useForm, Controller } from "react-hook-form";
import EmojiPicker from 'emoji-picker-react';

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

    async function onSubmit(data)
    {
        try{
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
                <Box sx={{display:"flex",columnGap:"10px",alignItems:"center"}}>
                    <Avatar src="" sx={{width:"55px",height:"55px"}}/>
                    <Controller
                    name="content"
                    control={control}
                    render={({ field }) => <Input multiline rows={2} fullWidth {...field}/>}
                    {...register("content", { required: "content Address is required" })}
                    />
                </Box>
                {
                image&&
                <Box sx={{height:"300px",overflow:"auto"}}>
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
                    <Button variant='contained' type="submit">Share</Button>
                </Box>
                {openEmoji&&
                <Box sx={{width:"100%",marginTop:"10px"}}>
                    <EmojiPicker width="100%" onEmojiClick={(e)=>reset({content:watch('content')+e.emoji})}/>
                </Box>}
            </form>
        </Paper>
    )
}
