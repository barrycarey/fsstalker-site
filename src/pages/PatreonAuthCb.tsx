import {useEffect} from "react";

const PatreonAuthCb = () => {

    useEffect(() => {
        console.log('In Patron CB')
        console.log(window.location.href)
    })

    return (
        <div>Patreon Auth CB</div>
    )
}

export default PatreonAuthCb;
