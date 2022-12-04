import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    RemoveButton,
    AddButton,
    AcceptButton,
    RejectButton
} from '../helper/friend-buttons';

function FriendRow({ username, profilePic, userInfo, onDeleteRow, ...props}) {
    const rowType = props.rowType;
    const [row, setRow] = useState();

    const removeRow = useCallback(() => {
        onDeleteRow(username);
        setRow();
    }, [onDeleteRow, username]);

    useEffect(() => { //TODO: Implement DB interaction
        const rowButtons = {
            'Standard': null,
            'Removable': <RemoveButton userInfo={userInfo} username={username} onClick={() => {/* Interact with DB */ removeRow()}}/>,
            'Recommendations': <AddButton userInfo={userInfo} username={username} onClick={() => {/* Interact with DB */ removeRow()}}/>,
            'Requests': <span>
                            <AcceptButton userInfo={userInfo} username={username} onClick={() => {/* Interact with DB */ removeRow()}}/> 
                            <RejectButton userInfo={userInfo} username={username} onClick={() => {/* Interact with DB */ removeRow()}}/> 
                        </span>
        }[rowType];

        setRow(
            <tr>
                <td>
                    <Link className='friend' to={`/profile/${username}`}>
                        <span>
                            <img src={profilePic} alt=''/>
                            <p>{username}</p>
                        </span>
                        {!!rowButtons && rowButtons}
                    </Link>
                </td>
            </tr>
        );
    }, [removeRow, username, profilePic, userInfo, rowType]);

    return row;
}

FriendRow.propTypes = {
    rowType: PropTypes.oneOf(['Standard', 'Requests', 'Removable', 'Recommendations']).isRequired
}

export default FriendRow;