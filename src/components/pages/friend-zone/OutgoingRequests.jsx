import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getOutgoingRequestsForUser } from '../../../unholy-abominations/simulateFriends';
import FriendList from '../../friend-displays/FriendList';

function OutgoingRequests(props) {
    const {userInfo} = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [outgoing, setOutgoing] = useState([]);

    useEffect(() => {
        const fetchOutgoing = async () => {
            const requests = await getOutgoingRequestsForUser(userInfo.username);
            setOutgoing(requests);
            setLoading(false);
        };

        fetchOutgoing();
    }, [userInfo]);

    return (
        loading ?
            <h2>Loading...</h2>
            :
            <>
                <h3>Outgoing Friend Requests</h3>
                <FriendList friends={outgoing} type={'Outgoing'} userInfo={userInfo}/>             
            </>
    );

}

export default OutgoingRequests;