import {NotificationService} from "../../interfaces/common";
import {Box, Grid, Paper, styled} from "@mui/material";
import {useCallback} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {RoundedRow, RoundedRowSections} from "../../util/styles";
import {useSnackbar} from "notistack";

type CompProps = {
    notificationSvc: NotificationService,
    openEdit: (notificationSvc: NotificationService) => void,
    deleteSvc: (id: number) => void
}



const NotificationServiceRow = ({notificationSvc, openEdit, deleteSvc}: CompProps) => {

    const { enqueueSnackbar } = useSnackbar();

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
                <RoundedRowSections sx={{flexBasis: '50px'}} onClick={boxOnClick}>Icon</RoundedRowSections>
                <RoundedRowSections sx={{flexBasis: '100%'}} onClick={boxOnClick}>{notificationSvc.name}</RoundedRowSections>
                <RoundedRowSections sx={{flexBasis: '50px'}}><DeleteIcon onClick={deleteOnClick} /></RoundedRowSections>
            </RoundedRow>

    )
}

export default NotificationServiceRow;
