import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FriendRow from './FriendRow';
import { Table } from 'react-bootstrap';

function FriendList(props) {
    //Convert the full friend list to rows of the table based on the type of table requested
    const friendTable = useMemo(() => {
        const {friends, type, userInfo} = props;
        return friends.map(friend => {
            const friendUsername = type === 'Requests' ? friend.fromUsername : friend.username;
            return (
                <FriendRow
                    key={friendUsername}
                    username={friendUsername}
                    profilePic={friend.profilePic}
                    userInfo={userInfo}
                    rowType={type}
                />
            );
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
                            <th className='friend-list-header'>
                                <p>Filter List</p>
                                <input type='text' onChange={e => filter(e.target.value)}/>
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
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard', 'Recommendations']).isRequired,
    userInfo: PropTypes.any.isRequired
}

export default FriendList;