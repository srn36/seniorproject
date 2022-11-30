import React, { useState } from 'react';
import { Autocomplete, HighlightMatch, View } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../../../helper/api-calls/cognito-access';

function SearchBar(props) {
    const MIN_CHARS_FOR_QUERY = 3;
    const [queryText, setQueryText] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const clearSearch = () => {
        setQueryText('');
        setResults([]);
        setLoading(false);
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
        return option?.username?.includes(value);
    };

    const handleInputChange = async (e) => {
        const input = e.target.value;
        setLoading(true);
        setQueryText(input);
        if(input.length >= MIN_CHARS_FOR_QUERY) {
            try {
                const queryResults = (await searchUsers(input)).Users;
                const errorFreeResults = queryResults.map(userResult => {
                    return {username: userResult.Username};
                });
                setResults(errorFreeResults);
                setLoading(false);
            } catch(e) {
                setResults([]);
                setLoading(false);
                console.log('Error searching for users: ', e);
            }
        }
        else {
            setResults([]);
            setLoading(false);
        }
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
                options={results}
                onChange={handleInputChange}
                menuSlots={{
                    Empty:  (queryText.length >= MIN_CHARS_FOR_QUERY ? 
                                <View>No matching users found</View> : 
                                <View>Username must be {`${MIN_CHARS_FOR_QUERY}`} characters long to get results</View>
                            ),
                }}
                //disabled={loading}
                isLoading={loading}
                labelHidden
            />
        </div>
    );
}

export default SearchBar;