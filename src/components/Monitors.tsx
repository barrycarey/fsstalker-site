import {Grid} from "@mui/material";
import {Watch} from "../interfaces/common";
import MonitorPreview from "./MonitorPreview";

type CompPromps = {
    monitors: Watch[]
}

const Monitors = ({monitors}: CompPromps) => {

    return (
        <div>
            <Grid container spacing={2} sx={{mt: 2}}>
                {monitors.map(
                    (monitor: Watch) => (
                        <Grid item xs={12} xl={3}>
                        </Grid>
                    )
                )}
            </Grid>
        </div>
    )
}

export default Monitors;
