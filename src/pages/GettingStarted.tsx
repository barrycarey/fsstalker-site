import {Box, Typography} from "@mui/material";

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
            <Typography variant="body1">The first step is to create a notifier.  These allow you to receive notifications to the services you configure, such as Discord. </Typography>
            <Typography variant="body1">We are using AppRise on the backend to send notifications.  Their <a href="https://github.com/caronc/apprise#productivity-based-notifications" target="_blank">documentation page</a> explains how to structure your notification URL </Typography>
        </Box>
    )
}
