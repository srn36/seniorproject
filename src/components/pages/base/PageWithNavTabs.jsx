import React from 'react';
import {
    useOutletContext,
    useParams
} from 'react-router-dom';
import {
    useLocation,
    useNavigate
} from 'react-router-dom';
import ProfileHeadline from './ProfileHeadline';
import {
    useFriendsForUser,
    useProfileInfo
} from '../../../helper/api-calls/useApiCalls';

function PageWithNavTabs({ tabs, children }) {
    const {userInfo} = useOutletContext();
    const username = useParams().username || userInfo.username;
    const friendList = useFriendsForUser(username);
    const profileInfo = useProfileInfo(username);
    const friends = Array.isArray(friendList.data) ? friendList.data : [];
    const path = useLocation().pathname.toLowerCase();
    const navigate = useNavigate();
    
    const pathTabs = tabs.map(tab => (
        <button 
            key={tab}
            className='tab-button'
            disabled={path.includes(tab.toLowerCase())}
            onClick={() => navigate(tab)}
        >
            {tab}
        </button>
    ));

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
                                isOwnProfile={username === userInfo.username}
                                friends={friends}
                            />
                    )
            }
            <div className='base-grid'>
                <div className='tabs'>
                    {pathTabs}
                </div>
                <div className='content'>
                    {children}
                </div>          
            </div>
        </>
    );
}

export default PageWithNavTabs;