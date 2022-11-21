import React, { useMemo } from 'react';
import {
    Outlet,
    useOutletContext,
    useParams
} from 'react-router-dom';
import {
    AcceptButton,
    AddButton,
    RejectButton,
    RemoveButton
} from '../../helper/friend-buttons';
import PageWithNavTabs from '../base/PageWithNavTabs';

import { fetchUserPosts } from '../../../helper/api-calls/user';
import { checkFriendRequests } from '../../../helper/api-calls/friend';
import { useFriendsForUser } from '../../../helper/api-calls/useApiCalls';

function ProfileBase(props) {
    const {userInfo} = useOutletContext();
    const username = useParams().username;
    const friendList = useFriendsForUser(username);

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
            <PageWithNavTabs tabs={['Posts', 'Friends', 'Games']}>
                <>
                    <ProfileHeadline 
                        username={username}
                        userInfo={userInfo}
                        isOwnProfile={isOwnProfile}
                        friends={friends}
                    />
                    <Outlet context={outletContext}/>
                </>
            </PageWithNavTabs>
        );
    }, [username, friendList, userInfo]);
}


function ProfileHeadline({ username, userInfo, isOwnProfile, friends }) {
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
                <img src={userInfo.attributes.picture} alt='profile pic here'/>
                <h2>{username}</h2>
            </span>
            {!isOwnProfile && relationshipBasedFriendButton[friendButtonKey]}
        </div>
    );
}

export default ProfileBase;