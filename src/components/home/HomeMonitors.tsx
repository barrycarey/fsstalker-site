import {useWatches, useNotificatoinServices} from "../../util/queries";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import {useAuth} from "../../hooks/useAuth";
import EditWatchModal from "./EditWatchModal";
import {useCallback, useEffect, useState} from "react";
import {NotificationService, Watch} from "../../interfaces/common";
import MonitorPreview from "./MonitorPreview";
import {red} from "@mui/material/colors";
import {withSnackbar} from "notistack";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type CompProps = {
    enqueueSnackbar: any,
    username: string
}

const HomeMonitors = ({enqueueSnackbar, username}: any) => {
    const [watchEditIsOpen, setWatchEditIsOpen] = useState<boolean>(false);
    const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

    const watches = useWatches(username);
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
                enqueueSnackbar('Watch created', {variant: 'success'})
                setWatchEditIsOpen(!watchEditIsOpen);
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed to create: ${error}`, {variant: 'error'})
            }
        }
    )

    const closeEditModal = useCallback(() => {
        setSelectedWatch(null);
        setWatchEditIsOpen(false);
    }, [watchEditIsOpen])

    const openEditModal = useCallback((selectedWatch: Watch) => {
        setSelectedWatch(selectedWatch);
        setWatchEditIsOpen(true);
    }, [])

    const saveWatch = useCallback((watch: Watch) => {
        console.log('Calling Save')
        if (watch.id !== null) {
            updateWatch.mutate(watch);
        } else {
            createWatch.mutate(watch);
        }

    }, [watches.data])

    const addOnClick = useCallback(() => {
        setSelectedWatch(null);
        setWatchEditIsOpen(true);
    }, [])

    if (watches.data) {
        return (
            <Box>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={12}>
                        <Box><AddCircleIcon onClick={addOnClick}/></Box>
                    </Grid>
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
        <Box>Loading {username}</Box>
    )
}

export default withSnackbar(HomeMonitors);
