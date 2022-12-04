import React, { useState } from 'react';
import {
    acceptFriendRequest,
    rejectFriendRequest,
    sendFriendRequest,
    removeFriend
} from '../../helper/api-calls/friend';
import { Loader, useTheme } from '@aws-amplify/ui-react';

export function AcceptButton({ userInfo, username, ...props }) {
    const { tokens } = useTheme();
    const [waiting, setWaiting] = useState(false);
    
    return (
        <button 
            className='accept'
            onClick={e => {
                e.preventDefault();
                if(window.confirm(`Accept ${username}'s request?`)) {
                    setWaiting(true);
                    //TODO: Send request to DB
                    acceptFriendRequest(username, userInfo.username);
                    props?.onClick();
                    setWaiting(false);
                }
            }}
            disabled={waiting}
        >
            <div className='label-container'>
                {
                    waiting && (
                        <Loader 
                            className='f-button-loader' 
                            size='large' 
                            filledColor={tokens.colors.teal}
                        />
                    )
                }
                Accept
            </div>
        </button>
    );
}

export function RejectButton({ userInfo, username, ...props }) {
    const { tokens } = useTheme();
    const [waiting, setWaiting] = useState(false);
    
    return (
        <button 
            className='reject'
            onClick={e => {
                e.preventDefault();
                if(window.confirm(`Reject ${username}'s request?`)) {
                    setWaiting(true);
                    //TODO: Send request to DB
                    rejectFriendRequest(username, userInfo.username);
                    props?.onClick();
                    setWaiting(false); 
                }                               
            }}
            disabled={waiting}
        >
            <div className='label-container'>
                {
                    waiting && (
                        <Loader 
                            className='f-button-loader' 
                            size='large' 
                            filledColor={tokens.colors.teal}
                        />
                    )
                }
                Reject
            </div>
        </button> 
    );
}

export function AddButton({ userInfo, username, ...props }) {
    const { tokens } = useTheme();
    const [waiting, setWaiting] = useState(false);
    
    return (
        <button 
            className='request'
            onClick={e => {
                e.preventDefault();
                if(window.confirm(`Send friend request to ${username}?`)) {
                    setWaiting(true);
                    //TODO: Send request to DB
                    sendFriendRequest(userInfo.username, username);
                    props?.onClick();
                    setWaiting(false);
                }
            }}
            disabled={waiting}
        >
            <div className='label-container'>
                {
                    waiting && (
                        <Loader 
                            className='f-button-loader' 
                            size='large' 
                            filledColor={tokens.colors.teal}
                        />
                    )
                }
                Request
            </div>
        </button> 
    );
}

export function RemoveButton({ userInfo, username, ...props }) {
    const { tokens } = useTheme();
    const [waiting, setWaiting] = useState(false);
    
    return (
        <button 
            className='remove'
            onClick={e => {
                e.preventDefault();
                if(window.confirm(`Remove ${username} from friends?`)) {
                    setWaiting(true);
                    //TODO: Send request to DB
                    removeFriend(userInfo.username, username);
                    props?.onClick();
                    setWaiting(false);
                }
            }}
            disabled={waiting}
        >
            <div className='label-container'>
                {
                    waiting && (
                        <Loader 
                            className='f-button-loader' 
                            size='large' 
                            filledColor={tokens.colors.teal}
                        />
                    )
                }
                Remove
            </div>
        </button>
    );
}