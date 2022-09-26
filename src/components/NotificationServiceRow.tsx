import {NotificationService} from "../interfaces/common";
import {Box, Grid, styled} from "@mui/material";
import {useCallback} from "react";

type CompProps = {
    notificationSvc: NotificationService,
    openEdit: (notificationSvc: NotificationService) => void
}



const NotificationServiceRow = ({notificationSvc, openEdit}: CompProps) => {

    const boxOnClick = useCallback(() => {
        openEdit(notificationSvc);
    }, [notificationSvc])

    const ContainingBox = styled('div')({
        borderRadius: 6,
        maxWidth: '100%',
        height: '55px',
        background: '#3d3d3d',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        padding: 6,
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        verticalAlign: 'middle',
    })
    const SubBox = styled('div')({
        height: '100%',
        justifyContent: 'left',
        borderStyle: 'solid',
        borderWidth: 0,
        overflow: 'hidden',
        alignItems: 'center',
        display: 'inline-flex',
    })
    return (
        <ContainingBox onClick={boxOnClick}>
            <SubBox sx={{flexBasis: '50px'}}>Icon</SubBox>
            <SubBox sx={{flexBasis: '100%'}}>{notificationSvc.name}</SubBox>
            <SubBox sx={{flexBasis: '50px'}}>Delete</SubBox>
        </ContainingBox>
    )
}

export default NotificationServiceRow;
