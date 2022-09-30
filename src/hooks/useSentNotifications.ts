import {useQuery} from "react-query";
import {Watch} from "../interfaces/common";
import axios from "axios";

export function useSentNotifications(username: string | undefined) {

    const notifications = useQuery<Watch[], Error>(['sentNotifications'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/sent-notifications/${username}?token=${localStorage.getItem('token')}`);
        return data;
    });

    return {
        notifications
    }
}
