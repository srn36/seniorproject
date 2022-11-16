import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FriendRow from './FriendRow';
import { Table } from 'react-bootstrap';

function FriendList({ friends, userInfo, ...props }) {
    const {type} = props;
    //Convert the full friend list to rows of the table based on the type of table requested
    const friendTable = useMemo(() => {
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
    }, [friends, userInfo, type]);

    const [tableRows, setTableRows] = useState(friendTable);

    //Function to filter the rows of the table to only show results containing the value of text within their username field
    const filter = useCallback((text) => {
        setTableRows(friendTable.filter(friend => friend.props.username.includes(text)));
    }, [friendTable, setTableRows]);

    return useMemo(() => {
        return (
            <>
                <div className='filter'>
                    <p>Filter List:</p>
                    <input type='text' onChange={e => filter(e.target.value)}/>
                </div>
                <div className={`friend-list-${type}`}>
                    <Table bordered hover>
                        <tbody>
                            {
                                (Object.keys(tableRows).length > 0) ? tableRows : <tr><td><p>No Results</p></td></tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }, [type, tableRows, filter]);
}

FriendList.propTypes = {
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard', 'Recommendations']).isRequired
};

export default FriendList;