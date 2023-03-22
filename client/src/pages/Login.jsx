import { Box, Button, Container, Grid,InputLabel,styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import social from '../images/social.jpg'
import { useForm, Controller } from "react-hook-form";
import {useSnackbar} from 'notistack'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';

const Image = styled("img")({
    width:"100%",
    height:"100vh"
})

const ReactLink = styled(Link)({
    color:"#0082f4"
})

export default function Login() {
    const { register,control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            email:'',
            password:''
        }
    });
    const {closeSnackbar,enqueueSnackbar} = useSnackbar();
    const [load , setLoad] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function onSubmit(data)
    {
        closeSnackbar();
        setLoad(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_API}login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },     
                body:JSON.stringify({email:data.email,password:data.password})
            })
            const resData = await response.json();
            setLoad(false);
            if(response.status!==200&&response.status!==201)
            {
                enqueueSnackbar(resData.message,{variant:"error",autoHideDuration:"4000"})
                throw new Error('failed occured')
            }
            dispatch(loginUser({user:resData.user,token:resData.token}))
            navigate('/')
            enqueueSnackbar('success',{variant:"success",autoHideDuration:"2000"})
        }
        catch(err)
        {
            setLoad(false);
            console.log(err)
        }
    }

    return (
        <Box>
            <Grid container spacing={2} sx={{height:"100vh"}}>
                <Grid item xs={12} md={6}>
                    <Container sx={{display:"flex",flexDirection:"column",justifyContent:"center",height:"100%"}}>
                        <Typography sx={{textTransform:"uppercase",color:"#38B7A9",
                        fontSize:"34px",marginBottom:"20px",fontWeight:"600",textAlign:"center"}}>Login</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{marginBottom:"30px"}}>
                                <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>Email</InputLabel>
                                <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <TextField type="email" {...field} fullWidth/>}
                                {...register("email", { required: "email Address is required" })}
                                />
                                {errors.email?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>this field is required</Typography>}
                            </Box>
                            <Box sx={{marginBottom:"30px"}}>
                                <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>Password</InputLabel>
                                <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <TextField type="password" {...field} fullWidth/>}
                                {...register("password", { required: "password Address is required" })}
                                />
                                {errors.password?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>this field is required</Typography>}
                            </Box>
                            {
                                load
                                ?
                                <Button variant="contained" sx={{opacity:0.7}}>Login...</Button>
                                :
                                <Button variant="contained" type="submit">Login</Button>
                            }
                        </form>
                        <Typography sx={{fontSize:"14px",marginTop:"20px",color:"#747579"}}>
                            don't have an account? <ReactLink to="/signup">Signup</ReactLink>
                        </Typography>
                    </Container>
                </Grid>
                <Grid item md={6} sx={{display:{md:"flex",xs:"none"}}}>
                    <Image src={social}/>
                </Grid>
            </Grid>
        </Box>
    )
}