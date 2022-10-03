import {Box, Drawer, styled} from "@mui/material";
import {UserNotification, Watch} from "../../interfaces/common";
import {useAuth} from "../../util/auth";
import {useUser} from "../../hooks/useUser";
import LoadScreen from "./LoadScreen";
import {useEffect, useState} from "react";

type CompProps = {
    isOpen: boolean
    closeDrawer: () => void
}
export const NotificationDrawer = ({isOpen, closeDrawer}: CompProps) => {

    const auth = useAuth();
    const userData = useUser(auth?.userData);
    const [notificationList, setNotificationList] = useState<UserNotification[]>([]);

    useEffect(() => {
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


    const NotificationRow = styled('div')({
        borderRadius: 2,
        maxWidth: '100%',
        height: '55px',
        background: '#3d3d3d',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        padding: 6,
        alignItems: 'center',
        marginBottom: 10,
        verticalAlign: 'middle',
    })

    if (userData.unreadNotifications.isLoading) {
        return <LoadScreen />
    }

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => closeDrawer()}
        >
            <Box sx={{width: "350px"}}>

            </Box>
        </Drawer>
    )
}
