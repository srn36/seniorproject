import React from 'react';
import { fetchFeedForUser } from '../../helper/api-calls/user';
import Feed from '../post-feed/Feed';

function Home(props) {
    const userInfo = props.userInfo;

    return (
        <>
            <Feed userInfo={userInfo} fetchForUsername={userInfo.username} fetchFunction={fetchFeedForUser}/>
        </>
    );
}


export default Home;
