import {useNotificatoinServices} from "../util/queries";
import {Box, Grid, Typography} from "@mui/material";
import {NotificationService} from "../interfaces/common";
import NotificationServiceRow from "../components/NotificationServiceRow";
import {useCallback, useState} from "react";

const NotificationServices = () => {
    const notificationServices = useNotificatoinServices('barrycarey');
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedSvc, setSelectedSvc] = useState<NotificationService | null>(null);

    const openEditBox = useCallback((id: number) => {
        console.log('openeditbox')
        // @ts-ignore
        let svc = notificationServices.data.find(x => x.id === id);
        console.log(svc)
        console.log(notificationServices.data)
        setSelectedSvc(notificationServices.data[id]);
        setEditOpen(true);
    }, [selectedSvc, editOpen])

    if (!notificationServices.isLoading) {
        return (
                <div>
                {notificationServices.data.map(
                    (svc: NotificationService) => (
                        <NotificationServiceRow notificationSvc={svc} openEdit={openEditBox}/>
                    )
                )}
                </div>
        )
    }

    return (
        <div>Not Loaded</div>
    )
}

export default NotificationServices;
