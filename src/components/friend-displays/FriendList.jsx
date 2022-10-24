import React, { useCallback, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import FriendRow from "./FriendRow";
import RemovableFriendRow from "./RemovableFriendRow";
import FriendRequestRow from "./FriendRequestRow";
import { Table } from "react-bootstrap";

function FriendList(props) {
    const {friends, type, userInfo} = props;

    //Function to create the rows of the table based on the given list of friends and the type of table requested
    const mapFriendsToRows = useCallback((friendList) => {
        return friendList.map(friend => {
            const rowTypes = {
                Standard: <FriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
                Removable: <RemovableFriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
                Requests: <FriendRequestRow key={friend.fromUsername} username={friend.fromUsername} profilePic={friend.profilePic} userInfo={userInfo}/>
            };
            return rowTypes[type];
        });
    }, [userInfo, type]);

    //Function to first filter the original friend list, then re-create the table rows using the filtered list
    const filter = useCallback((text) => {
        const filteredFriends = friends.filter(friend => friend.username.includes(text));
        return mapFriendsToRows(filteredFriends);
    }, [friends, mapFriendsToRows]);

    //Use a hook to reload the table contents when the user tried to filter the results. Default value is to display entire friend list
    const [filteredTable, setFilteredTable] = useState(mapFriendsToRows(friends));

    return useMemo(() => {
        return (
            <div className="friend-list">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className="friend-list-header">
                                <p>Filter List</p>
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
    }, [filteredTable, setFilteredTable, filter]);
}

FriendList.propTypes = {
    friends: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard']).isRequired,
    userInfo: PropTypes.any.isRequired
}

export default FriendList