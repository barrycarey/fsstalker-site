import { ReactNode } from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import AuthConsumer, {useAuth} from '../../hooks/useAuth';
import LoadScreen from "./LoadScreen";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    // const { signout, userData } = useAuth();
    console.log('RequireAuth: Starting')
    const auth = AuthConsumer();
    const location = useLocation();
    console.log('RequireAuth: Path')
    console.log(location.pathname)
    console.log(auth.userData)
    if (auth.authError || auth.userData === null) {
        console.log('RequireAuth: Redirecting to login')
        return <Navigate to="/login" replace state={{path: location.pathname}} />
    }

    if (auth.isLoading) {
        console.log('RequireAuth: Sending load screen')
        return <LoadScreen />
    }

    console.log(`RequireAuth: Sending children for ${location.pathname}`)
    return children


}
