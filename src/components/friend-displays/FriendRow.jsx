import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    RemoveButton,
    AddButton,
    AcceptButton,
    RejectButton
} from '../helper/friend-buttons';

function FriendRow({ username, profilePic, userInfo, ...props}) {
    const rowType = props.rowType;
    const [row, setRow] = useState();

    useEffect(() => {
        const rowButtons = {
            'Standard': null,
            'Removable': <RemoveButton userInfo={userInfo} username={username} onClick={() => setRow()}/>,
            'Recommendations': <AddButton userInfo={userInfo} username={username} onClick={() => setRow()}/>,
            'Requests': <span>
                            <AcceptButton userInfo={userInfo} username={username} onClick={() => setRow()}/> 
                            <RejectButton userInfo={userInfo} username={username} onClick={() => setRow()}/> 
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
    }, [username, profilePic, userInfo, rowType]);

    return row;
}

FriendRow.propTypes = {
    rowType: PropTypes.oneOf(['Standard', 'Requests', 'Removable', 'Recommendations']).isRequired
}

export default FriendRow;