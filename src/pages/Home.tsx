import {useWatches, useNotificatoinServices} from "../util/queries";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import Monitors from "../components/Monitors";
import {Box, Button, Grid} from "@mui/material";
import {useAuth} from "../hooks/useAuth";
import EditWatchModal from "../components/EditWatchModal";
import {useCallback, useState} from "react";
import {NotificationService, Watch} from "../interfaces/common";
import MonitorPreview from "../components/MonitorPreview";
import {red} from "@mui/material/colors";

const Home = () => {
    const [watchEditIsOpen, setWatchEditIsOpen] = useState<boolean>(false);
    const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

    const auth = useAuth();
    const watches = useWatches('barrycarey');
    const notificationServices = useNotificatoinServices('barrycarey');
    const queryClient = useQueryClient();
    const updateWatch = useMutation(
        (newWatch: Watch) => axios.post(`${process.env.REACT_APP_STALKER_API}/watch?token=${localStorage.getItem('token')}`, newWatch),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['watches'])
            },
        }
    )

    const closeEditModal = useCallback(() => {
        setSelectedWatch(null);
        setWatchEditIsOpen(!watchEditIsOpen)
    }, [watchEditIsOpen])

    const openEditModal = useCallback((selectedWatch: Watch) => {
        setSelectedWatch(selectedWatch);
        setWatchEditIsOpen(true);
    }, [])

    const saveWatch = useCallback((watch: Watch) => {
        console.log('Calling Save')
        updateWatch.mutate(watch);
    }, [watches.data])

    if (watches.data) {
        return (
            <Box>
                <Grid container spacing={2} sx={{mt: 2}}>
                    {watches.data.map(
                        (monitor: Watch) => (
                            <Grid item xs={12} xl={6} sx={{borderColor: "red"}} key={monitor.id}>
                                <MonitorPreview watch={monitor} onSelect={openEditModal}/>
                            </Grid>
                        )
                    )}
                </Grid>

                <EditWatchModal isOpen={watchEditIsOpen} closeModal={closeEditModal} saveWatch={saveWatch} watch={selectedWatch}/>
                <Button onClick={() => setWatchEditIsOpen(!watchEditIsOpen)}>Open</Button>
            </Box>
        )
    }

    return (
        <Box>Loading</Box>
    )
}

export default Home
