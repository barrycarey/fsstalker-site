import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {User} from "../interfaces/common";


export function useUser(username: string | undefined) {
    const queryClient = useQueryClient();

    const user = useQuery<User, Error>(['userData'], async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_STALKER_API}/user/${username}?token=${localStorage.getItem('token')}`);
        return data;
    });

    return {
        user
    }
}
