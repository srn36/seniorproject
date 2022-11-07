import React, { useMemo } from "react";
import {
    Link,
    Outlet, 
    useOutletContext,
    useParams
} from "react-router-dom";

import { 
    fetchUserPosts
} from "../../../helper/api-calls/user";
import { 
    checkFriendRequests,
    removeFriend,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest 
} from "../../../helper/api-calls/friend";
import {
    useFriendsForUser,
    useProfileInfo
} from "../../../helper/api-calls/useApiCalls";

function ProfileBase(props) {
    const {userInfo} = useOutletContext();
    const username = useParams().username;

    const friendList = useFriendsForUser(username);
    const profileInfo = useProfileInfo(username);

    return useMemo(() => {
        const friends = Array.isArray(friendList.data) ? friendList.data : [];
        const isOwnProfile = (username === userInfo?.username);
        const friendListType = isOwnProfile ? 'Removable' : 'Standard';

        const outletContext = {
            userInfo: userInfo,
            username: username,
            fetchUserPosts: fetchUserPosts,
            friendList: friendList,
            friends: friends,
            friendListType: friendListType
        };

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
                <div>
                    <Link to='posts'>
                        <button>
                            Posts
                        </button>
                    </Link>
                    <Link to='friends'>
                        <button>
                            Friends
                        </button>
                    </Link>
                    {
                        !!isOwnProfile &&
                        <Link to='settings'>
                            <button>
                                Settings
                            </button>
                        </Link>
                    }
                </div>
                <Outlet context={outletContext}/>
            </>
        );
    }, [username, friendList, profileInfo, userInfo]);
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

export default ProfileBase;