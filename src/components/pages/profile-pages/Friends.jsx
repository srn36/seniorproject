import React from 'react';
import { useOutletContext } from 'react-router-dom';
import FriendList from '../../friend-displays/FriendList';

function Friends(props) {
    const {userInfo, username, friendList, friends, friendListType} = useOutletContext();

    return (
        <>
            <h3>{username}'s Friends</h3>
            {
                friendList.loading ? 
                    <h4>Loading...</h4> : (
                        !!(friendList.error) ? <h4>Error</h4> : <FriendList friends={friends} type={friendListType} userInfo={userInfo}/>
                    )
            }                        
        </>
    );
}

export default Friends;