import React, { useState, useEffect } from 'react';
import { TextField } from '@aws-amplify/ui-react';
import mockPFP from '../../logo192.png';
import SearchResults from './SearchResults';

// Mock data for testing
const createMockUserList = () => {
    let userList = [
        {key: 'Alejandro Escamilla', username: 'Alejandro Escamilla', profilePic: mockPFP},
        {key: 'Paul Jarvis', username: 'Paul Jarvis', profilePic: mockPFP},
        {key: 'test1', username: 'test1', profilePic: mockPFP},
        {key: 'Aleks Dorohovich', username: 'Aleks Dorohovich', profilePic: mockPFP},
    ];
    for(let i = 0; i < 15; i++) {
        userList = [{key: `User ${i}`, username: `User ${i}`, profilePic: mockPFP}, {key: `Person ${i}`, username: `Person ${i}`, profilePic: mockPFP}, ...userList];
    }
    return userList;
};
const mockUserList = createMockUserList();
const sendMockQuery = (query) => {
    return mockUserList.filter(user => user.username.includes(query));
};

function SearchBar(props) {
    const MIN_CHARS_FOR_QUERY = 3;
    const [queryText, setQueryText] = useState('');
    const [results, setResults] = useState([]);

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
        <div className='search-bar'>
            <TextField
                label='Search Bar'
                placeholder='Search for users'
                onChange={e => setQueryText(e.target.value)}
                labelHidden
            />
            {
                (queryText.length >= MIN_CHARS_FOR_QUERY) &&
                <SearchResults results={results} query={queryText}/>
            }
        </div>
    );
}

export default SearchBar;