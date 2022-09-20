import {useQuery} from "react-query";
import axios from "axios";

export const useMonitors = (username: string) => {
    return useQuery(['monitors'], async () => {
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
