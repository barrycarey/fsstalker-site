import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {RedditUserData} from "../interfaces/common";



type ContextData = {
    userData: RedditUserData | null;
    logout: () => void;
    login: (token: string) => void;
    authError: string | null;
    isLoading: boolean
};

const AuthContext = createContext<ContextData>({
    userData: null,
    authError: null,
    isLoading: true,
    logout: () => {},
    login: (token: string) => {}
});

export const AuthProvider = ({children}: {children: ReactNode} )=> {
    const [userData, setUserData] = useState<RedditUserData | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [recheckDelay, setRecheckDelay] = useState<number>(10000);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [redditToken, setRedditToken] = useState<string | null>(null);


    useEffect(() => {
        console.log('AuthProvider: useEffect: Checking for token in storage')
        let token = localStorage.getItem('redditToken');
        console.log(`AuthProvider: useEffect - Storage token ${token}`)
        if (token) {
            setRedditToken(token);
        } else {
            setIsLoading(false);
        }

    })

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('AuthProvider:useEffect:fetchUserData - Starting')
            if (!redditToken) {
                console.log('AuthProvider:useEffect - No Auth token available')
                return;
            }

            let res;

            try {
                res = await axios.get('https://oauth.reddit.com/api/v1/me/', {
                    headers: { Authorization: `Bearer ${redditToken}` }
                })
            } catch (err) {
                setAuthError('AuthProvider:useEffect - Problem reaching authentication API');
                setIsLoading(false);
                return;
            }

            if (res.status !== 200) {
                console.log(`AuthProvider:useEffect- Bad status from Auth API ${res.status}`);
                setAuthError(`Bad status from Auth API ${res.status}`);
                setIsLoading(false);
                return;
            }

            console.log('AuthProvider:useEffect - Setting auth user data')
            setUserData({username: res.data.name, avatar: res.data.icon_img.split('?')[0], authToken: redditToken})
            setIsLoading(false);
            try {
                await axios.post(`${process.env.REACT_APP_STALKER_API}/user?token=${redditToken}`)
            } catch (err) {
                console.log('AuthProvider:useEffect failed to create user, it already exists')
            }



        }

        fetchUserData();
    }, [redditToken])

    const login = (token: string) => {
        console.log(`AuthProvider:login - Writing token ${token}`)
        localStorage.setItem('redditToken', token);
        setRedditToken(token);
    }

    const logout = () => {
        setUserData(null);
        localStorage.removeItem('redditToken');
        setRedditToken(null);
    }

    return (
        <AuthContext.Provider value={{userData, authError, isLoading, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
