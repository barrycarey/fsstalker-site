import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Watch} from "../../interfaces/common";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

type CompProps = {
    watch: Watch
    onSelect: (watch: Watch) => void
}

const MonitorPreview = ({watch, onSelect}: CompProps) => {

    const [bannerImg, setBannerImg] = useState<string>();

    useEffect(() => {
        axios.get(`https://oauth.reddit.com/r/${watch.subreddit}/about`, {
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
                console.log(`Failed to get banner for ${watch.subreddit}`)
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
                        alt="green iguana"
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
