import {Alert, AlertTitle, Box, Button, FormGroup, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useUser} from "../hooks/useUser";
import LoadScreen from "../components/common/LoadScreen";
import StatBox from "../components/profile/StatBox";
import {useWatches} from "../hooks/useWatches";
import {useNotificationSvc} from "../hooks/useNotificationSvc";
import {RoundedRow, RoundedRowSections} from "../util/styles";
import {useAuth} from "../util/auth";

const Profile = () => {
    const authCtx = useAuth();
    const userData = useUser(authCtx?.userData)
    const watches = useWatches(authCtx?.userData);
    const notificationServices = useNotificationSvc(authCtx?.userData);
    const [overLimit, setOverLimit] = useState<boolean>(false);

    useEffect(() => {
        if (watches.watches.data && userData.user.data) {
            if (watches.watches.data.length > userData.user.data.patreon_tier.max_watches) {
                setOverLimit(true);
                return;
            }
        }
        if (notificationServices.services.data && userData.user.data) {
            if (notificationServices.services.data.length > userData.user.data.patreon_tier.max_notification_services) {
                setOverLimit(true);
                return;
            }
        }
        setOverLimit(false);
    }, [watches.watches.data, notificationServices.services.data, userData])

    const openPatreonAuth = useCallback(() => {
        let authUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&redirect_uri=${process.env.REACT_APP_PATREON_REDIRECT_URL}&client_id=${process.env.REACT_APP_PATREON_CLIENT_ID}&state=${localStorage.getItem('token')}`
        console.log(authUrl)
        window.open(authUrl, '_blank')
    }, [])

    const delayInMinutes = useCallback(() => {
        if (!userData.user.data) {
            return "N/A"
        }

        return `${String(userData.user.data.patreon_tier.notify_delay / 60)} min`

    }, [userData.user.data])

    const getUsedWatches = useCallback(() => {
        if (!watches.watches.data) {
            return "N/A"
        }
        if (!userData.user.data) {
            return "N/A"
        }
        return `${watches.watches.data.length}/${userData.user.data.patreon_tier.max_watches}`
    },[userData.user.data, watches.watches.data])

    const getUsedNotificationSvc = useCallback(() => {
        if (!notificationServices.services.data) {
            return "N/A"
        }
        if (!userData.user.data) {
            return "N/A"
        }
        return `${notificationServices.services.data.length}/${userData.user.data.patreon_tier.max_watches}`
    },[userData.user.data, notificationServices.services.data])

    const getPatreonStatusColor = useCallback(() => {
        if (userData.user.data) {
            return userData.user.data.patreon_id !== null ? "green" : "red"
        }
        return "red"
    }, [userData.user.data])

    if (userData.user.isLoading) {
        <LoadScreen />
    }

    if (userData.user.data) {
        return (
            <Box>
                <RoundedRow sx={{borderRadius: 0, background: "#121212", padding: 0}}>
                    <RoundedRowSections sx={{ fontWeight: "bold"}}>
                        Patreon Status:
                    </RoundedRowSections>
                    <RoundedRowSections sx={{ml: 1, color: getPatreonStatusColor()}}>
                        {userData.user.data.patreon_id ? "Linked" : "Not Linked"}
                    </RoundedRowSections>
                    {!userData.user.data.patreon_id &&
                        <RoundedRowSections sx={{ml: 2}}>
                            <Button variant="outlined"  color="success" onClick={openPatreonAuth}>Link Patreon </Button>
                        </RoundedRowSections>
                    }
                </RoundedRow>

                {overLimit &&
                    <Box sx={{justifyContent: "left", textAlign: "left", mb: 2}}>
                        <Alert severity="error">
                            <AlertTitle>Over Limit</AlertTitle>
                            You have exceeded the limit for your tier.  Your oldest services will be disabled
                        </Alert>
                    </Box>
                }

                <Grid container spacing={2}>
                    <Grid item xs={12} xl={4}>
                        <StatBox title="Watches"  content={getUsedWatches()} />
                    </Grid>
                    <Grid item xs={12} xl={4}>
                        <StatBox title="Notification Services" content={getUsedNotificationSvc()}/>
                    </Grid>
                    <Grid item xs={12} xl={4}>
                        <StatBox title="Delay"  content={delayInMinutes()} />
                    </Grid>
                </Grid>

            </Box>
        )
    }

    return (
        <Box>Problem loading data</Box>
    )


}

export default Profile;
