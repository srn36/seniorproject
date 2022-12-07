import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getIncomingRequestsForUser } from '../../../unholy-abominations/simulateFriends';
import FriendList from '../../friend-displays/FriendList';

function IncomingRequests(props) {
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
                <h3>Incoming Friend Requests</h3>
                <FriendList friends={incoming} type={'Incoming'} userInfo={userInfo}/>             
            </>
    );

}

export default IncomingRequests;