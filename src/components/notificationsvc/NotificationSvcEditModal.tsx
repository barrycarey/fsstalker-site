import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {NotificationService} from "../../interfaces/common";
import {FormEvent, useCallback, useEffect, useState} from "react";

type CompPromps = {
    open: boolean,
    serviceToEdit: NotificationService | null,
    closeEdit: () => void,
    saveNotificationSvc: (svc: NotificationService) => void
}

const NotificationSvcEditModal = ({open, serviceToEdit, saveNotificationSvc, closeEdit}: CompPromps) => {
    const [selectedSvc, setSelectedSvc] = useState<NotificationService>({name: '', url: '', owner_id: null, id: null});

    useEffect(() => {
        if (serviceToEdit != null) {
            setSelectedSvc(serviceToEdit);
        }
    }, [serviceToEdit])

    const closeModal = useCallback(() => {
        setSelectedSvc({name: '', url: '', owner_id: null, id: null});
        closeEdit();
    }, [])

    const getSaveBtnText = useCallback(() => {
        return selectedSvc.owner_id !== null ? "Update" : "Create";
    }, [selectedSvc])

    const saveOnClick = useCallback(() => {
        saveNotificationSvc(selectedSvc);
    }, [selectedSvc])

    return (
        <Box>
            <Dialog open={open} onClose={closeModal}>
                <DialogTitle>Edit Notification Service</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We use AppRise for notifications.  Please use their URL structure <a href="https://github.com/caronc/apprise#productivity-based-notifications" target="_blank">found here</a>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Service Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedSvc?.name}
                        onChange={(e: any )=> setSelectedSvc((prevState) => ({...prevState, name: e.target.value}))}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label="URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedSvc?.url}
                        onChange={(e: any )=> setSelectedSvc((prevState) => ({...prevState, url: e.target.value}))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={saveOnClick}>{getSaveBtnText()}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
export default NotificationSvcEditModal;
