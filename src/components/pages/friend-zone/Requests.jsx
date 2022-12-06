import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getIncomingRequestsForUser } from '../../../unholy-abominations/simulateFriends';
import FriendList from '../../friend-displays/FriendList';

function Requests(props) {
    const {userInfo} = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [incoming, setIncoming] = useState([]);

    useEffect(() => {
        const fetchIncoming = async () => {
            const requests = await getIncomingRequestsForUser(userInfo.username);
            setIncoming(requests);
            setLoading(false);
        };

        fetchIncoming();
    }, [userInfo]);

    return (
        loading ? 
            <h2>Loading...</h2>
            :
            <>
                <h3>Friend Requests</h3>
                <FriendList friends={incoming} type={'Requests'} userInfo={userInfo}/>             
            </>
    );

}

export default Requests;