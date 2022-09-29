import {useEffect} from "react";

const RedditAuthCB = () => {

    useEffect(() => {
        console.log('In Reddit Auth CB');
        const parsedParams: any = {};
        let urlData = window.location.href;
        if (process.env.REACT_APP_REDDIT_REDIRECT_URL == null) {
            console.log('No redirect URL defined')
            return;
        }
        urlData.replace(process.env.REACT_APP_REDDIT_REDIRECT_URL, '').split('&')
            .map(part => part.replace(/#/, ''))
            .forEach(param => {
                const parts = param.split('=');
                parsedParams[parts[0]] = parts[1];
            });

        localStorage.setItem('token', parsedParams.access_token);
    })

    return (
        <div></div>
    )
}

export default RedditAuthCB;
