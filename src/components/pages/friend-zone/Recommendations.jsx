import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFriendRecommendations } from '../../../helper/api-calls/useApiCalls';
import FriendList from '../../friend-displays/FriendList';

function Recommendations(props) {
    const {userInfo} = useOutletContext();
    const {loading, error, data} = useFriendRecommendations(userInfo.username);

    return useMemo(() => {
        let recommendationRows;
        if(!loading && !error) {
            const incomingRecommendations = data;
            recommendationRows = Array.isArray(incomingRecommendations) ? incomingRecommendations : [];
        }

        return (
            <>
                <h3>Friend Recommendations</h3>
                {
                    loading ? 
                        <h4>Loading...</h4> : 
                        (
                            error ? 
                                <h4>Error</h4> : 
                                <FriendList friends={recommendationRows} type={'Recommendations'} userInfo={userInfo}/>
                        )
                }               
            </>
        );
    }, [userInfo, loading, error, data]);

}

export default Recommendations;