import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {NotificationService, RedditUserData, User, UserNotification} from "../interfaces/common";
import {useSnackbar} from "notistack";


export function useUser(userData: RedditUserData | null) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const user = useQuery<User, Error>(['userData'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/user/${userData?.username}?token=${userData?.authToken}`);
        return data;
    });

    const unreadNotifications = useQuery<UserNotification[], Error>(['userNotifications'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/user-notifications/${userData?.username}?token=${userData?.authToken}&unread=true`);
        return data;
    });

    const create = useMutation(
        ( ) => axios.post(`${process.env.REACT_APP_STALKER_API}/user?token=${userData?.authToken}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['userData'])
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed to create user: ${error}`, {variant: 'error'})
            }
        }
    )

    const markNotificationRead = useMutation(
        (notification: UserNotification) => axios.patch(`${process.env.REACT_APP_STALKER_API}/user-notifications?token=${userData?.authToken}`, notification),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['UserNotification'])
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed to mark notification as read: ${error}`, {variant: 'error'})
            }
        }
    )

    return {
        user,
        create,
        unreadNotifications,
        markNotificationRead
    }
}
