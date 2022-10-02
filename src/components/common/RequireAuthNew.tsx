import { useAuth } from "../../util/auth"
import {Navigate, useLocation} from 'react-router-dom';
import LoadScreen from "./LoadScreen";

export const RequireAuthNew = ({ children }: {children: JSX.Element}) => {
    const auth = useAuth();
    const location = useLocation();
    if (auth.isLoading) {
        return <LoadScreen />
    }

    if (!auth.userData) {
        console.log('RequireAuthNew: redirecting to login')
        return <Navigate to="/login" state={{path: location.pathname}}/>
    }

    console.log('RequireAuthNew: returning children')

    return children;
}
