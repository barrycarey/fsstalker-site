import {useMutation, useQuery, useQueryClient} from "react-query";
import {useSnackbar} from "notistack";
import axios, {AxiosError} from "axios";
import {RedditUserData, Watch} from "../interfaces/common";


export function useWatches(userData: RedditUserData | null) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    console.log(`useWatches: init - Username: ${userData?.username}`)

    const watches = useQuery<Watch[], Error>(['watches'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/watch/${userData?.username}?token=${userData?.authToken}`);
        return data;
    });

    const create = useMutation(
        (newWatch: Watch) => axios.post(`${process.env.REACT_APP_STALKER_API}/watch?token=${userData?.authToken}`, newWatch),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['watches'])
                enqueueSnackbar('Watch created', {variant: 'success'})
            },
            onError: (error: AxiosError, variables, context) => {
                // @ts-ignore
                enqueueSnackbar(`'Failed to create: ${error.response.data.detail}`, {variant: 'error'})
            }
        }
    )

    const update = useMutation(
        (newWatch: Watch) => axios.patch(`${process.env.REACT_APP_STALKER_API}/watch?token=${userData?.authToken}`, newWatch),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['watches']);
                enqueueSnackbar('Watch saved', {variant: 'success'})
            },
            onError: (error, variables, context) => {
                // @ts-ignore
                enqueueSnackbar(`'Failed to save: ${error.response.data.detail}`, {variant: 'error'})
            }
        }
    )

    const deleteWatch = useMutation(
        (id: number) => axios.delete(`${process.env.REACT_APP_STALKER_API}/watch/${id}?token=${userData?.authToken}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['watches']);
                enqueueSnackbar('Watch Deleted', {variant: 'success'})
            },
            onError: (error, variables, context) => {
                enqueueSnackbar(`'Failed To Delete: ${error}`, {variant: 'error'})
            }
        }
    )

    return {
        watches,
        create,
        update,
        delete: deleteWatch
    };
}
