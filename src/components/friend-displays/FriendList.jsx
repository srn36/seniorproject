import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import FriendRow from './FriendRow';
import { Table } from 'react-bootstrap';
import { Divider } from '@aws-amplify/ui-react';

function reducer(state, action) {
    if (action.type === 'remove_row') {
        if(state.friends[0]) {
            const nameField = (state.friends[0].fromUsername && 
                                state.friends[0].fromUsername.length > 0) ? 
                                    'fromUsername' : 'username';
            return {
                friends: state.friends.filter(friend => friend[nameField] !== action.username)
            };
        } else {
            return {
                friends: state.friends
            }
        }
    }
    throw Error('Unknown action.');
}

function FriendList({ friends, userInfo, ...props }) {
    const {type} = props;
    const [state, dispatch] = useReducer(reducer, {friends: friends});
    const [friendTable, setFriendTable] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    
    //Convert the full friend list to rows of the table based on the type of table requested
    useEffect(() => {
        const friendRowMap = state.friends.map(friend => {
            const friendUsername = (type === 'Requests') ? friend.fromUsername : friend.username;
            return (
                <FriendRow
                    key={friendUsername}
                    username={friendUsername}
                    profilePic={friend.profilePic}
                    userInfo={userInfo}
                    rowType={type}
                    onDeleteRow={(name) => {dispatch({type: 'remove_row', username: name});}}
                />
            );
        });
        setFriendTable(friendRowMap);
    }, [state.friends, userInfo, type]);

    /**
     * Filter the rows of the table to only show results 
     * which include <text> within their username field.
     * Updates the displayed table rows after filtering.
     * 
     * Executes each time filter text is changed or the
     * master (unfiltered) FriendRow table changes.
     */
    useEffect(() => {
        const filter = (text) => {
            setTableRows(
                friendTable.filter(friend => friend.props.username.includes(text))
            );
        }
        filter(filterText);
    }, [filterText, friendTable]);

    return useMemo(() => {
        return (
            <>
                <div className='list-header'>
                    <span>
                        <p>Filter List:</p>
                        <input type='text' onChange={e => setFilterText(e.target.value)}/>
                    </span>
                    <span>
                        <p>Filtered Total: {!!(tableRows?.length) ? tableRows.length : 0}</p>
                        <Divider orientation='vertical'/>
                        <p>Overall Total: {!!(friendTable?.length) ? friendTable.length : 0}</p>
                    </span>
                </div>
                <div className={`friend-list-${type}`}>
                    <Table bordered hover>
                        <tbody>
                            {
                                (tableRows?.length > 0) ? tableRows : <tr><td><p>No Results</p></td></tr>
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }, [type, tableRows, friendTable]);
}

FriendList.propTypes = {
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard', 'Recommendations']).isRequired
};

export default FriendList;