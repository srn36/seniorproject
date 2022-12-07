/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
//import { getRecommendationsForUser } from '../../../unholy-abominations/simulateFriends';
import FriendList from '../../friend-displays/FriendList';

/**
 * This is meant to be the page that displays friend recommendations to the user.
 * Unfortunately, we do not have the ability to recommend friends to the user using any form of data analytics.
 * As a result, all references to this page have been commented out, 
 * including the route that is meant to resolve to this page.
 */
function Recommendations(props) {
    const {userInfo} = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const recs = await getRecommendationsForUser(userInfo.username);
            setRecommendations(recs);
            setLoading(false);
        };

        fetchRecommendations();
    }, [userInfo]);

    return (
        loading ?
            <h2>Loading...</h2>
            :
            <>
                <h3>Friend Recommendations</h3>
                <FriendList friends={recommendations} type={'Recommendations'} userInfo={userInfo}/>             
            </>
    );

}

export default Recommendations;