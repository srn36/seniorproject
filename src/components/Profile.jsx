import React, { useEffect, useMemo, useState } from "react";
import { fetchFriendsForUser, fetchUserPosts } from "../helper/api-calls/user";
import { checkFriendRequests, removeFriend, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../helper/api-calls/friend";
import { useParams } from "react-router-dom";
import FriendList from "./friend-displays/FriendList";
import Feed from "./post-feed/Feed";

const toggleFriendsOrPosts = {Friends: 'Posts', Posts: 'Friends'};

function Profile(props) {
    const userInfo = props.userInfo;
    const username = useParams().username;
    const [postFriendToggle, setPostFriendToggle] = useState();

    useEffect(() => {
        setPostFriendToggle('Friends');
    }, [username]);

    const friendList = /*async*/ (uname) => {
        return /*await*/ fetchFriendsForUser(uname)/*.then(results => results.json())*/;
    };

    const content = useMemo(() => {
        const retrieveFriends = friendList(username);
        const friends = Array.isArray(retrieveFriends) ? retrieveFriends : [];
        const isOwnProfile = (username === userInfo?.username);
        const friendListType = isOwnProfile ? 'Removable' : 'Standard';

        return (
            <>
                <ProfileHeadline username={username} userInfo={userInfo} isOwnProfile={isOwnProfile} friends={friends}/>
                <h4>hi</h4>
                <button onClick={_e => {setPostFriendToggle(toggleFriendsOrPosts[postFriendToggle]);}}>Show {postFriendToggle}</button>
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Friends') &&
                    <>
                        <h3>{username}'s Friends</h3>
                        <FriendList friends={friends} type={friendListType} userInfo={userInfo}/>
                    </>
                }
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Posts') &&
                    <>
                        <h3>{username}'s Posts</h3>
                        <Feed userInfo={userInfo} fetchForUsername={username} fetchFunction={fetchUserPosts}/>
                    </>
                }
            </>
        );
    }, [username, postFriendToggle, userInfo]);

    return content;
}

function ProfileHeadline({ username, userInfo, isOwnProfile, friends }) {
    const relationshipBasedFriendButton = {
        'Already Friends': <button onClick={_e => removeFriend(userInfo.username, username)}>Remove Friend</button>,
        'Outgoing': <button disabled={true}>Requested</button>,
        'Incoming': <div>
                        <button onClick={_e => acceptFriendRequest(username, userInfo.username)}>
                            Accept
                        </button>
                        <button onClick={_e => rejectFriendRequest(username, userInfo.username)}>
                            Reject
                        </button> 
                    </div>,
        'None': <button onClick={_e => sendFriendRequest(userInfo.username, username)}>Request Friend</button>
    }

    const friendButtonKey = (isOwnProfile ? 
        undefined
        :
        (
            !!(friends.filter(friend => friend.username === userInfo?.username).length) ?
                'Already Friends'
                :
                checkFriendRequests(userInfo.username, username)
        )
    );
    
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%'}}>
            <div style={{display: 'flex'}}>
                <img src='' alt='profile pic here'/>
                <h2>Profile Page for {username}</h2>
            </div>
            {!isOwnProfile && relationshipBasedFriendButton[friendButtonKey]}
        </div>
    );
}

export default Profile;