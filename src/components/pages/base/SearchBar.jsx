import React, { useEffect, useState } from 'react';
import { Autocomplete, HighlightMatch, View } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../../../helper/api-calls/cognito-access';

function SearchBar(props) {
    const MIN_CHARS_FOR_QUERY = 3;
    const [queryText, setQueryText] = useState('');
    const [userList, setuserList] = useState([]);

    useEffect(() => {
        async function fetchUserList() {
            const users = (await searchUsers()).Users;
            const errorFreeUsers = users.map(userResult => {
                return {username: userResult.Username};
            });
            setuserList(errorFreeUsers);
        };
        fetchUserList();
    }, []);

    const clearSearch = () => {
        setQueryText('');
    };

    const renderOption = (option, value) => {
        const { username } = option;
        return (
            <Link 
                className='search-result'
                to={`/profile/${username}`}
                onClick={clearSearch}
            >
                <span>
                    <HighlightMatch query={value}>
                        {username}
                    </HighlightMatch>
                </span>
            </Link>
        );
    };

    const optionFilter = (option, value) => {
        return option?.username?.includes(value) && value.length >= MIN_CHARS_FOR_QUERY;
    };

    const handleInputChange = async (e) => {
        setQueryText(e.target.value);
    };

    return (
        <div className='search'>
            <Autocomplete 
                label='Search Bar'
                placeholder='Search for users'
                value={queryText}
                onClear={clearSearch}
                renderOption={renderOption}
                optionFilter={optionFilter}
                options={userList}
                onChange={handleInputChange}
                menuSlots={{
                    Empty:  (queryText.length >= MIN_CHARS_FOR_QUERY ? 
                                <View>No matching users found</View> : 
                                <View>Username must be {`${MIN_CHARS_FOR_QUERY}`} characters long to get results</View>
                            ),
                }}
                //disabled={loading}
                isLoading={!userList}
                labelHidden
            />
        </div>
    );
}

export default SearchBar;