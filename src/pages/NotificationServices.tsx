import {useNotificatoinServices} from "../util/queries";
import {Box, Button, Grid, Typography} from "@mui/material";
import {NotificationService} from "../interfaces/common";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationServiceRow from "../components/notificationsvc/NotificationServiceRow";
import {useCallback, useState} from "react";
import NotificationSvcEditModal from "../components/notificationsvc/NotificationSvcEditModal";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";

const NotificationServices = () => {
    const notificationServices = useQuery(['notificationServices'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/notification-svc/barrycarey?token=${localStorage.getItem('token')}`);
        return data;
    });
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedSvc, setSelectedSvc] = useState<NotificationService | null>(null);
    const queryClient = useQueryClient();
    const updateNotificationSvc = useMutation(
        (newSvc: NotificationService) => axios.post(`${process.env.REACT_APP_STALKER_API}/notification-svc?token=${localStorage.getItem('token')}`, newSvc),
        {
            onSuccess: () => {
                // ✅ refetch the comments list for our blog post
                queryClient.invalidateQueries(['notificationServices'])
            },
        }
    )


    const openEditBox = useCallback((notificationSvc: NotificationService) => {
        setSelectedSvc(notificationSvc);
        setEditOpen(true);
    }, [])

    const closeEditBox = useCallback(() => {
        console.log('closeEditBox')
        setEditOpen(false);
        setSelectedSvc(null);
    }, [])

    const saveNotificationSvc = useCallback((svcToEdit: NotificationService) => {
        console.log('Calling Save')
        updateNotificationSvc.mutate(svcToEdit);
    }, [notificationServices])

    const addOnClick = useCallback(() => {
        console.log('Plus onclick')
        openEditBox({name: '', url: '', owner_id: null, id: null})
    }, [notificationServices])

    if (notificationServices.data) {
        return (

                <div>
                    <div><AddCircleIcon onClick={addOnClick}/></div>
                {notificationServices.data.map(
                    (svc: NotificationService) => (
                        <NotificationServiceRow notificationSvc={svc} openEdit={openEditBox}/>
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
