import { useEffect, useState } from 'react';
import mockPFP from '../../logo192.png';

export function useProfileInfo(username) {
    const [results, setResults] = useState({loading: true, error: null, data: null});

    useEffect(() => {
        setResults({loading: true, error: null, data: null});
        /*
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => 
            response.json()
        ).then(data => 
            setResults({loading: false, error: null, data: data})
        ).catch( e => {
            console.log(e.message);
            return setResults({loading: false, error: e, data: null});
        });
        */
        const mockData = {profilePic: mockPFP};
        setResults({loading: false, error: null, data: mockData});
    }, [username]);

    return results;
}

export function useFriendsForUser(username) {
    const [results, setResults] = useState({loading: true, error: null, data: null});

    useEffect(() => {
        setResults({loading: true, error: null, data: null});
        /*
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => 
            response.json()
        ).then(data => 
            setResults({loading: false, error: null, data: data})
        ).catch( e => {
            console.log(e.message);
            return setResults({loading: false, error: e, data: null});
        });
        */
        const mockData = [
            {key: 'Friend 1', username: 'Friend 1', profilePic: mockPFP},
            {key: 'Friend 2', username: 'Friend 2', profilePic: mockPFP},
            {key: 'Friend 3', username: 'Friend 3', profilePic: mockPFP},
            {key: 'Friend 4', username: 'Friend 4', profilePic: mockPFP},
            {key: 'Friend 5', username: 'Friend 5', profilePic: mockPFP},
            {key: 'Friend 6', username: 'Friend 6', profilePic: mockPFP},
            {key: 'Friend 7', username: 'Friend 7', profilePic: mockPFP},
            {key: 'Friend 8', username: 'Friend 8', profilePic: mockPFP},
            {key: 'Friend 9', username: 'Friend 9', profilePic: mockPFP},
            {key: 'Friend 10', username: 'Friend 10', profilePic: mockPFP},
            {key: 'Friend 11', username: 'Friend 11', profilePic: mockPFP},
            {key: 'Friend 12', username: 'Friend 12', profilePic: mockPFP},
            {key: 'Friend 13', username: 'Friend 13', profilePic: mockPFP},
            {key: 'Friend 14', username: 'Friend 14', profilePic: mockPFP},
            {key: 'Friend 15', username: 'Friend 15', profilePic: mockPFP},
            {key: 'Friend 16', username: 'Friend 16', profilePic: mockPFP},
            {key: 'Friend 17', username: 'Friend 17', profilePic: mockPFP},
            {key: 'Friend 18', username: 'Friend 18', profilePic: mockPFP},
            {key: 'Friend 19', username: 'Friend 19', profilePic: mockPFP},
            {key: 'Friend 20', username: 'Friend 20', profilePic: mockPFP},
            //{key: 'Friend 21', username: 'username', profilePic: mockPFP}
        ];
        setResults({loading: false, error: null, data: mockData});
    }, [username]);

    return results;
}

export function useFriendRequests(username) {
    const [results, setResults] = useState({loading: true, error: null, data: null});

    useEffect(() => {
        setResults({loading: true, error: null, data: null});
        /*
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => 
            response.json()
        ).then(data => 
            setResults({loading: false, error: null, data: data})
        ).catch( e => {
            console.log(e.message);
            return setResults({loading: false, error: e, data: null});
        });
        */
        const mockData = [
            {key: 'Request 1', fromUsername: 'Friend 1', toUsername: username, profilePic: mockPFP},
            {key: 'Request 2', fromUsername: 'Friend 2', toUsername: username, profilePic: mockPFP},
            {key: 'Request 3', fromUsername: 'Friend 3', toUsername: username, profilePic: mockPFP},
            {key: 'Request 4', fromUsername: 'Friend 4', toUsername: username, profilePic: mockPFP},
            {key: 'Request 5', fromUsername: 'Friend 5', toUsername: username, profilePic: mockPFP},
            {key: 'Request 6', fromUsername: 'Friend 6', toUsername: username, profilePic: mockPFP},
            {key: 'Request 7', fromUsername: 'Friend 7', toUsername: username, profilePic: mockPFP},
            {key: 'Request 8', fromUsername: 'Friend 8', toUsername: username, profilePic: mockPFP},
            {key: 'Request 9', fromUsername: 'Friend 9', toUsername: username, profilePic: mockPFP},
            {key: 'Request 10', fromUsername: 'Friend 10', toUsername: username, profilePic: mockPFP},
            {key: 'Request 11', fromUsername: 'Request 11', toUsername: username, profilePic: mockPFP},
            {key: 'Request 12', fromUsername: 'Request 12', toUsername: username, profilePic: mockPFP},
            {key: 'Request 13', fromUsername: 'Request 13', toUsername: username, profilePic: mockPFP},
            {key: 'Request 14', fromUsername: 'Request 14', toUsername: username, profilePic: mockPFP},
            {key: 'Request 15', fromUsername: 'Request 15', toUsername: username, profilePic: mockPFP},
            {key: 'Request 16', fromUsername: 'Request 16', toUsername: username, profilePic: mockPFP},
            {key: 'Request 17', fromUsername: 'Request 17', toUsername: username, profilePic: mockPFP},
            {key: 'Request 18', fromUsername: 'Request 18', toUsername: username, profilePic: mockPFP},
            {key: 'Request 19', fromUsername: 'Request 19', toUsername: username, profilePic: mockPFP},
            {key: 'Request 20', fromUsername: 'Request 20', toUsername: username, profilePic: mockPFP},
            {key: 'Request 21', fromUsername: username, toUsername: 'Friend 1', profilePic: mockPFP},
            {key: 'Request 22', fromUsername: username, toUsername: 'Friend 22', profilePic: mockPFP},
            {key: 'Request 23', fromUsername: username, toUsername: 'Friend 23', profilePic: mockPFP},
            {key: 'Request 24', fromUsername: username, toUsername: 'Friend 24', profilePic: mockPFP},
            {key: 'Request 25', fromUsername: username, toUsername: 'Friend 25', profilePic: mockPFP},
            {key: 'Request 26', fromUsername: username, toUsername: 'Friend 26', profilePic: mockPFP},
            {key: 'Request 27', fromUsername: username, toUsername: 'Friend 27', profilePic: mockPFP},
            {key: 'Request 28', fromUsername: username, toUsername: 'Friend 28', profilePic: mockPFP},
            {key: 'Request 29', fromUsername: username, toUsername: 'Friend 29', profilePic: mockPFP},
            {key: 'Request 30', fromUsername: username, toUsername: 'Friend 30', profilePic: mockPFP},
            {key: 'Request 31', fromUsername: username, toUsername: 'Request 31', profilePic: mockPFP},
            {key: 'Request 32', fromUsername: username, toUsername: 'Request 32', profilePic: mockPFP},
            {key: 'Request 33', fromUsername: username, toUsername: 'Request 33', profilePic: mockPFP},
            {key: 'Request 34', fromUsername: username, toUsername: 'Request 34', profilePic: mockPFP},
            {key: 'Request 35', fromUsername: username, toUsername: 'Request 35', profilePic: mockPFP},
            {key: 'Request 36', fromUsername: username, toUsername: 'Request 36', profilePic: mockPFP},
            {key: 'Request 37', fromUsername: username, toUsername: 'Request 37', profilePic: mockPFP},
            {key: 'Request 38', fromUsername: username, toUsername: 'Request 38', profilePic: mockPFP},
            {key: 'Request 39', fromUsername: username, toUsername: 'Request 39', profilePic: mockPFP},
            {key: 'Request 40', fromUsername: username, toUsername: 'Request 40', profilePic: mockPFP},
        ];
        setResults({loading: false, error: null, data: mockData});
    }, [username]);

    return results;
}

export function useFriendRecommendations(username) {
    const [results, setResults] = useState({loading: true, error: null, data: null});

    useEffect(() => {
        setResults({loading: true, error: null, data: null});
        /*
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => 
            response.json()
        ).then(data => 
            setResults({loading: false, error: null, data: data})
        ).catch( e => {
            console.log(e.message);
            return setResults({loading: false, error: e, data: null});
        });
        */
        const mockData = [
            {key: 'Recommendation 1', username: 'Recommendation 1', profilePic: mockPFP},
            {key: 'Recommendation 2', username: 'Recommendation 2', profilePic: mockPFP},
            {key: 'Recommendation 3', username: 'Recommendation 3', profilePic: mockPFP},
            {key: 'Recommendation 4', username: 'Recommendation 4', profilePic: mockPFP},
            {key: 'Recommendation 5', username: 'Recommendation 5', profilePic: mockPFP},
            {key: 'Recommendation 6', username: 'Recommendation 6', profilePic: mockPFP},
            {key: 'Recommendation 7', username: 'Recommendation 7', profilePic: mockPFP},
            {key: 'Recommendation 8', username: 'Recommendation 8', profilePic: mockPFP},
            {key: 'Recommendation 9', username: 'Recommendation 9', profilePic: mockPFP},
            {key: 'Recommendation 10', username: 'Recommendation 10', profilePic: mockPFP},
            {key: 'Recommendation 11', username: 'Recommendation 11', profilePic: mockPFP},
            {key: 'Recommendation 12', username: 'Recommendation 12', profilePic: mockPFP},
            {key: 'Recommendation 13', username: 'Recommendation 13', profilePic: mockPFP},
            {key: 'Recommendation 14', username: 'Recommendation 14', profilePic: mockPFP},
            {key: 'Recommendation 15', username: 'Recommendation 15', profilePic: mockPFP},
            {key: 'Recommendation 16', username: 'Recommendation 16', profilePic: mockPFP},
            {key: 'Recommendation 17', username: 'Recommendation 17', profilePic: mockPFP},
            {key: 'Recommendation 18', username: 'Recommendation 18', profilePic: mockPFP},
            {key: 'Recommendation 19', username: 'Recommendation 19', profilePic: mockPFP},
            {key: 'Recommendation 20', username: 'Recommendation 20', profilePic: mockPFP},
            {key: 'Recommendation 21', username: 'Recommendation 21', profilePic: mockPFP},
            {key: 'Recommendation 22', username: 'Recommendation 22', profilePic: mockPFP},
            {key: 'Recommendation 23', username: 'Recommendation 23', profilePic: mockPFP},
            {key: 'Recommendation 24', username: 'Recommendation 24', profilePic: mockPFP},
            {key: 'Recommendation 25', username: 'Recommendation 25', profilePic: mockPFP},
            {key: 'Recommendation 26', username: 'Recommendation 26', profilePic: mockPFP},
            {key: 'Recommendation 27', username: 'Recommendation 27', profilePic: mockPFP},
            {key: 'Recommendation 28', username: 'Recommendation 28', profilePic: mockPFP},
            {key: 'Recommendation 29', username: 'Recommendation 29', profilePic: mockPFP},
            {key: 'Recommendation 30', username: 'Recommendation 30', profilePic: mockPFP},
            {key: 'Recommendation 31', username: 'Recommendation 31', profilePic: mockPFP},
            {key: 'Recommendation 32', username: 'Recommendation 32', profilePic: mockPFP},
            {key: 'Recommendation 33', username: 'Recommendation 33', profilePic: mockPFP},
            {key: 'Recommendation 34', username: 'Recommendation 34', profilePic: mockPFP},
            {key: 'Recommendation 35', username: 'Recommendation 35', profilePic: mockPFP},
            {key: 'Recommendation 36', username: 'Recommendation 36', profilePic: mockPFP},
            {key: 'Recommendation 37', username: 'Recommendation 37', profilePic: mockPFP},
            {key: 'Recommendation 38', username: 'Recommendation 38', profilePic: mockPFP},
            {key: 'Recommendation 39', username: 'Recommendation 39', profilePic: mockPFP},
            {key: 'Recommendation 40', username: 'Recommendation 40', profilePic: mockPFP},
        ];
        setResults({loading: false, error: null, data: mockData});
    }, []);

    return results;
}