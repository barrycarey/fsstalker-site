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
                        <ListItemText primary="Some Text"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}
export default NavMenu;
