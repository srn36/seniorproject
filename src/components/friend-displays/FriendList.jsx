import React from "react";
import PropTypes from 'prop-types';
import FriendRow from "./FriendRow";
import RemovableFriendRow from "./RemovableFriendRow";
import FriendRequestRow from "./FriendRequestRow";
import { Table } from "react-bootstrap";

function FriendList(props) {
    const friends = props.friends;
    const type = props.type;
    const userInfo = props.userInfo;
    const friendTable = friends.map(friend => {
        const rowTypes = {
            Standard: <FriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
            Removable: <RemovableFriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
            Requests: <FriendRequestRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>
        };
        return rowTypes[type];
    });
    return (
        <div className="friend-list">
            {
                (Object.keys(friendTable).length > 0) &&
                <Table bordered hover>
                    <tbody>
                        {friendTable}
                    </tbody>
                </Table>
            }
        </div>
    );
}

FriendList.propTypes = {
    friends: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard']).isRequired
}

export default FriendList