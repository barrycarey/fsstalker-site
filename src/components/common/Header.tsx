import {AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

type HeaderPropers = {
    openMenu: () => void
}

const Header = ({openMenu}: HeaderPropers) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{mb: 2}}>
                <Toolbar>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BST Sleuth
                    </Typography>
                </Toolbar>
            </AppBar>

        </Box>
    )
}

export default Header
