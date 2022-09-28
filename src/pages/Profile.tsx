import {Button} from "@mui/material";
import {useCallback} from "react";

const Profile = () => {

    const openPatreonAuth = useCallback(() => {
        let authUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&redirect_uri=${process.env.REACT_APP_PATREON_REDIRECT_URL}&client_id=${process.env.REACT_APP_PATREON_CLIENT_ID}`
        console.log(authUrl)
        window.location.href = authUrl;
    }, [])

    return (
        <div>
            <Button onClick={openPatreonAuth}>Link Patreon </Button>
        </div>
    )
}

export default Profile;
