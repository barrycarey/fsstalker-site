import {NotificationService} from "../../interfaces/common";
import {Avatar, Box, Grid, Paper, styled} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {RoundedRow, RoundedRowSections} from "../../util/styles";
import {useSnackbar} from "notistack";
import {logos} from "./serviceLogos";

type CompProps = {
    notificationSvc: NotificationService,
    openEdit: (notificationSvc: NotificationService) => void,
    deleteSvc: (id: number) => void
}



const NotificationServiceRow = ({notificationSvc, openEdit, deleteSvc}: CompProps) => {

    const { enqueueSnackbar } = useSnackbar();
    const [logo, setLogo] = useState<any>(null);

    const getLogo = () => {
        let match = notificationSvc.url.match('.+(?=:\\/\\/)')
        console.log(match)
        if (match !== null) {
            // @ts-ignore
            let foundLogo = logos.find(l => l.name === match[0])
            if (!foundLogo) {
                return <Avatar>{notificationSvc.name[0]}</Avatar>
            }
            return <Avatar alt="Notify Logo" src={foundLogo.image} />
        } else {
            return <Avatar>{notificationSvc.name[0]}</Avatar>
        }
    }

    const boxOnClick = useCallback(() => {
        openEdit(notificationSvc);
    }, [notificationSvc])

    const deleteOnClick = useCallback(() => {
        if (notificationSvc.id !== null) {
            deleteSvc(notificationSvc.id);
            return;
        }
        enqueueSnackbar('Failed to delete notification service', {variant: 'error'})
    }, [notificationSvc])

    return (

            <RoundedRow>
                <RoundedRowSections sx={{flexBasis: '50px'}} onClick={boxOnClick}>{getLogo()}</RoundedRowSections>
                <RoundedRowSections sx={{flexBasis: '100%'}} onClick={boxOnClick}>{notificationSvc.name}</RoundedRowSections>
                <RoundedRowSections sx={{flexBasis: '50px'}}><DeleteIcon onClick={deleteOnClick} /></RoundedRowSections>
            </RoundedRow>

    )
}

export default NotificationServiceRow;
