import React, {useContext, useState} from 'react';
import {Box, Button, Container, Grid, TextField} from "@material-ui/core";
import {Context} from "../index";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const {auth} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);
    }

    const signUpUserAccount = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user)
            }).catch(e => console.log(e))
    }

    return (
        <Container>
            <Grid
                container
                style={{height: window.innerHeight - 50}}
                alignItems={"center"}
                justify={"center"}
            >
                <Grid
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <TextField
                        type={"text"}
                        value={email}
                        placeholder={"Email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type={"password"}
                        value={password}
                        placeholder={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button variant={"outlined"} onClick={signUpUserAccount}>Create Account</Button>
                </Grid>

                <Grid
                    style={{width: 400, background: "lightgray"}}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant={"outlined"}>Login with Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;