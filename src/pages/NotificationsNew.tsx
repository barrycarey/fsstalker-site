import {useSentNotifications} from "../hooks/useSentNotifications";
import {useEffect, useState} from "react";
import {SentNotification, SentNotificationTableRow, SubredditIcon, Watch} from "../interfaces/common";
import {Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import LoadScreen from "../components/common/LoadScreen";
import {useAuth} from "../util/auth";
import {SentNotificationBlock} from "../components/common/SentNotificationBlock";
import axios from "axios";


export const NotificationsNew = () => {
    const authCtx = useAuth();
    const sentNotifications = useSentNotifications(authCtx?.userData);
    const [sortedNotifications, setSortedNotifications] = useState<SentNotificationTableRow[]>([]);
    const [subredditIcons, setSubredditIcons] = useState<SubredditIcon[]>([]);

    useEffect(() => {
        if (!sentNotifications.notifications.data) {
            return;
        }

        setSubredditIcons([]);

        let unique = [...new Set(sentNotifications.notifications.data.map(item => item.watch.subreddit))];
        console.log(unique)

        unique.forEach((subreddit) => {
            axios.get(`https://oauth.reddit.com/r/${subreddit}/about`, {
                headers: { Authorization: `Bearer ${authCtx.userData?.authToken}` }
            }).then(res => {setSubredditIcons(prevState => [...prevState, {subreddit: subreddit, iconPath: res.data.data.icon_img}])})

        })
    }, [sentNotifications.notifications.data])



    if (sentNotifications.notifications.isLoading) {
        return <LoadScreen />
    }

    if (!sentNotifications.notifications.data) {
        return <Box>Error Loading Data</Box>
    }

    return (
        <Box>
            <Grid container spacing={1}>

            {
                sentNotifications.notifications.data.map((n: SentNotification) => (
                    <Grid item xl={3} xs={12}>
                        <SentNotificationBlock notification={n} subredditIcons={subredditIcons}/>
                    </Grid>
                ))
            }
            </Grid>
        </Box>
    )
}
