import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Person2Icon from '@mui/icons-material/Person2';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import LogoutIcon from '@mui/icons-material/Logout';
import {useCallback} from "react";
import {useAuth} from "../../util/auth";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import {useQueryClient} from "react-query";
import BugReportIcon from '@mui/icons-material/BugReport';

type NavItem = {
    text: string,
    path: string,
    icon: any
}

const NavMenu = () => {

    let navigate = useNavigate();
    const auth = useAuth();
    const queryClient = useQueryClient();


    const navItems = [
        {
            text: "Home",
            path: "/",
            icon: <OtherHousesIcon />
        },
        {
            text: "Notifiers",
            path: "/notification-services",
            icon: <NotificationsIcon />
        },
        {
            text: "Notifications",
            path: "/notifications",
            icon: <NotificationsActiveIcon />
        },
        {
            text: "My Profile",
            path: "/profile",
            icon: <Person2Icon />
        },
        {
            text: "About",
            path: "/about",
            icon: <SmartToyIcon />
        },
        {
            text: "Getting Started",
            path: "/getting-started",
            icon: <HelpCenterIcon />
        },

    ]

    const onLinkClick = (path: string) => {
        navigate(path);
    }

    const loginLogoutOnClick = useCallback(() => {
        if (auth.userData) {
            queryClient.removeQueries(['userNotifications'])
            auth.logout();
        } else {
            navigate('/login')
        }

    }, [auth])

    return (
        <Box sx={{ p: 2, width: 300 }}>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="h5">Settings</Typography>
            </Box>
            <List>
                {navItems.map(
                    (item: NavItem) => (
                        <ListItem>
                            <ListItemButton onClick={() => onLinkClick(item.path)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>{item.text}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )
                )

                }
                <ListItem>
                    <ListItemButton onClick={() => {window.open("https://github.com/barrycarey/fsstalker-site/issues", "_blank") }}>
                        <ListItemIcon>
                            <BugReportIcon />
                        </ListItemIcon>
                        <ListItemText>Report Issue</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={loginLogoutOnClick}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>{auth.userData ? "Logout" : "Login"}</ListItemText>
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    )
}
export default NavMenu;
