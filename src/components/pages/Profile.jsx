import React, { useEffect, useMemo, useState } from "react";
import { 
    fetchUserPosts
} from "../../helper/api-calls/user";
import { 
    checkFriendRequests,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest 
} from "../../helper/api-calls/friend";
import { useParams } from "react-router-dom";
import FriendList from "../friend-displays/FriendList";
import Feed from "../post-feed/Feed";
import { useFriendsForUser, useProfileInfo } from "../../helper/api-calls/useApiCalls";

const toggleFriendsOrPosts = {Friends: 'Posts', Posts: 'Friends'};

function Profile(props) {
    const userInfo = props.userInfo;
    const username = useParams().username;
    const [postFriendToggle, setPostFriendToggle] = useState();

    useEffect(() => {
        setPostFriendToggle('Friends');
    }, [username]);

    const friendList = useFriendsForUser(username);
    const profileInfo = useProfileInfo(username);

    const content = useMemo(() => {
        const friends = Array.isArray(friendList.data) ? friendList.data : [];
        const isOwnProfile = (username === userInfo?.username);
        const friendListType = isOwnProfile ? 'Removable' : 'Standard';

        return (
            <>
                {
                    profileInfo.loading ? 
                        <h4>Loading...</h4> : (
                            !!(profileInfo.error) ? <h4>Error</h4> : 
                                <ProfileHeadline 
                                    username={username}
                                    userInfo={userInfo}
                                    profileInfo={profileInfo.data}
                                    isOwnProfile={isOwnProfile}
                                    friends={friends}
                                />
                        )
                }             
                <h4>hi</h4>
                <button onClick={_e => {setPostFriendToggle(toggleFriendsOrPosts[postFriendToggle]);}}>Show {postFriendToggle}</button>
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Friends') &&
                    <>
                        <h3>{username}'s Friends</h3>
                        {
                            friendList.loading ? 
                                <h4>Loading...</h4> : (
                                    !!(friendList.error) ? <h4>Error</h4> : <FriendList friends={friends} type={friendListType} userInfo={userInfo}/>
                                )
                        }                        
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
    }, [username, postFriendToggle, friendList, profileInfo, userInfo]);

    return content;
}

function ProfileHeadline({ username, userInfo, profileInfo, isOwnProfile, friends }) {
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
            !!(friends.filter(friend => friend.username === userInfo.username).length) ?
                'Already Friends'
                :
                checkFriendRequests(userInfo.username, username)
        )
    );
    
    return (
        <div className="profile-headline">
            <div>
                <img src={profileInfo.profilePic} alt='profile pic here'/>
                <h2>Profile Page for {username}</h2>
            </div>
            {!isOwnProfile && relationshipBasedFriendButton[friendButtonKey]}
        </div>
    );
}

export default Profile;