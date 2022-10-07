import {Box, Typography} from "@mui/material";
import {Link, Navigate} from "react-router-dom";

export const GettingStarted = () => {

    return (
        <Box sx={{textAlign: "left", justifyContent: "left"}}>
           <Typography
               variant="h4"
               sx={{
                   fontFamily: 'monospace',
                   fontWeight: 700,
                   letterSpacing: '.3rem',
               }}
           >Getting Started</Typography>
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    mt: 2,
                    mb: 2
                }}
            >Create A Notifier</Typography>
            <Typography variant="body1">The first step is to <a href="/notification-services" target="_blank">create a notifier</a>.  These allow you to receive notifications to the services you configure, such as Discord. </Typography>
            <Typography variant="body1">We are using AppRise on the backend to send notifications.  Their <a href="https://github.com/caronc/apprise#productivity-based-notifications" target="_blank">documentation page</a> explains how to structure your notification URL </Typography>

            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    mt: 2,
                    mb: 2
                }}
            >Create A Watcher</Typography>
            <Typography variant="body1">A Watcher is where you define what should trigger an alert.  You set a Subreddit and some include and exclude words.  If a post has any of the include words, and none of the exclude words, it will fire a notification.  </Typography>
            <Typography variant="body1" sx={{mt: 2}}>To create your first Watcher, <Link to="/">head over to the home page</Link> and click the + icon</Typography>
        </Box>
    )
}
