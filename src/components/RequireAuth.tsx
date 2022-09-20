import { ReactNode } from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import AuthConsumer from '../hooks/useAuth';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    // const { signout, userData } = useAuth();
    const auth = AuthConsumer();
    console.log('in auth')
    const location = useLocation();
    if (auth.userData != null) {
        console.log('AUTH: We have user data')
        return children
    } else{
        console.log('AUTH: NO USER DATA')
        return <Navigate to="/login" replace />
    }

}
