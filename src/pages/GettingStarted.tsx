import {Box, Typography} from "@mui/material";

export const GettingStarted = () => {

    return (
        <Box sx={{textAlign: "left", justifyContent: "left"}}>
           <Typography variant="h4">Getting Started</Typography>
            <Typography variant="h6">Create A Notifier</Typography>
            <Typography variant="body1">The first step is to create your first notifier.  These allow you to receive notifications to the services you configure, IE Discord. </Typography>
            <Typography variant="body1">We are using AppRise on the backend to send notifications.  Their <a href="https://github.com/caronc/apprise#productivity-based-notifications" target="_blank">documentation page</a> explains how to structure your notification URL </Typography>
        </Box>
    )
}
