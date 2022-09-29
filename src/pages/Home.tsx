import AuthConsumer, {useAuth} from "../hooks/useAuth";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import {Watch} from "../interfaces/common";
import {useWatches} from "../hooks/useWatches";
import {RoundedRow} from "../util/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MonitorPreview from "../components/home/MonitorPreview";
import EditWatchModal from "../components/home/EditWatchModal";
import {useUser} from "../hooks/useUser";

const Home = () => {
    const [watchEditIsOpen, setWatchEditIsOpen] = useState<boolean>(false);
    const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
    const authCtx = AuthConsumer();

    const watches = useWatches(authCtx.userData?.username);
    const userData = useUser(authCtx.userData?.username)

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
            watches.update.mutate(watch);
        } else {
            watches.create.mutate(watch);
        }
        setWatchEditIsOpen(false);

    }, [watches.watches])

    const deleteWatch = (id: number) => {
        watches.delete.mutate(id);
        setWatchEditIsOpen(false);
        setSelectedWatch(null);
    }

    const addOnClick = useCallback(() => {
        setSelectedWatch(null);
        setWatchEditIsOpen(true);
    }, [selectedWatch])

    if (watches.watches.data) {
        return (
            <Box>
                <RoundedRow onClick={addOnClick} sx={{mt: 2, justifyContent: "center"}}><AddCircleIcon sx={{color: "green", fontSize: "2rem"}} /></RoundedRow>
                <Grid container spacing={2} sx={{mt: 1}}>
                    {watches.watches.data.map(
                        (monitor: Watch) => (
                            <Grid item xs={12} xl={6} sx={{borderColor: "red"}} key={monitor.id}>
                                <MonitorPreview watch={monitor} onSelect={openEditModal}/>
                            </Grid>
                        )
                    )}
                </Grid>

                <EditWatchModal
                    isOpen={watchEditIsOpen}
                    closeModal={closeEditModal}
                    saveWatch={saveWatch}
                    watch={selectedWatch}
                    deleteWatch={deleteWatch}
                 />
            </Box>
        )
    }

    if (watches.watches.error) {
        return (
            <Box><Typography variant="h4" color="error" >Problem loading data</Typography> </Box>
        )

    }

    return (
        <Box>
            <CircularProgress />
        </Box>
    )
}

export default Home;
