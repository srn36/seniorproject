import React, { useState, useEffect } from 'react';
import { Autocomplete, HighlightMatch, View } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import mockPFP from '../../../logo192.png';


// Mock data for testing
const createMockUserList = () => {
    let userList = [
        {key: 'Alejandro Escamilla', username: 'Alejandro Escamilla', profilepic: mockPFP},
        {key: 'Paul Jarvis', username: 'Paul Jarvis', profilepic: mockPFP},
        {key: 'test1', username: 'test1', profilepic: mockPFP},
        {key: 'Aleks Dorohovich', username: 'Aleks Dorohovich', profilepic: mockPFP},
    ];
    for(let i = 0; i < 15; i++) {
        userList = [{key: `User ${i}`, username: `User ${i}`, profilepic: mockPFP}, {key: `Person ${i}`, username: `Person ${i}`, profilepic: mockPFP}, ...userList];
    }
    return userList;
};
const mockUserList = createMockUserList();
const sendMockQuery = (query) => {
    return mockUserList.filter(user => user.username.includes(query));
};
// End of mock functions


function renderOption(option, value) {
    const { username, profilepic } = option
    return (
        <Link className='search-result' to={`/profile/${username}`}>
            <span>
                <img src={profilepic} alt=''/>
                <HighlightMatch query={value}>
                    {username}
                </HighlightMatch>
            </span>
        </Link>
    );
}

function SearchBar(props) {
    const MIN_CHARS_FOR_QUERY = 3;
    const [queryText, setQueryText] = useState('');
    const [results, setResults] = useState([]);

    const onClear = () => {
        setQueryText('');
    };

    const optionFilter = (option, value) => {
        return option?.username?.includes(value);
    }

    useEffect(() => {
        if(queryText.length >= MIN_CHARS_FOR_QUERY) {
            const queryResults = sendMockQuery(queryText);
            setResults(queryResults);
        }
        else {
            setResults([]);
        }
    }, [queryText, setResults]);

    return (
        <div className='search'>
            <Autocomplete 
                label='Search Bar'
                placeholder='Search for users'
                value={queryText}
                onClear={onClear}
                optionFilter={optionFilter}
                renderOption={renderOption}
                options={results}
                onChange={e => setQueryText(e.target.value)}
                menuSlots={{
                    Empty:  (queryText.length >= MIN_CHARS_FOR_QUERY ? 
                                <View>No matching users found</View> : 
                                <View>Username must be {`${MIN_CHARS_FOR_QUERY}`} characters long to get results</View>
                            ),
                }}
                labelHidden
            />
        </div>
    );
}

export default SearchBar;