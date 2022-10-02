/*
 * Copyright (c) NerdSpeak LLC 2022 all rights reserved
 */

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import useInterval from "./useInterval";
import axios from "axios";
import {useNavigate} from "react-router-dom";


type UserData = {
    username: string;
    avatar: string | null;
};

type CTXType = {
    userData: UserData | null;
    signout: () => void;
    authError: string | null;
    isLoading: boolean
};

const authContext = createContext<CTXType>({
    userData: null,
    authError: null,
    isLoading: true,
    signout: () => {},
});

export function useAuth() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [recheckDelay, setRecheckDelay] = useState<number>(10000);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    let navigate = useNavigate();


    const refreshAuth = useCallback(async () => {
        let token = await localStorage.getItem('token');
        if (!token) {
            console.log('No auth token available');
            return;
        }
        let res;

        try {
            res = await axios.get('https://oauth.reddit.com/api/v1/me/', {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (err) {
            setAuthError('Problem reaching authentication API');
            setIsLoading(false);
            return;
        }

        if (res.status !== 200) {
            console.log(`Bad status from Auth API ${res.status}`);
            setAuthError(`Bad status from Auth API ${res.status}`);
            setIsLoading(false);
            return;
        }

        setUserData({username: res.data.name, avatar: res.data.icon_img.split('?')[0]})
        setIsLoading(false);

        setRecheckDelay(600000);

        navigate('/')

    }, []);

    useInterval(async () => {
        await refreshAuth();
    }, recheckDelay);

    useEffect(() => {
        refreshAuth();
    }, [refreshAuth]);

    const signout = async () => {
        await window.localStorage.removeItem('token');
        setUserData(null);
    };

    return { signout, isLoading, authError, userData };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}
