import React from 'react';
import { useOutletContext } from 'react-router-dom';
import FriendList from '../../friend-displays/FriendList';

function Friends(props) {
    const {userInfo, username, friendList, friendListType} = useOutletContext();

    return (
        <>
            <h3>{username}'s Friends</h3>
            <FriendList friends={friendList} type={friendListType} userInfo={userInfo}/>                       
        </>
    );
}

export default Friends;