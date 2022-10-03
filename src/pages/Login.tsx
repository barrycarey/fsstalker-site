import {Alert, Box, Button, Typography} from "@mui/material";
import {useCallback} from "react";
import { useAuth } from "../util/auth";
import {useLocation} from "react-router-dom";

const Login = () => {
    const auth = useAuth();
    const location = useLocation();
    const redirectPath = location.state?.path || '/'
    const loginState = encodeURIComponent(JSON.stringify({redirectPath: redirectPath}))
    const openRedditAuth = useCallback(() => {
        let authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT_URL}&scope=${process.env.REACT_APP_REDDIT_SCOPE}&state=${loginState}`;
        window.location.href = authUrl;
    }, [])

    return (
        <Box>
            {auth.authError !== null &&
                <Box>
                    <Alert severity="error">Problem Logging in! - {auth.authError}</Alert>
                </Box>
            }
            <Typography variant={"h4"}>Login To Get Started!</Typography>
            <Typography variant={"body1"} sx={{mt:2}}>We use your Reddit account to link trackers to you.  The only data retained is your username</Typography>
            <Box sx={{mt:3}}><Button onClick={openRedditAuth} variant={"contained"} color="success">Login With Your Reddit Account</Button></Box>
        </Box>
    )
}

export default Login;
