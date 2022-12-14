import {Avatar, Box, Card, CardActionArea, CardContent, CardHeader, Paper, Typography} from "@mui/material";
import {SentNotification, SubredditIcon} from "../../interfaces/common";
import {useCallback} from "react";

type CompProps = {
    notification: SentNotification,
    subredditIcons: SubredditIcon[]
}

export const SentNotificationBlock = ({notification, subredditIcons}: CompProps) => {

    const getDisplayDate = (timestamp: string): string => {
        let dateObj = new Date(timestamp);
        return dateObj.toLocaleString();
    }

    const getSubredditAvatar = useCallback(() => {
        let found = subredditIcons.find(i => i.subreddit === notification.watch.subreddit)
        if (found) {
            return <Avatar aria-label={notification.watch.subreddit} src={found.iconPath}/>
        } else {
            <Avatar aria-label={notification.watch.subreddit}>{notification.watch.subreddit[0].toUpperCase()}</Avatar>
        }
    }, [subredditIcons, notification])

    return (
        <Box sx={{background: "#121212", borderRadius: 2, textAlign: "left"}}>
            <Card sx={{
                border: "solid 1px #4f4f4f",

            }}>
                <CardActionArea onClick={() => window.open(`https://redd.it/${notification.triggered_post}`)}>
                    <CardHeader
                        avatar={
                            getSubredditAvatar()
                        }

                        title={notification.watch.name}
                        subheader={getDisplayDate(notification.sent_at)}
                    />
                    <CardContent>
                        <Box sx={{textAlign: "left", padding: "5px"}}>
                            <Typography variant="body1"><strong>Trigger:</strong> {notification.triggered_word}</Typography>
                            <Typography variant="body1"><strong>Delay:</strong> {notification.actual_delay} seconds</Typography>
                        </Box>
                    </CardContent>

                        <Box sx={{m: 1, textAlign: "center"}}>
                            r/{notification.watch.subreddit}
                        </Box>
                </CardActionArea>
            </Card>

        </Box>
    )
}
