import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';

export default function EditProfile({handleClose,name,country}) {
    const { register,control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            name:name,
            country:country
        }
    });

    const {user,token} = useSelector((state)=>state.user)

    async function onSubmit(data)
    {
        try{
            const response = await fetch(`${process.env.REACT_APP_API}user/edit-profile/${user._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body:JSON.stringify(data)
            })
            window.location.reload()
            handleClose()
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Box sx={{width:"500px",maxWidth:"100%"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="alert-dialog-title">
                Edit Profile
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box sx={{marginBottom:"30px"}}>
                        <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>Name</InputLabel>
                        <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth/>}
                        {...register("name", { required: "name Address is required" })}
                        />
                        {errors.name?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>this field is required</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"30px"}}>
                        <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>Country</InputLabel>
                        <Controller
                        name="country"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth/>}
                        {...register("country", { required: "country Address is required" })}
                        />
                        {errors.country?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>this field is required</Typography>}
                    </Box>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button type="submit">Save</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
            </form>
        </Box>
    )
}
