import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import FriendRow from './FriendRow';
import { Table } from 'react-bootstrap';
import { Divider } from '@aws-amplify/ui-react';

function reducer(state, action) {
    if(action.type === 'remove_row') {
        // TODO: Send request to DB and only run the following on success

        const updatedList = state.friends.filter(friend => friend[state.nameField] !== action.username);
        const updatedTable = state.friendTable.filter(friend => friend.props.username !== action.username);
        const updatedRows = updatedTable.filter(friend => friend.props.username.includes(state.filterText));

        return {
            nameField: state.nameField,
            friends: updatedList,
            friendTable: updatedTable,
            tableRows: updatedRows,
            filterText: state.filterText
        };
    } else if(action.type === 'filter_rows') {
        return {
            nameField: state.nameField,
            friends: state.friends,
            friendTable: state.friendTable,
            tableRows: state.friendTable.filter(friend => friend.props.username.includes(action.filterText)),
            filterText: action.filterText
        };
    }
    throw Error('Unknown action.');
}

function FriendList({ friends, userInfo, ...props }) {
    const {type} = props;
    const nameField = (type === 'Requests') ? 'fromUsername' : 'username';

    const [state, dispatch] = useReducer(reducer, {
        nameField: nameField,
        friends: friends,
        friendTable: (
            (Object.values(friends).length > 0) ?
                friends.map(friend => {
                    const friendUsername = friend[nameField];
                    return (
                        <FriendRow
                            key={friendUsername}
                            username={friendUsername}
                            profilePic={friend.profilePic}
                            userInfo={userInfo}
                            rowType={type}
                            deleteRow={(name) => dispatch({type: 'remove_row', username: name})}
                        />
                    );
                })
                :
                []
        ),
        tableRows: [],
        filterText: ''
    });

    return useMemo(() => {
        const noFriends = (type === 'Requests' || type === 'Recommendations') ? ` ${type}` : 's';

        return (
            <>
                <div 
                    className='list-header'
                    style={
                        (Object.values(state.friends).length === 0) ? 
                            {pointerEvents: 'none'}
                            :
                            {}
                    }
                >
                    <span>
                        <p>Filter List:</p>
                        <input type='text' onChange={e => {dispatch({type: 'filter_rows', filterText: e.target.value});}}/>
                    </span>
                    <span>
                        <p>Filtered Total: {(state.filterText.length > 0) ? state.tableRows.length : state.friendTable.length}</p>
                        <Divider orientation='vertical'/>
                        <p>Overall Total: {state.friendTable.length}</p>
                    </span>
                </div>
                <div className={`friend-list-${type}`}>
                    <Table bordered hover>
                        <tbody>
                            {
                                (state.friendTable.length === 0) ? 
                                    <tr style={{pointerEvents: 'none'}}><td><p>{`User Has No Friend${noFriends}`}</p></td></tr>
                                    :
                                    (
                                        (state.tableRows.length > 0) ? 
                                            state.tableRows 
                                            :
                                            (
                                                (state.filterText.length > 0) ?
                                                    <tr style={{pointerEvents: 'none'}}><td><p>No Results</p></td></tr>
                                                    :
                                                    state.friendTable
                                            )
                                    )
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }, [type, state]);
}

FriendList.propTypes = {
    type: PropTypes.oneOf(['Removable', 'Requests', 'Standard', 'Recommendations']).isRequired
};

export default FriendList;