import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import FriendRow from "./FriendRow";
import RemovableFriendRow from "./RemovableFriendRow";
import FriendRequestRow from "./FriendRequestRow";
import { Table } from "react-bootstrap";

function FriendList(props) {
    const {friends, type, userInfo} = props;
    const friendTable = friends.map(friend => {
        const rowTypes = {
            Standard: <FriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
            Removable: <RemovableFriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
            Requests: <FriendRequestRow key={friend.fromUsername} username={friend.fromUsername} profilePic={friend.profilePic} userInfo={userInfo}/>
        };
        return rowTypes[type];
    });

    const [filteredTable, setFilteredTable] = useState(friendTable);

    return useMemo(() => {
        const filter = (text) => {
            return friends.filter(friend => friend.username.includes(text)).map(friend => {
                const rowTypes = {
                    Standard: <FriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
                    Removable: <RemovableFriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
                    Requests: <FriendRequestRow key={friend.fromUsername} username={friend.fromUsername} profilePic={friend.profilePic} userInfo={userInfo}/>
                };
                return rowTypes[type];
            });
        }
        return (
            <div className="friend-list">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th style={{display: 'flex', flexDirection: 'row'}}>
                                <p style={{marginBottom: '0px', marginRight: '0.5em'}}>Filter List</p>
                                <input type="text" onChange={e => setFilteredTable(filter(e.target.value))}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (Object.keys(filteredTable).length > 0) ? filteredTable : <tr><td><p>No Results</p></td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        );
    }, [friends, type, userInfo, filteredTable, setFilteredTable]);
}

FriendList.propTypes = {
    friends: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard']).isRequired,
    userInfo: PropTypes.any.isRequired
}

export default FriendList