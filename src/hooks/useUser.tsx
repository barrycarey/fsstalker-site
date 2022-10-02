import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {RedditUserData, User} from "../interfaces/common";


export function useUser(userData: RedditUserData | null) {
    const queryClient = useQueryClient();

    const user = useQuery<User, Error>(['userData'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/user/${userData?.username}?token=${userData?.authToken}`);
        return data;
    });

    return {
        user
    }
}
