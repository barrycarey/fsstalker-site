import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const NavMenu = () => {
    return (
        <Box sx={{ p: 2, width: 300 }}>
            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="h5">Settings</Typography>
            </Box>
            <List>
                <ListItem component={Link} to="/notification-services" >
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Notificatoin Services"/>
                    </ListItemButton>
                </ListItem>
                <ListItem component={Link} to="/" >
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItemButton>
                </ListItem>
                <ListItem component={Link} to="/demo" >
                    <ListItemButton>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Demo"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}
export default NavMenu;
