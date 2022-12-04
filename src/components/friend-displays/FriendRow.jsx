import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    RemoveButton,
    AddButton,
    AcceptButton,
    RejectButton
} from '../helper/friend-buttons';

function FriendRow({ username, profilePic, userInfo, deleteRow, ...props}) {
    const rowType = props.rowType;

    const rowButtons = {
        'Standard': null,
        'Removable': <RemoveButton userInfo={userInfo} username={username} onClick={() => deleteRow(username)}/>,
        'Recommendations': <AddButton userInfo={userInfo} username={username} onClick={() => deleteRow(username)}/>,
        'Requests': <span>
                        <AcceptButton userInfo={userInfo} username={username} onClick={() => deleteRow(username)}/> 
                        <RejectButton userInfo={userInfo} username={username} onClick={() => deleteRow(username)}/> 
                    </span>
    };
    const buttons = rowButtons[rowType];

    return (
        <tr>
            <td>
                <Link className='friend' to={`/profile/${username}`}>
                    <p>{username}</p>
                    {!!buttons && buttons}
                </Link>
            </td>
        </tr>
    );
}

FriendRow.propTypes = {
    rowType: PropTypes.oneOf(['Standard', 'Requests', 'Removable', 'Recommendations']).isRequired
}

export default FriendRow;