import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HighlightMatch } from '@aws-amplify/ui-react';

function ResultRow({ username, profilePic, query }) {
    return (
        <tr>
            <td>
                <Link className='search-result' to={`/profile/${username}`} reloadDocument>
                    <span>
                        <img src={profilePic} alt=''/>
                        <HighlightMatch className='result-text' query={query}>
                            {username}
                        </HighlightMatch>
                    </span>
                </Link>
            </td>
        </tr>
    );
}

function SearchResults({ results, query }) {
    const tableRows = useMemo(() => {
        return results.length > 0 ? 
            results.map(result => 
                <ResultRow
                    key={result.key}
                    username={result.username}
                    profilePic={result.profilePic}
                    query={query}
                />
            ) 
            : <tr><td><p>No Results</p></td></tr>;
    }, [results, query]);

    return (
        <div className='suggestions-table'>
            <Table bordered hover>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </div>       
    );
}

export default SearchResults;