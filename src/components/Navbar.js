import React, {useContext} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/constants";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth);

    return (
        <AppBar color={"secondary"} position="static">
            <Toolbar variant={"dense"}>
                <Grid container justify={"flex-end"}>
                    {user ?
                        <NavLink to={CHAT_ROUTE}>
                            <Button onClick={() => auth.signOut()} variant={"outlined"}>Logout</Button>
                        </NavLink>
                        :
                        <NavLink to={LOGIN_ROUTE}>
                            <Button variant={"outlined"}>Login</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;