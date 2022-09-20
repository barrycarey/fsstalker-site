import React, {useCallback, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Box, Button, Container, Drawer, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RequireAuth from "./components/RequireAuth";
import {AuthProvider} from "./hooks/useAuth";
import RedditAuthCB from "./pages/RedditAuthCB";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import NotificationServices from "./pages/NotificationServices";
import NavMenu from "./components/NavMenu";

const queryClient = new QueryClient()

function App() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const openMenu = useCallback(() => {
        console.log('calling open menu')
        setMenuOpen(true);
    }, []);
    return (

    <div className="App">
        <Container>
            <QueryClientProvider client={queryClient}>
                <Grid container>
                    <Grid item xs={12}>
                        <Header openMenu={openMenu} />
                    </Grid>
                    <Grid item xs={12}>
                        <BrowserRouter>
                            <AuthProvider>
                                <Routes>
                                    <Route path="/login" element={<Login />}/>
                                    <Route path="/authcb" element={<RedditAuthCB />} />

                                    <Route path="/" element={
                                        <RequireAuth>
                                            <Home />
                                        </RequireAuth>
                                    } />
                                    <Route path="/notification-services" element={
                                        <RequireAuth>
                                            <NotificationServices />
                                        </RequireAuth>
                                    } />

                                </Routes>
                            </AuthProvider>
                            <Drawer
                                anchor="left"
                                open={menuOpen}
                                onClose={() => setMenuOpen(false)}
                            >
                                <NavMenu />
                            </Drawer>
                        </BrowserRouter>
                    </Grid>
                </Grid>


                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>

        </Container>
    </div>
  );
}

export default App;
