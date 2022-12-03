import React, { useEffect, useMemo } from 'react';
import {
    Outlet,
    useLoaderData,
    useNavigate,
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
    const {attributes, profilePic, redirect} = useLoaderData();
    const username = useParams().username;
    const friendList = useFriendsForUser(username);
    const navigate = useNavigate();

    useEffect(() => {
        if(redirect) {
            navigate('error');
        }
    }, [redirect, navigate]);

    return useMemo(() => {
        const friends = Array.isArray(friendList.data) ? friendList.data : [];
        const isOwnProfile = (username === userInfo?.username);
        const friendListType = isOwnProfile ? 'Removable' : 'Standard';

        const outletContext = {
            userInfo: userInfo,
            username: username,
            attributes: attributes,
            fetchUserPosts: fetchUserPosts,
            friendList: friendList,
            friends: friends,
            friendListType: friendListType
        };

        return (
            <PageWithNavTabs tabs={['Overview', 'Posts', 'Friends']}>
                    <ProfileHeadline
                        username={username}
                        userInfo={userInfo}
                        isOwnProfile={isOwnProfile}
                        friends={friends}
                        profilePic={profilePic}
                    />
                    <Outlet context={outletContext}/>
            </PageWithNavTabs>
        );
    }, [username, friendList, userInfo, profilePic, attributes]);
}


function ProfileHeadline({ username, userInfo, isOwnProfile, friends, profilePic }) {

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
                <img src={profilePic} alt='profile pic here'/>
                <h2>{username}</h2>
            </span>
            {!isOwnProfile && relationshipBasedFriendButton[friendButtonKey]}
        </div>
    );
}

export default ProfileBase;