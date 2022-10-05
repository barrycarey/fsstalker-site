import {Box, Divider, Typography} from "@mui/material";
import {useEffect} from "react";

const About = () => {

    return (
        <Box sx={{textAlign: "left"}}>
            <Typography
                variant="h5"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                }}
            >What's this all about? </Typography>
            <Divider />
            <Typography variant={"body1"} sx={{mt: 3}}>
                Have you ever missed an awesome deal on Reddit because their notifications are too slow? That's what we're here to help with.
            </Typography>

            <Typography variant={"body1"} sx={{mt: 1}}>
                BST Sleuth allows you to setup customized watchers to alert you when a Reddit post meets a certain condition. Simly create a watcher, pick the words to search for and what services to notify.
            </Typography>

            <Typography
                variant="h5"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    mt: 2
                }}
            >How does it work? </Typography>
            <Divider />
            <Typography variant={"body1"} sx={{mt: 3}}>
                BST Sleuth continually scans all Subreddits in realtime and checks if any watches are a match.  If they are, it fires all notifications you have configured
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    mt: 2
                }}
            >Why do I have to sign in with my Reddit account? </Typography>
            <Divider />
            <Typography variant={"body1"} sx={{mt: 3}}>
                We use your Reddit account to link watches to you and make some API calls, such as getting Subreddit banners. The only data we retain is your username.
            </Typography>
        </Box>
    )
}

export default About;
