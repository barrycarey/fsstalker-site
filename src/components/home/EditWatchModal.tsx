import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, FormControlLabel, FormGroup, Grid, styled, Switch,
    TextField, Typography
} from "@mui/material";
import {NotificationService, Watch} from "../../interfaces/common";
import {useCallback, useEffect, useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MonitorPreview from "./MonitorPreview";
import {useNotificatoinServices} from "../../util/queries";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TriggerWords from "./TriggerWords";

type CompProps = {
    isOpen: boolean,
    closeModal: () => void,
    saveWatch: (watch: Watch) => void,
    watch: Watch | null,
}

const newWatch: Watch = {
    active: false,
    exclude: "",
    include: "",
    name: "",
    notification_services: [],
    subreddit: "",
    id: null,
    owner_id: null

}

const ContainingBox = styled('div')({
    borderRadius: 6,
    maxWidth: '100%',
    height: '55px',
    background: '#3d3d3d',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    padding: 6,
    alignItems: 'center',
    verticalAlign: 'middle',
})

const SubBox = styled('div')({
    height: '100%',
    justifyContent: 'left',
    borderStyle: 'solid',
    borderWidth: 0,
    overflow: 'hidden',
    alignItems: 'center',
    display: 'inline-flex',
})

const EditWatchModal = ({isOpen, closeModal, watch, saveWatch}: CompProps) => {
    const notificationServices = useNotificatoinServices('barrycarey');
    const [selectedWatch, setSelectedWatch] = useState<Watch>({...newWatch});
    const [availableNotificationSvc, setAvailableNotificationSvc] = useState<NotificationService[]>([]);
    useEffect(() => {
        if (watch != null) {
            setSelectedWatch(watch);
        }
    }, [watch])

    useEffect(() => {
        let availableSvc: NotificationService[] = [];
        if (!notificationServices.data) {
            setAvailableNotificationSvc(availableSvc);
            return;
        }
        console.log('Avaialbe services')
        console.log(notificationServices.data);
        notificationServices.data.forEach((svc: NotificationService) => {
            let activeIdx = selectedWatch.notification_services.findIndex((i) => i.id === svc.id);
            if (activeIdx === -1) {
                availableSvc.push(svc);
            }
        })
        setAvailableNotificationSvc(availableSvc);
    }, [selectedWatch])

    const updateIncludeWords = useCallback((words: string) => {
        setSelectedWatch((prevState) => ({...prevState, include: words}));
    }, [])

    const updateExcludeWords = useCallback((words: string) => {
        console.log(`Updating exclude with ${words}`)
        setSelectedWatch((prevState) => ({...prevState, exclude: words}));
    }, [])

    const getSaveBtnText = useCallback(() => {
        return selectedWatch.id !== null ? "Update" : "Create";
    }, [selectedWatch])

    const addNotificationSvc = useCallback((id: number | null) => {
        if (!id) {
            return;
        }
        const svcToAdd = notificationServices.data.find((svc: NotificationService) => svc.id === id);
        if (svcToAdd) {
            const newSvcList = selectedWatch.notification_services;
            newSvcList.push(svcToAdd);
            setSelectedWatch((prevState) => ({...prevState, notification_services: newSvcList}))
        }
    }, [notificationServices])

    const removeNotificationSvc = useCallback((id: number | null) => {
        if (!id) {
            return;
        }
        const svcToRemoveIdx = selectedWatch.notification_services.findIndex((svc: NotificationService) => svc.id === id);
        if (svcToRemoveIdx === -1) {
            console.log(`Failed to find active notify svc with ID ${id}`);
            return;
        }
        let newSvcList = selectedWatch.notification_services;
        console.log("removeNotificationSvc")
        console.log(newSvcList)
        newSvcList.splice(svcToRemoveIdx, 1);
        setSelectedWatch((prevState) => (
            {
                ...prevState,
                notification_services: newSvcList
            }
        ))
    }, [notificationServices, selectedWatch])


    return (
        <Box>
            <Dialog open={isOpen} onClose={closeModal}>
                <DialogTitle>Edit Watch: {selectedWatch.name}</DialogTitle>
                <DialogContent>
                    <Box>

                        <FormGroup>
                            <FormControlLabel control={<Switch
                                checked={selectedWatch.active}
                                onChange={(e: any )=> setSelectedWatch((prevState) => ({...prevState, active: !prevState.active}))}
                            />} label="Active" />
                        </FormGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Watch Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedWatch.name}
                            onChange={(e: any )=> setSelectedWatch((prevState) => ({...prevState, name: e.target.value}))}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="subreddit"
                            label="Subreddit"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedWatch.subreddit}
                            onChange={(e: any )=> setSelectedWatch((prevState) => ({...prevState, subreddit: e.target.value}))}
                        />

                        <Box sx={{mt: 2}}>
                            <Box>

                            </Box>

                            <TriggerWords triggerWords={selectedWatch.include} updateTriggerWords={updateIncludeWords} greenChip={true} title="Trigger Words"/>
                            <TriggerWords triggerWords={selectedWatch.exclude} updateTriggerWords={updateExcludeWords} greenChip={false} title="Exclude Words"/>
                        </Box>

                    </Box>
                    <Box sx={{mt: 2}}>
                        <Typography variant={"h6"}>Active Notification Services</Typography>
                            {selectedWatch.notification_services.map(
                                (svc: NotificationService) => (
                                    <>
                                    <ContainingBox sx={{mt: 2}} key={svc.id}>
                                        <SubBox sx={{flexBasis: "50px"}}><NotificationsIcon /></SubBox>
                                        <SubBox sx={{flexBasis: '100%'}}>{svc.name}</SubBox>
                                        <SubBox sx={{flexBasis: "50px"}}><DeleteIcon onClick={() => removeNotificationSvc(svc.id)}/></SubBox>
                                    </ContainingBox>
                                    </>
                                )
                            )}
                    </Box>
                    <Box sx={{mt: 2}}>
                        <Typography variant={"h6"}>Inactive Notification Services</Typography>
                        {availableNotificationSvc.map(
                            (svc: NotificationService) => (
                                <>
                                    <ContainingBox sx={{mt: 2}}>
                                        <SubBox sx={{flexBasis: "50px"}}><NotificationsOffIcon /></SubBox>
                                        <SubBox sx={{flexBasis: '100%'}}>{svc.name}</SubBox>
                                        <SubBox sx={{flexBasis: "50px"}}><AddIcon onClick={() => addNotificationSvc(svc.id)} /></SubBox>
                                    </ContainingBox>
                                </>
                            )
                        )}
                    </Box>
                </DialogContent>
                <DialogActions >
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={() => saveWatch(selectedWatch)}>{getSaveBtnText()}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default EditWatchModal;
