import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useSnackbar} from "notistack";
import {NotificationService} from "../interfaces/common";

export function useNotificationSvc(username: string | undefined) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const services = useQuery(['notificationServices'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/notification-svc/${username}?token=${localStorage.getItem('token')}`);
        return data;
    });

    const updateSvc = useMutation(
        (newSvc: NotificationService) => axios.post(`${process.env.REACT_APP_STALKER_API}/notification-svc?token=${localStorage.getItem('token')}`, newSvc),
        {
            onSuccess: () => {
                // ✅ refetch the comments list for our blog post
                queryClient.invalidateQueries(['notificationServices'])
                enqueueSnackbar('Notification Service Saved', {variant: 'success'})
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed to save: ${error}`, {variant: 'error'})
            }
        }
    )

    const deleteSVc = useMutation(
        (id: number) => axios.delete(`${process.env.REACT_APP_STALKER_API}/notification-svc/${id}?token=${localStorage.getItem('token')}`),
        {
            onSuccess: () => {
                // ✅ refetch the comments list for our blog post
                queryClient.invalidateQueries(['notificationServices'])
                enqueueSnackbar('Notification Service Deleted', {variant: 'success'})
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed to delete: ${error}`, {variant: 'error'})
            }
        }
    )

    return {
        services,
        update: updateSvc,
        delete: deleteSVc
    };
}
