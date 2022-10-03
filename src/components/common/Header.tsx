import {AppBar, Avatar, Badge, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useCallback} from "react";
import {useAuth} from "../../util/auth";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useUser} from "../../hooks/useUser";

type HeaderPropers = {
    openMenu: () => void
}

const Header = ({openMenu}: HeaderPropers) => {

    const auth = useAuth();
    const userData = useUser(auth.userData);

    const getUnreadNotificationCount = useCallback(() => {
        if (userData.unreadNotifications.data) {
            return userData.unreadNotifications.data.length;
        }
        return 0;
    }, [userData.unreadNotifications.data])

    return (
        <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
            <AppBar position="static" sx={{mb: 2}}>
                <Box sx={{display: "inline-flex"}}>
                    <Toolbar sx={{width: "100%"}} >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={openMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{width: "220px", display: "inline-flex"}}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1 ,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                }}>
                                BST Sleuth
                            </Typography>
                        </Box>

                        <Box sx={{ width: "100%", display: "inline-flex", justifyContent: "right"}}>
                            <IconButton
                                size="large"
                                aria-label="New notifications"
                                color="inherit"
                                sx={{mr: 2}}
                            >
                                <Badge badgeContent={getUnreadNotificationCount()} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={auth.userData?.avatar} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>

        </Box>
    )
}

export default Header
