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

function ProfileBase(props) {
    const {userInfo} = useOutletContext();
    const {
        attributes, 
        profilePic, 
        friendList, 
        incomingList,
        outgoingList,
        redirect
    } = useLoaderData();
    const username = useParams().username;
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
            const isFriend = (Object.values(friendList).filter(friend => friend.username === userInfo.username).length > 0 );
            return (privacy === 'public' || isFriend);
        }
    }, [redirect, attributes, friendList, userInfo.username]);

    return useMemo(() => {
        if(!redirect) {
            const isOwnProfile = (username === userInfo?.username);
            const friendListType = isOwnProfile ? 'Removable' : 'Standard';

            const outletContext = {
                userInfo: userInfo,
                username: username,
                attributes: attributes,
                friendList: friendList,
                friendListType: friendListType
            };

            return (
                <PageWithNavTabs tabs={['Overview', 'Posts', 'Friends']}>
                        <ProfileHeadline
                            username={username}
                            userInfo={userInfo}
                            isOwnProfile={isOwnProfile}
                            friends={friendList}
                            incomingList={incomingList}
                            outgoingList={outgoingList}
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
    }, [redirect, username, friendList, incomingList, outgoingList, userInfo, profilePic, attributes, pageViewable]);
}


function ProfileHeadline({ username, userInfo, isOwnProfile, friends, incomingList, outgoingList, profilePic }) {
    const relationshipBasedFriendButton = {
        'Already Friends': <RemoveButton userInfo={userInfo} username={username} onClick={() => {window.location.reload()}}/>,
        'Incoming': <button disabled={true}>Requested</button>,
        'Outgoing': <span>
                        <AcceptButton userInfo={userInfo} username={username} onClick={() => {window.location.reload()}}/>
                        <RejectButton userInfo={userInfo} username={username} onClick={() => {window.location.reload()}}/> 
                    </span>,
        'None': <AddButton userInfo={userInfo} username={username} onClick={() => {window.location.reload()}}/>
    }

    //TODO: Revisit friendship check
    const friendButtonKey = (isOwnProfile ? 
        undefined
        :
        (
            (Object.values(friends).filter(friend => friend.username === userInfo.username).length > 0) ?
                'Already Friends'
                :
                (Object.values(outgoingList).filter(request => request.toUsername === userInfo.username).length > 0) ?
                    'Outgoing'
                    :
                    (Object.values(incomingList).filter(request => request.fromUsername === userInfo.username).length > 0) ?
                        'Incoming'
                        :
                        'None'
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