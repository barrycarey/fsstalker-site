import { ReactNode } from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import AuthConsumer from '../../hooks/useAuth';
import LoadScreen from "./LoadScreen";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    // const { signout, userData } = useAuth();
    const auth = AuthConsumer();
    console.log('in auth')
    const location = useLocation();
    console.log('Path')
    console.log(location.pathname)
    if (auth.authError || auth.userData === null) {
        console.log('Redirecting to login')
        return <Navigate to="/login" replace state={{path: location.pathname}} />
    }

    if (auth.isLoading) {
        console.log('Sending load screen')
        return <LoadScreen />
    }

    console.log(`Sending children for ${location.pathname}`)
    return children


}
