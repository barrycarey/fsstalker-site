import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Monitor} from "../interfaces/common";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

type CompProps = {
    monitor: Monitor
}

const MonitorPreview = ({monitor}: CompProps) => {

    const [bannerImg, setBannerImg] = useState<string>();

    useEffect(() => {
        axios.get(`https://oauth.reddit.com/r/${monitor.subreddit}/about`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('Bad status from Reddit')
                    return;
                }
                setBannerImg(res.data.data.banner_background_image.split('?')[0])
            })
            .catch((error) => {
                console.log(`Failed to get banner for ${monitor.subreddit}`)
            })

    }, [bannerImg])

    return (
        <div>
            <Card sx={{ maxWidth: 275 }}>
                <CardActionArea>
                {bannerImg != null &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={bannerImg}
                        alt="green iguana"
                    />
                }

                    <CardContent>
                        <Grid container>
                            <Grid item>

                            </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            r/{monitor.subreddit}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {monitor.name}
                        </Typography>
                        <Typography color="text.secondary">
                            Include
                        </Typography>
                        <Typography variant="body2">
                            {monitor.include}
                        </Typography>
                        <Typography color="text.secondary">
                            Exclude
                        </Typography>
                        <Typography variant="body2">
                            {monitor.exclude}
                        </Typography>
                    </CardContent>

                </CardActionArea>

            </Card>
        </div>
    )
}

export default MonitorPreview;
