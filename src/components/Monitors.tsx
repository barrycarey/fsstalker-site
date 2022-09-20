import {Grid} from "@mui/material";
import {Monitor} from "../interfaces/common";
import MonitorPreview from "./MonitorPreview";

type CompPromps = {
    monitors: Monitor[]
}

const Monitors = ({monitors}: CompPromps) => {

    return (
        <div>
            <Grid container spacing={2} sx={{mt: 2}}>
                {monitors.map(
                    (monitor: Monitor) => (
                        <Grid item xs={12} xl={3}>
                            <MonitorPreview monitor={monitor} />
                        </Grid>
                    )
                )}
            </Grid>
        </div>
    )
}

export default Monitors;
