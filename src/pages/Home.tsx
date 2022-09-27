import {useAuth} from "../hooks/useAuth";
import HomeMonitors from "../components/home/HomeMonitors";

const Home = () => {
    const auth = useAuth();
    if (auth.userData != null) {
        return <HomeMonitors username={auth.userData.username}/>
    } else {
        return (
            <div>Loading</div>
        )
    }
}

export default Home;
