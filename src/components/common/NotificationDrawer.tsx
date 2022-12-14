import {Box, Button, Divider, Drawer, styled, Typography, Zoom} from "@mui/material";
import {UserNotification, Watch} from "../../interfaces/common";
import {useAuth} from "../../util/auth";
import {useUser} from "../../hooks/useUser";
import LoadScreen from "./LoadScreen";
import {useCallback, useEffect, useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import {useQueryClient} from "react-query";

type CompProps = {
    isOpen: boolean
    closeDrawer: () => void
}
export const NotificationDrawer = ({isOpen, closeDrawer}: CompProps) => {

    const auth = useAuth();
    const userData = useUser(auth?.userData);
    const [notificationList, setNotificationList] = useState<UserNotification[]>([]);


    useEffect(() => {
        console.log('NotificationDrawer:useEffect - Updating notificaiton list')
        console.log(userData.user.data)
        if (!auth.userData) {
            console.log('NotificationDrawer:useEffect - Setting empty notify list')
            setNotificationList([]);
        }
        if (userData.unreadNotifications.data) {
            let unread: UserNotification[] = [];
            userData.unreadNotifications.data.forEach((notification: UserNotification) => {
                if (!notification.read) {
                    unread.push(notification)
                }
            })
            setNotificationList(unread);
        }
    }, [userData.unreadNotifications.data, auth.userData])

    const markNotificationRead = useCallback((id: number) => {
        let selectedNotification = notificationList.find(n => n.id === id);
        if (selectedNotification) {
            selectedNotification.read = true;
            userData.markNotificationRead.mutate(selectedNotification);
        }
    }, [notificationList])

    const markAllAsRead = useCallback(() => {
        notificationList.forEach((n) => {
            n.read = true;
            userData.markNotificationRead.mutate(n);
        })
    }, [notificationList])

    const markNotificationReadNew = useCallback((id: number) => {
        let selectedNotificationIdx = notificationList.findIndex(n => n.id === id);
        if (selectedNotificationIdx !== -1) {
            notificationList[selectedNotificationIdx].read = true;
            userData.markNotificationRead.mutate(notificationList[selectedNotificationIdx]);
            /*
            setNotificationList(prevState => {
                let newList = [...prevState];
                newList.splice(selectedNotificationIdx, 1);
                console.log(newList)
                return newList;
            })

             */
        }
    }, [notificationList])

    const NotificationRow = styled('div')({
        borderRadius: 2,
        maxWidth: '100%',
        maxHeight: '100px',
        background: '#3d3d3d',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        padding: 6,
        alignItems: 'center',
        marginBottom: 10,
        verticalAlign: 'middle',
    })

    const NotificationRowSection = styled('div')({
        height: '100%',
        justifyContent: 'left',
        borderStyle: 'solid',
        borderWidth: 0,
        overflow: 'hidden',
        alignItems: 'center',
        display: 'inline-flex',
    })

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => closeDrawer()}
        >
            <Box sx={{width: "450"}}>
                <Box><Typography variant={"h5"} sx={{textAlign: "center", width: "100%"}}>Notifications</Typography> </Box>
                <Box sx={{width: "100%", mb: 2, mt: 1, justifyContent: "center"}}>
                    <Button variant="text" color="info" size="small" onClick={markAllAsRead}>Mark All Read</Button>
                    <Button variant="text" color="info" size="small" onClick={() => closeDrawer()}>Close</Button>
                </Box>
                <Divider sx={{ mb: 2}}/>
                {notificationList.map(n => (
                    <Zoom in={!n.read} key={n.id}>
                        <NotificationRow >
                            <NotificationRowSection sx={{width: "12%", justifyContent: "center"}}>
                                <NotificationsIcon />
                            </NotificationRowSection>
                            <NotificationRowSection sx={{width: "80%"}}>
                                {n.message}
                            </NotificationRowSection>
                            <NotificationRowSection sx={{width: "8%"}}>
                                <CloseIcon onClick={() => {markNotificationReadNew(n.id)}}/>
                            </NotificationRowSection>
                        </NotificationRow>
                    </Zoom>
                ))}
            </Box>
        </Drawer>
    )
}
