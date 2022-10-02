import {useQuery} from "react-query";
import {RedditUserData, Watch} from "../interfaces/common";
import axios from "axios";

export function useSentNotifications(userData: RedditUserData | null) {

    const notifications = useQuery<Watch[], Error>(['sentNotifications'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/sent-notifications/${userData?.username}?token=${userData?.authToken}`);
        return data;
    });

    return {
        notifications
    }
}
