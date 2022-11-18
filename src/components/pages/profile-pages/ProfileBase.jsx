import React, { useMemo } from 'react';
import {
    Outlet,
    useOutletContext,
    useParams
} from 'react-router-dom';
import PageWithNavTabs from '../base/PageWithNavTabs';

import { fetchUserPosts } from '../../../helper/api-calls/user';
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
                <Outlet context={outletContext}/>
            </PageWithNavTabs>
        );
    }, [username, friendList, userInfo]);
}

export default ProfileBase;