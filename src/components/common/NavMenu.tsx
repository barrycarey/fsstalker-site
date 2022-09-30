import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Person2Icon from '@mui/icons-material/Person2';

type NavItem = {
    text: string,
    path: string,
    icon: any
}

const NavMenu = () => {

    let navigate = useNavigate();

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
        }
    ]

    const onLinkClick = (path: string) => {
        navigate(path);
    }

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

            </List>
        </Box>
    )
}
export default NavMenu;
