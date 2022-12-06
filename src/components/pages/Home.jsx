import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchFeedForUser } from '../../helper/api-calls/user';
import Feed from '../post-feed/Feed';

function Home(props) {
    const {userInfo} = useOutletContext();
    
    return (
        <Feed userInfo={userInfo} username={userInfo.username} fetchFunction={fetchFeedForUser}/>
    );
}


export default Home;
