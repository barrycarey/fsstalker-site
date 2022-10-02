import {NotificationService} from "../interfaces/common";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationServiceRow from "../components/notificationsvc/NotificationServiceRow";
import {useCallback, useState} from "react";
import NotificationSvcEditModal from "../components/notificationsvc/NotificationSvcEditModal";
import {RoundedRow} from "../util/styles";
import {useNotificationSvc} from "../hooks/useNotificationSvc";
import { useAuth } from "../util/auth";

const NotificationServices = () => {

    const authCtx = useAuth();
    const notificationServices = useNotificationSvc(authCtx?.userData);

    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedSvc, setSelectedSvc] = useState<NotificationService | null>(null);

    const openEditBox = useCallback((notificationSvc: NotificationService) => {
        setSelectedSvc(notificationSvc);
        setEditOpen(true);
    }, [])

    const closeEditBox = useCallback(() => {
        setEditOpen(false);
        setSelectedSvc(null);
    }, [])

    const saveNotificationSvc = useCallback((svcToEdit: NotificationService) => {
        notificationServices.update.mutate(svcToEdit);
        setEditOpen(false);
    }, [notificationServices])

    function deleteNotificationSvc(id: number) {
        notificationServices.delete.mutate(id);
        setEditOpen(false);
    }

    const addOnClick = useCallback(() => {
        openEditBox({name: '', url: '', owner_id: null, id: null})
    }, [notificationServices])

    if (notificationServices.services.data) {
        return (
                <div >
                    <RoundedRow onClick={addOnClick} sx={{mt: 2, justifyContent: "center"}}><AddCircleIcon sx={{color: "green", fontSize: "2rem"}} /></RoundedRow>
                {notificationServices.services.data.map(
                    (svc: NotificationService) => (
                        <NotificationServiceRow notificationSvc={svc} openEdit={openEditBox} deleteSvc={deleteNotificationSvc}/>
                    )
                )}
                    <NotificationSvcEditModal saveNotificationSvc={saveNotificationSvc} open={editOpen} serviceToEdit={selectedSvc} closeEdit={closeEditBox} />
                </div>
        )
    }

    return (
        <div>Not Loaded</div>
    )
}

export default NotificationServices;
