import {useNotificatoinServices} from "../util/queries";

const NotificationServices = () => {
    const notificationServices = useNotificatoinServices('barrycarey');
    return (
        <div><h1>Notificatoin Services</h1></div>
    )
}

export default NotificationServices;
