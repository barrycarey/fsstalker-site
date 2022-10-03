import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {NotificationService, RedditUserData, User} from "../interfaces/common";
import {useSnackbar} from "notistack";


export function useUser(userData: RedditUserData | null) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const user = useQuery<User, Error>(['userData'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/user/${userData?.username}?token=${userData?.authToken}`);
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

    return {
        user,
        create
    }
}
