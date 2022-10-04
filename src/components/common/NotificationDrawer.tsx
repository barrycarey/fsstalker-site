import {Box, Button, Divider, Drawer, styled, Typography} from "@mui/material";
import {UserNotification, Watch} from "../../interfaces/common";
import {useAuth} from "../../util/auth";
import {useUser} from "../../hooks/useUser";
import LoadScreen from "./LoadScreen";
import {useCallback, useEffect, useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

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
        if (userData.unreadNotifications.data) {
            let unread: UserNotification[] = [];
            userData.unreadNotifications.data.forEach((notification: UserNotification) => {
                if (!notification.read) {
                    unread.push(notification)
                }
            })
            setNotificationList(unread);
        }
    }, [userData.unreadNotifications.data])

    const markNotificationRead = useCallback((id: number) => {
        let selectedNotification = notificationList.find(n => n.id === id);
        if (selectedNotification) {
            selectedNotification.read = true;
            userData.markNotificationRead.mutate(selectedNotification);
        }
    }, [notificationList])

    const markNotificationReadNew = useCallback((id: number) => {
        let selectedNotificationIdx = notificationList.findIndex(n => n.id === id);
        if (selectedNotificationIdx !== -1) {
            notificationList[selectedNotificationIdx].read = true;
            userData.markNotificationRead.mutate(notificationList[selectedNotificationIdx]);
            setNotificationList(prevState => {
                let newList = [...prevState];
                newList.splice(selectedNotificationIdx, 1);
                console.log(newList)
                return newList;
            })
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
            <Box sx={{width: "350px"}}>
                <Box><Typography variant={"h5"} sx={{textAlign: "center", width: "100%"}}>Notifications</Typography> </Box>
                <Box sx={{width: "100%", mb: 2, mt: 1, justifyContent: "center"}}>
                    <Button variant="contained" color="info" size="small">Mark All Read</Button>
                </Box>
                <Divider sx={{ mb: 2}}/>
                {notificationList.map(n => (
                    <NotificationRow>
                        <NotificationRowSection sx={{width: "12%", justifyContent: "center"}}>
                            <NotificationsIcon onClick={() => {markNotificationReadNew(n.id)}}/>
                        </NotificationRowSection>
                        <NotificationRowSection sx={{width: "88%"}}>
                            {n.message}
                        </NotificationRowSection>
                    </NotificationRow>
                ))}
            </Box>
        </Drawer>
    )
}
