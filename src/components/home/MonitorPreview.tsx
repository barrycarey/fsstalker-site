import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Watch} from "../../interfaces/common";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../util/auth";

type CompProps = {
    watch: Watch
    onSelect: (watch: Watch) => void
}

const MonitorPreview = ({watch, onSelect}: CompProps) => {
    const auth = useAuth();
    const [bannerImg, setBannerImg] = useState<string>();

    useEffect(() => {
        console.log(`MonitorPreview:useEffect - Requesting subreddit banner - ${auth.userData?.authToken}`)
        axios.get(`https://oauth.reddit.com/r/${watch.subreddit}/about`, {
            headers: { Authorization: `Bearer ${auth.userData?.authToken}` }
        })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('MonitorPreview:useEffect - Bad status code from Reddit')
                    return;
                }
                setBannerImg(res.data.data.banner_background_image.split('?')[0])
            })
            .catch((error) => {
                console.log(`MonitorPreview:useEffect - Failed to get banner for ${watch.subreddit}`)
            })

    }, [bannerImg])

    return (

            <Card>
                <CardActionArea onClick={() => onSelect(watch)}>
                {bannerImg != null &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={bannerImg}
                        alt="Subreddit Banner"
                    />
                }

                    <CardContent>
                        <Grid container>
                            <Grid item>

                            </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            r/{watch.subreddit}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {watch.name}
                        </Typography>
                        <Typography color="text.secondary">
                            Include
                        </Typography>
                        <Typography variant="body2">
                            {watch.include}
                        </Typography>
                        <Typography color="text.secondary">
                            Exclude
                        </Typography>
                        <Typography variant="body2">
                            {watch.exclude}
                        </Typography>
                    </CardContent>

                </CardActionArea>

            </Card>

    )
}

export default MonitorPreview;
