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

import { checkFriendRequests } from '../../../helper/api-calls/friend';
import { useFriendsForUser } from '../../../helper/api-calls/useApiCalls';

function ProfileBase(props) {
    const {userInfo} = useOutletContext();
    const {attributes, profilePic, redirect} = useLoaderData();
    const username = useParams().username;
    const friendList = useFriendsForUser(username);
    const navigate = useNavigate();

    // Redirect to the error page if the requested profile page belongs to a nonexistent user
    useEffect(() => {
        if(redirect) {
            navigate('/error');
        }
    });

    // Determine if the current user should be allowed to view this profile page
    const pageViewable = useMemo(() => {
        if(!redirect) {
            const privacy = attributes.filter(attr => attr.Name === 'custom:privacy')[0].Value.toLowerCase();
            const isFriend =    Array.isArray(friendList.data) ? 
                                    friendList.data.filter(friend => friend.username === userInfo.username).length > 0 
                                    :
                                    false; //TODO: Revisit friendship check
            return (privacy === 'public' || isFriend);
        }
    }, [redirect, attributes, friendList, userInfo.username]);

    return useMemo(() => {
        if(!redirect) {
            const friends = Array.isArray(friendList.data) ? friendList.data : [];
            const isOwnProfile = (username === userInfo?.username);
            const friendListType = isOwnProfile ? 'Removable' : 'Standard';

            const outletContext = {
                userInfo: userInfo,
                username: username,
                attributes: attributes,
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
                        {
                            (isOwnProfile || pageViewable) ?
                                <Outlet context={outletContext}/>
                                :
                                `This profile is private. Only ${username}'s friends can view it.`
                        }
                </PageWithNavTabs>
            );
        }
    }, [redirect, username, friendList, userInfo, profilePic, attributes, pageViewable]);
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

    //TODO: Revisit friendship check
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
                <h1>{username}</h1>
            </span>
            {!isOwnProfile && relationshipBasedFriendButton[friendButtonKey]}
        </div>
    );
}

export default ProfileBase;