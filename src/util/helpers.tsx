import {logos} from "../components/notificationsvc/serviceLogos";
import {Avatar} from "@mui/material";
import {NotificationService} from "../interfaces/common";

export const getNotificationSvcLogo = (notificationSvc: NotificationService): JSX.Element => {
    let match = notificationSvc.url.match('.+(?=:\\/\\/)')

    if (match !== null) {
        // @ts-ignore
        let foundLogo = logos.find(l => l.name === match[0])
        if (!foundLogo) {
            return <Avatar>{notificationSvc.name[0]}</Avatar>
        }
        return <Avatar alt="Remy Sharp" src={foundLogo.image} />
    } else {
        return <Avatar>{notificationSvc.name[0]}</Avatar>
    }
}
