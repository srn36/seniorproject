import React from 'react';
import {
    acceptFriendRequest,
    rejectFriendRequest,
    sendFriendRequest,
    removeFriend
} from '../../helper/api-calls/friend';

export function AcceptButton({userInfo, username, ...props}) {
    return (
        <button onClick={e => {
            e.preventDefault();
            if(window.confirm(`Accept ${username}'s request?`)) {
                acceptFriendRequest(username, userInfo.username);
                props?.onClick();
            }
        }}>
            Accept
        </button>
    );
}

export function RejectButton({userInfo, username, ...props}) {
    return (
        <button onClick={e => {
            e.preventDefault();
            if(window.confirm(`Reject ${username}'s request?`)) {
                rejectFriendRequest(username, userInfo.username);
                props?.onClick(); 
            }                               
        }}>
            Reject
        </button> 
    );
}

export function AddButton({userInfo, username, ...props}) {
    return (
        <button onClick={e => {
            e.preventDefault();
            if(window.confirm(`Send friend request to ${username}?`)) {
                sendFriendRequest(userInfo.username, username);
                props?.onClick();
            }
        }}>
            Add Friend
        </button> 
    );
}

export function RemoveButton({userInfo, username, ...props}) {
    return (
        <button onClick={e => {
            e.preventDefault();
            if(window.confirm(`Remove ${username} from friends?`)) {
                removeFriend(userInfo.username, username);
                props?.onClick();
            }
        }}>
            Remove
        </button>
    );
}