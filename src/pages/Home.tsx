import {useWatches, useNotificatoinServices} from "../util/queries";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import {useAuth} from "../hooks/useAuth";
import EditWatchModal from "../components/home/EditWatchModal";
import {useCallback, useState} from "react";
import {NotificationService, Watch} from "../interfaces/common";
import MonitorPreview from "../components/home/MonitorPreview";
import {red} from "@mui/material/colors";
import {withSnackbar} from "notistack";

const Home = ({enqueueSnackbar}: any) => {
    const [watchEditIsOpen, setWatchEditIsOpen] = useState<boolean>(false);
    const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

    const auth = useAuth();
    const watches = useWatches('barrycarey');
    const notificationServices = useNotificatoinServices('barrycarey');
    const queryClient = useQueryClient();
    const updateWatch = useMutation(
        (newWatch: Watch) => axios.patch(`${process.env.REACT_APP_STALKER_API}/watch?token=${localStorage.getItem('token')}`, newWatch),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['watches']);
                enqueueSnackbar('Watch saved', {variant: 'success'})
                setWatchEditIsOpen(!watchEditIsOpen);
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed to save: ${error}`, {variant: 'error'})
            }
        }
    )
    const createWatch = useMutation(
        (newWatch: Watch) => axios.post(`${process.env.REACT_APP_STALKER_API}/watch?token=${localStorage.getItem('token')}`, newWatch),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['watches'])
            },
        }
    )

    const closeEditModal = useCallback(() => {
        setSelectedWatch(null);
    }, [watchEditIsOpen])

    const openEditModal = useCallback((selectedWatch: Watch) => {
        setSelectedWatch(selectedWatch);
        setWatchEditIsOpen(true);
    }, [])

    const saveWatch = useCallback((watch: Watch) => {
        console.log('Calling Save')
        updateWatch.mutate(watch);
        setWatchEditIsOpen(false);
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

export default withSnackbar(Home);
