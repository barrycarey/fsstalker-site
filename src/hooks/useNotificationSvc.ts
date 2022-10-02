import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useSnackbar} from "notistack";
import {NotificationService, RedditUserData} from "../interfaces/common";

export function useNotificationSvc(userData: RedditUserData | null) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const services = useQuery(['notificationServices'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/notification-svc/${userData?.username}?token=${userData?.authToken}`);
        return data;
    });

    const updateSvc = useMutation(
        (newSvc: NotificationService) => axios.post(`${process.env.REACT_APP_STALKER_API}/notification-svc?token=${userData?.authToken}`, newSvc),
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
        (id: number) => axios.delete(`${process.env.REACT_APP_STALKER_API}/notification-svc/${id}?token=${userData?.authToken}`),
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
