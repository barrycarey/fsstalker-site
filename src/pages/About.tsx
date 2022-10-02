import {Box, Divider, Typography} from "@mui/material";
import {useEffect} from "react";

const About = () => {

    return (
        <Box>
            <Typography variant={"h3"}>About BST Sleuth</Typography>
            <Divider />
            <Typography variant={"body1"} sx={{mt: 3}}>
                Have you ever missed an awesome deal on Reddit because their notifications are too slow? That's not an issue with
                BST Sleuth!
            </Typography>

            <Typography variant={"body1"}>
                Setup custom alerts that can trigger the second a new post is created with matching criteria.
            </Typography>
        </Box>
    )
}

export default About;
