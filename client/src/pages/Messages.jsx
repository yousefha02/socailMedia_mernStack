import React, { useEffect, useState } from 'react'
import { Box, Container, Divider, Grid, Paper, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    collection,
    query,
    onSnapshot,
    where,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { db } from '../firebase'
// import ContactPersonTeacher from '../../components/reusableUi/ContactPersonTeacher';
import lgo from '../images/messge.jpg'
import Layout from '../components/Layout';
import Conversaition from '../components/message/Conversation';
import ContactPerson from '../components/message/ContactPerson';


const Image = styled('img')({
    width:"160px"
})

export default function Messages() {
    const [conversaition,setConversaition] = useState([]);

    const {user,token} = useSelector((state)=>state.user)


    useEffect(()=>{
        const q = query(collection(db,"chats") ,where("members", "array-contains", user._id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let conv = [];
            querySnapshot.forEach((doc) => {
                conv.push({...doc.data() , id:doc.id});
            });
            setConversaition(conv.sort((a,b)=> b.lastmessage - a.lastmessage))
        });
        return () => unsubscribe();
    },[user._id]);


    const [chatId , setChatId] = useState(null);
    const [messages , setMessages] = useState(null);

    useEffect(() => {
        if(chatId){
            const docRef = doc(db, "chats", chatId);
            const updateArrayField = (array, itemId, newFieldValue) => {
            return array.map(item => {
                if (item.userId === itemId && item.seen === false) {
                return {...item, seen: newFieldValue};
                } else {
                return item;
                }
            });
            }
            const updateDocument = () => {
            getDoc(docRef)
                .then((doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    const id = data.members.find(i => i!= user._id);
                    const newArray = updateArrayField(data.messages, id, true);
                    const updatedData = {...data, messages: newArray};
                    return updateDoc(docRef, updatedData);
                } else {
                    console.log("Document not found");
                }
                })
                .then(() => {
                console.log("Document updated successfully");
                })
                .catch((error) => {
                console.error("Error updating document: ", error);
                });
            }
            updateDocument();

            const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && updateDocument(); setMessages({...doc.data() , id:doc.id});
            });
            return () => {
                unSub();
            };
        }
    }, [chatId, user._id]);



    return (
        <Layout>
            <Container sx={{marginBottom:"0px",overflow:"hidden"}}>
                <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                        {
                             chatId && messages?
                             <Box marginBottom={"10px"}>
                             <Conversaition messages={messages}/>
                             </Box>
                             :
                             <Paper sx={{height:"400px" , display:"flex" , alignItems:"center" , justifyContent:"center" , flexDirection:"column",marginBottom:"10px"}}>
                                <Image src={lgo} alt=""/>
                                <Typography sx={{fontWeight:600 , marginTop:"12px", fontSize:"22px"}}>
                                    Select friend and start chat
                                </Typography>
                            </Paper>
                        }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Paper sx={{paddingY:"20px"}}>
                                <Typography sx={{paddingX:"20px"}}>Messages</Typography>
                                <Divider sx={{marginY:"10px"}}/>
                                <Box sx={{paddingX:"20px"}}>
                                    {
                                        conversaition.length>0 && conversaition.map((item,index)=>
                                        {
                                            return(
                                                <ContactPerson item={item} key={index+'k1'} selectChat={()=>setChatId(item.id)}
                                                lastMessage={item.messages[item.messages.length-1]} active={item.id == chatId}
                                                />
                                            )
                                        })
                                    }
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
