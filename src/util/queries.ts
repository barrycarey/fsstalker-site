import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {NotificationService} from "../interfaces/common";

export const useWatches = (username: string | null) => {
    return useQuery(['watches'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/watch/${username}?token=${localStorage.getItem('token')}`);
        return data;
    });
}

export const useNotificatoinServices = (username: string) => {
    return useQuery(['notificationServices'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/notification-svc/${username}?token=${localStorage.getItem('token')}`);
        return data;
    });
}

