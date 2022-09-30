import React, {useCallback, useState} from 'react';
import './App.css';
import {Container, Drawer, Grid} from "@mui/material";
import Header from "./components/common/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import RequireAuth from "./components/common/RequireAuth";
import {AuthProvider} from "./hooks/useAuth";
import RedditAuthCB from "./pages/RedditAuthCB";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import NotificationServices from "./pages/NotificationServices";
import NavMenu from "./components/common/NavMenu";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PatreonAuthCb from "./pages/PatreonAuthCb";
import Notifications from "./pages/Notifications";



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
                                    <Route path="/patreoncb" element={<PatreonAuthCb />} />

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
                                    <Route path="/notifications" element={
                                        <RequireAuth>
                                            <Notifications />
                                        </RequireAuth>
                                    } />
                                    <Route path="/profile" element={
                                        <RequireAuth>
                                            <Profile />
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
