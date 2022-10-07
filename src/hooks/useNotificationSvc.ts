import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useSnackbar} from "notistack";
import {NotificationService, RedditUserData} from "../interfaces/common";
import {useEffect, useState} from "react";

export function useNotificationSvc(userData: RedditUserData | null) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [queryEnabled, setQueryEnabled] = useState<boolean>(false);

    useEffect(() => {
        if (userData != null) {
            console.log('useNotificationSvc: useEffect[userData] - Enabling query')
            setQueryEnabled(true);
        } else {
            console.log('useNotificationSvc: useEffect[userData] - Disabling query')
            setQueryEnabled(false);
        }
    }, [userData])

    const services = useQuery(['notificationServices'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/notification-svc/${userData?.username}?token=${userData?.authToken}`);
        return data;
    }, {enabled: queryEnabled});

    const updateSvc = useMutation(
        (newSvc: NotificationService) => axios.post(`${process.env.REACT_APP_STALKER_API}/notification-svc?token=${userData?.authToken}`, newSvc),
        {
            onSuccess: () => {
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
