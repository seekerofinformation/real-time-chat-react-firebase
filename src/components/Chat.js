import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Grid, Container, TextField, Button, Avatar} from "@material-ui/core";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, addDoc, Timestamp} from "firebase/firestore"
import Loader from "./Loader";

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth);

    const [messages, loading] = useCollectionData(
        collection(firestore,'messages')
    );

    const [value, setValue] = useState('');

    const sendMessage = async () => {
        await addDoc(collection(firestore, "messages"), {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: value,
            createdAt: Timestamp.now()
        });

        setValue('')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid
                container
                style={{height: window.innerHeight - 50, marginTop: 20}}
                justify={"center"}
            >
               <div style={{width: "80%", height: "70vh", border: "1px solid gray", overflowY: "auto"}}>
                   {messages
                       .sort((a, b) => a.createdAt - b.createdAt)
                       .map(message =>
                        <div key={message.id}>
                            <Grid container>
                                <Avatar src={message.photoUrl} />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                   )}
               </div>
                    <Grid
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        style={{width: "80%"}}
                    >
                        <TextField
                            fullWidth
                            variant={"outlined"}
                            rowsMax={2}
                            value={value}
                            onChange={(e) => setValue(e.target.value) }
                        />
                        <Button onClick={sendMessage} variant={"outlined"}>Add message</Button>
                    </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;