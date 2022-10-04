import React, {useCallback, useState} from 'react';
import './App.css';
import {Container, Drawer, Grid} from "@mui/material";
import Header from "./components/common/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";


import RedditAuthCB from "./pages/RedditAuthCB";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import NotificationServices from "./pages/NotificationServices";
import NavMenu from "./components/common/NavMenu";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PatreonAuthCb from "./pages/PatreonAuthCb";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import { AuthProvider } from './util/auth';
import {RequireAuthNew} from "./components/common/RequireAuthNew";
import {GettingStarted} from "./pages/GettingStarted";



const queryClient = new QueryClient()

function App() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const openMenu = useCallback(() => {
        console.log('calling open menu')
        setMenuOpen(true);
    }, []);
    return (

    <div className="App">
        <AuthProvider>
            <Container>
                <QueryClientProvider client={queryClient}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Header openMenu={openMenu} />
                        </Grid>
                        <Grid item xs={12}>
                            <BrowserRouter>

                                <Routes>
                                    <Route path="/login" element={<Login />}/>
                                    <Route path="/authcb" element={<RedditAuthCB />} />
                                    <Route path="/patreoncb" element={<PatreonAuthCb />} />

                                    <Route path="/" element={
                                        <RequireAuthNew>
                                            <Home />
                                        </RequireAuthNew>
                                    } />
                                    <Route path="/notification-services" element={
                                        <RequireAuthNew>
                                            <NotificationServices />
                                        </RequireAuthNew>
                                    } />
                                    <Route path="/notifications" element={
                                        <RequireAuthNew>
                                            <Notifications />
                                        </RequireAuthNew>
                                    } />
                                    <Route path="/profile" element={
                                        <RequireAuthNew>
                                            <Profile />
                                        </RequireAuthNew>
                                    } />
                                    <Route path="/about" element={
                                        <About />
                                    } />
                                    <Route path="/getting-started" element={
                                        <GettingStarted />
                                    } />


                                </Routes>

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
        </AuthProvider>
    </div>
  );
}

export default App;
