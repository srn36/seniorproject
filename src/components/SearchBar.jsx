import React, { useState, useEffect } from 'react';
import { TextField } from '@aws-amplify/ui-react';


function SearchBar(props) {
    const [queryText, setQueryText] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const sendQuery = (query) => [];
        if(queryText.length > 0) {
            const queryResults = sendQuery(queryText);
            setResults(queryResults);
        }
    }, [queryText, setResults]);

    useEffect(() => {

    }, [results, setSuggestions]);

    return (
        <div className='search-bar'>
            <div className={`bar-and-results-${!!suggestions.length}`}>
                <TextField
                    label='Search Bar'
                    placeholder='Search for users'
                    onChange={e => setQueryText(e.target.value)}
                    labelHidden
                />
            </div>
            <button>S</button>
        </div>
    );
}

export default SearchBar;