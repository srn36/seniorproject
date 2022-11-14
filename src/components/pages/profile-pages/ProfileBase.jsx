import React, { useMemo } from 'react';
import {
    Link,
    Outlet, 
    useLocation, 
    useOutletContext,
    useParams
} from 'react-router-dom';
import {
    AcceptButton,
    AddButton,
    RejectButton,
    RemoveButton
} from '../../helper/friend-buttons';

import { fetchUserPosts } from '../../../helper/api-calls/user';
import { checkFriendRequests } from '../../../helper/api-calls/friend';
import { useFriendsForUser, useProfileInfo } from '../../../helper/api-calls/useApiCalls';

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
                            profileInfo.error ? 
                                <h4>Error</h4> : 
                                <ProfileHeadline 
                                    username={username}
                                    userInfo={userInfo}
                                    profileInfo={profileInfo.data}
                                    isOwnProfile={isOwnProfile}
                                    friends={friends}
                                />
                        )
                }
                <ProfileContent isOwnProfile={isOwnProfile}>
                    <Outlet context={outletContext}/>
                </ProfileContent>
            </>
        );
    }, [username, friendList, profileInfo, userInfo]);
}


function ProfileContent({ isOwnProfile, children }) {
    const path = useLocation().pathname;
    const linkClass = isOwnProfile ? 'quarter' : 'third';

    return (
        <>
            <div className='profile-view-selector'>
                <Link 
                    to='posts'
                    className={linkClass}                    
                >
                    <button disabled={path.includes('posts')}>
                        Posts
                    </button>
                </Link>
                <Link
                    to='games'
                    className={linkClass}                 
                >
                    <button disabled={path.includes('games')}>
                        Games
                    </button>
                </Link>
                <Link
                    to='friends'
                    className={linkClass}                 
                >
                    <button disabled={path.includes('friends')}>
                        Friends
                    </button>
                </Link>
                {
                    !!isOwnProfile &&
                    <Link
                        to='settings'
                        className={linkClass}
                    >
                        <button disabled={path.includes('settings')}>
                            Settings
                        </button>
                    </Link>
                }
            </div>
            {children}
        </>
    );
}


function ProfileHeadline({ username, userInfo, profileInfo, isOwnProfile, friends }) {
    const relationshipBasedFriendButton = {
        'Already Friends': <RemoveButton userInfo={userInfo} username={username}/>,
        'Outgoing': <button disabled={true}>Requested</button>,
        'Incoming': <span>
                        <AcceptButton userInfo={userInfo} username={username}/>
                        <RejectButton userInfo={userInfo} username={username}/> 
                    </span>,
        'None': <AddButton userInfo={userInfo} username={username}/>
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
        <div className='profile-headline'>
            <span>
                <img src={profileInfo.profilePic} alt='profile pic here'/>
                <h2>{username}</h2>
            </span>
            {!isOwnProfile && relationshipBasedFriendButton[friendButtonKey]}
        </div>
    );
}

export default ProfileBase;