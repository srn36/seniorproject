import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getOutgoingRequestsForUser } from '../../../unholy-abominations/simulateFriends';
import FriendList from '../../friend-displays/FriendList';

function Recommendations(props) {
    const {userInfo} = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [outgoing, setOutgoing] = useState([]);

    useEffect(() => {
        const fetchoutgoing = async () => {
            const requests = await getOutgoingRequestsForUser(userInfo.username);
            setOutgoing(requests);
            setLoading(false);
        };

        fetchoutgoing();
    }, [userInfo]);

    return (
        loading ?
            <h2>Loading...</h2>
            :
            <>
                <h3>Friend Recommendations</h3>
                <FriendList friends={outgoing} type={'Standard'} userInfo={userInfo}/>             
            </>
    );

}

export default Recommendations;