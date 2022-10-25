import React, { useCallback, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import FriendRow from "./FriendRow";
import RemovableFriendRow from "./RemovableFriendRow";
import FriendRequestRow from "./FriendRequestRow";
import { Table } from "react-bootstrap";

function FriendList(props) {
    //Convert the full friend list to rows of the table based on the type of table requested
    const friendTable = useMemo(() => {
        const {friends, type, userInfo} = props;
        return friends.map(friend => {
            const rowTypes = {
                Standard: <FriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
                Removable: <RemovableFriendRow key={friend.username} username={friend.username} profilePic={friend.profilePic} userInfo={userInfo}/>,
                Requests: <FriendRequestRow key={friend.fromUsername} username={friend.fromUsername} profilePic={friend.profilePic} userInfo={userInfo}/>
            };
            return rowTypes[type];
        });
    }, [props]);

    const [tableRows, setTableRows] = useState(friendTable);

    //Function to filter the rows of the table to only show results containing the value of text within their username field
    const filter = useCallback((text) => {
        setTableRows(friendTable.filter(friend => friend.props.username.includes(text)));
    }, [friendTable, setTableRows]);

    return useMemo(() => {
        return (
            <div className={`friend-list-${props.type}`}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className="friend-list-header">
                                <p>Filter List</p>
                                <input type="text" onChange={e => filter(e.target.value)}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (Object.keys(tableRows).length > 0) ? tableRows : <tr><td><p>No Results</p></td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        );
    }, [props.type, tableRows, filter]);
}

FriendList.propTypes = {
    friends: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard']).isRequired,
    userInfo: PropTypes.any.isRequired
}

export default FriendList;