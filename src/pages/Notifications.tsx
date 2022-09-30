import AuthConsumer from "../hooks/useAuth";
import {useSentNotifications} from "../hooks/useSentNotifications";
import {useCallback, useEffect, useState} from "react";
import {SentNotification, SentNotificationTableRow, Watch} from "../interfaces/common";
import {Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import axios from "axios";

type SubredditIcon = {
    subreddit: string,
    iconPath: string
}

const Notifications = () => {
    const authCtx = AuthConsumer();
    const sentNotifications = useSentNotifications(authCtx.userData?.username);
    const [sortedNotifications, setSortedNotifications] = useState<SentNotificationTableRow[]>([]);
    const [subredditIcons, setSubredditIcons] = useState<SubredditIcon[]>([]);

    useEffect(() => {
        let notificationList: SentNotificationTableRow[] = [];
        if (sentNotifications.notifications.data != null) {
            sentNotifications.notifications.data.forEach((watch: Watch) => {
                watch.sent_notifications.forEach((not: SentNotification) => {
                    notificationList.push({
                        id: not.id,
                        sent_at: new Date(not.sent_at),
                        triggered_post: not.triggered_post,
                        watch: watch.name,
                        triggered_word: not.triggered_word,
                        submission_created_at: new Date(not.submission_created_at),
                        subreddit: watch.subreddit,
                    })
                })
            })
            notificationList.sort((a, b) => (a.sent_at < b.sent_at) ? 1 : -1)
            setSortedNotifications(notificationList)
        }

    }, [sentNotifications.notifications.data])

    useEffect(() => {

    }, [sortedNotifications])


    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Subreddit</TableCell>
                            <TableCell>Sent At</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Post ID</TableCell>
                            <TableCell align="right">Watch</TableCell>
                            <TableCell align="right">Word</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedNotifications.map((row) => (

                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{row.subreddit}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.sent_at.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}
                                </TableCell>
                                <TableCell align="right">{row.submission_created_at.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</TableCell>
                                <TableCell align="right">{row.triggered_post}</TableCell>
                                <TableCell align="right">{row.watch}</TableCell>
                                <TableCell align="right">{row.triggered_word}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Notifications;
