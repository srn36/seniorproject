import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { getFeedForUser } from '../../unholy-abominations/simulateFeed';
import Feed from '../post-feed/Feed';

function Home(props) {
    const {userInfo} = useOutletContext();
    
    return (
        <Feed userInfo={userInfo} username={userInfo.username} fetchFunction={getFeedForUser}/>
    );
}


export default Home;
