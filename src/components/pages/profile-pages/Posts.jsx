import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { getPostsForUser } from '../../../unholy-abominations/simulatePosts';
import Feed from '../../post-feed/Feed';

function Posts(props) {
    const {userInfo, username} = useOutletContext();

    return (
        <>
            <h3>{username}'s Posts</h3>
            <Feed userInfo={userInfo} username={username} fetchFunction={getPostsForUser}/>
        </>
    );
}

export default Posts;