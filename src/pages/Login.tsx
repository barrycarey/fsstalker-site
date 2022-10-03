import {Alert, Box, Button} from "@mui/material";
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
        <div>
            {auth.authError !== null &&
                <Box>
                    <Alert severity="error">Problem Logging in! - {auth.authError}</Alert>
                </Box>
            }
            <h1>Login</h1>
        <div>We use your Reddit account to link trackers to you</div>
            <div><Button onClick={openRedditAuth}>Login</Button></div>
        </div>
    )
}

export default Login;
