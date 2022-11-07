import React from "react";
import { useOutletContext } from "react-router-dom";
import Feed from "../../post-feed/Feed";

function Posts(props) {
    const {userInfo, username, fetchUserPosts} = useOutletContext();
    return (
        <>
            <h3>{username}'s Posts</h3>
            <Feed userInfo={userInfo} fetchForUsername={username} fetchFunction={fetchUserPosts}/>
        </>
    );
}

export default Posts;