import {useMonitors, useNotificatoinServices} from "../util/queries";
import {useQuery} from "react-query";
import axios from "axios";
import Monitors from "../components/Monitors";
import {Box} from "@mui/material";
import {useAuth} from "../hooks/useAuth";

const Home = () => {
    const auth = useAuth();
    const monitors = useMonitors('barrycarey');
    const notificationServices = useNotificatoinServices('barrycarey');

    return (
        <Box>
            {!monitors.isLoading &&
                <Monitors monitors={monitors?.data} />
            }
        </Box>



    )
}

export default Home
