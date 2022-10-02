import {useEffect} from "react";
import { useAuth } from "../util/auth";
import {useLocation, useNavigate} from "react-router-dom";

const RedditAuthCB = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log('RedditAuthCB: Starting');
        console.log(`RedditAuthCB: Path - ${location.pathname}`)
        console.log(`RedditAuthCB: href = ${window.location.href}`)

        const parsedParams: any = {};
        let urlData = window.location.href;
        if (process.env.REACT_APP_REDDIT_REDIRECT_URL == null) {
            console.log('RedditAuthCB: No redirect URL defined')
            return;
        }
        urlData.replace(process.env.REACT_APP_REDDIT_REDIRECT_URL, '').split('&')
            .map(part => part.replace(/#/, ''))
            .forEach(param => {
                const parts = param.split('=');
                parsedParams[parts[0]] = parts[1];
            });
        console.log(`RedditAuthCB: Token - ${parsedParams.access_token}`)
        if (!parsedParams.access_token) {
            console.log('RedditAuthCB: No token, skipping login');
            return;
        }
        auth.login(parsedParams.access_token)
        let redirectPath = '/';
        if (parsedParams.state) {
            let state = JSON.parse(decodeURIComponent(parsedParams.state));
            if (state.redirectPath) {
                console.log(`RedditAuthCB: Redirected to location from state ${state.redirectPath}`)
                redirectPath = state.redirectPath;
            }
        }
        navigate(redirectPath);

    }, [auth.userData])

    return (
        <div></div>
    )
}

export default RedditAuthCB;
