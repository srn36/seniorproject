import { useEffect, useState } from 'react';

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
        ).catch(e => {
            console.log(e.message);
            return setResults({loading: false, error: e, data: null});
        });
        */
        const mockData = [
            {key: 'Friend 1', username: 'test'},
            {key: 'Friend 2', username: 'Friend 2'},
            {key: 'Friend 3', username: 'Friend 3'},
            {key: 'Friend 4', username: 'Friend 4'},
            {key: 'Friend 5', username: 'Friend 5'},
            {key: 'Friend 6', username: 'Friend 6'},
            {key: 'Friend 7', username: 'Friend 7'},
            {key: 'Friend 8', username: 'Friend 8'},
            {key: 'Friend 9', username: 'Friend 9'},
            {key: 'Friend 10', username: 'Friend 10'},
            {key: 'Friend 11', username: 'Friend 11'},
            {key: 'Friend 12', username: 'Friend 12'},
            {key: 'Friend 13', username: 'Friend 13'},
            {key: 'Friend 14', username: 'Friend 14'},
            {key: 'Friend 15', username: 'Friend 15'},
            {key: 'Friend 16', username: 'Friend 16'},
            {key: 'Friend 17', username: 'Friend 17'},
            {key: 'Friend 18', username: 'Friend 18'},
            {key: 'Friend 19', username: 'Friend 19'},
            {key: 'Friend 20', username: 'Friend 20'},
            //{key: 'Friend 21', username: 'username'}
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
            {key: 'Request 1', fromUsername: 'Friend 1', toUsername: username},
            {key: 'Request 2', fromUsername: 'Friend 2', toUsername: username},
            {key: 'Request 3', fromUsername: 'Friend 3', toUsername: username},
            {key: 'Request 4', fromUsername: 'Friend 4', toUsername: username},
            {key: 'Request 5', fromUsername: 'Friend 5', toUsername: username},
            {key: 'Request 6', fromUsername: 'Friend 6', toUsername: username},
            {key: 'Request 7', fromUsername: 'Friend 7', toUsername: username},
            {key: 'Request 8', fromUsername: 'Friend 8', toUsername: username},
            {key: 'Request 9', fromUsername: 'Friend 9', toUsername: username},
            {key: 'Request 10', fromUsername: 'Friend 10', toUsername: username},
            {key: 'Request 11', fromUsername: 'Request 11', toUsername: username},
            {key: 'Request 12', fromUsername: 'Request 12', toUsername: username},
            {key: 'Request 13', fromUsername: 'Request 13', toUsername: username},
            {key: 'Request 14', fromUsername: 'Request 14', toUsername: username},
            {key: 'Request 15', fromUsername: 'Request 15', toUsername: username},
            {key: 'Request 16', fromUsername: 'Request 16', toUsername: username},
            {key: 'Request 17', fromUsername: 'Request 17', toUsername: username},
            {key: 'Request 18', fromUsername: 'Request 18', toUsername: username},
            {key: 'Request 19', fromUsername: 'Request 19', toUsername: username},
            {key: 'Request 20', fromUsername: 'Request 20', toUsername: username},
            {key: 'Request 21', fromUsername: username, toUsername: 'Friend 1'},
            {key: 'Request 22', fromUsername: username, toUsername: 'Friend 22'},
            {key: 'Request 23', fromUsername: username, toUsername: 'Friend 23'},
            {key: 'Request 24', fromUsername: username, toUsername: 'Friend 24'},
            {key: 'Request 25', fromUsername: username, toUsername: 'Friend 25'},
            {key: 'Request 26', fromUsername: username, toUsername: 'Friend 26'},
            {key: 'Request 27', fromUsername: username, toUsername: 'Friend 27'},
            {key: 'Request 28', fromUsername: username, toUsername: 'Friend 28'},
            {key: 'Request 29', fromUsername: username, toUsername: 'Friend 29'},
            {key: 'Request 30', fromUsername: username, toUsername: 'Friend 30'},
            {key: 'Request 31', fromUsername: username, toUsername: 'Request 31'},
            {key: 'Request 32', fromUsername: username, toUsername: 'Request 32'},
            {key: 'Request 33', fromUsername: username, toUsername: 'Request 33'},
            {key: 'Request 34', fromUsername: username, toUsername: 'Request 34'},
            {key: 'Request 35', fromUsername: username, toUsername: 'Request 35'},
            {key: 'Request 36', fromUsername: username, toUsername: 'Request 36'},
            {key: 'Request 37', fromUsername: username, toUsername: 'Request 37'},
            {key: 'Request 38', fromUsername: username, toUsername: 'Request 38'},
            {key: 'Request 39', fromUsername: username, toUsername: 'Request 39'},
            {key: 'Request 40', fromUsername: username, toUsername: 'Request 40'},
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
            {key: 'Recommendation 1', username: 'Recommendation 1'},
            {key: 'Recommendation 2', username: 'Recommendation 2'},
            {key: 'Recommendation 3', username: 'Recommendation 3'},
            {key: 'Recommendation 4', username: 'Recommendation 4'},
            {key: 'Recommendation 5', username: 'Recommendation 5'},
            {key: 'Recommendation 6', username: 'Recommendation 6'},
            {key: 'Recommendation 7', username: 'Recommendation 7'},
            {key: 'Recommendation 8', username: 'Recommendation 8'},
            {key: 'Recommendation 9', username: 'Recommendation 9'},
            {key: 'Recommendation 10', username: 'Recommendation 10'},
            {key: 'Recommendation 11', username: 'Recommendation 11'},
            {key: 'Recommendation 12', username: 'Recommendation 12'},
            {key: 'Recommendation 13', username: 'Recommendation 13'},
            {key: 'Recommendation 14', username: 'Recommendation 14'},
            {key: 'Recommendation 15', username: 'Recommendation 15'},
            {key: 'Recommendation 16', username: 'Recommendation 16'},
            {key: 'Recommendation 17', username: 'Recommendation 17'},
            {key: 'Recommendation 18', username: 'Recommendation 18'},
            {key: 'Recommendation 19', username: 'Recommendation 19'},
            {key: 'Recommendation 20', username: 'Recommendation 20'},
            {key: 'Recommendation 21', username: 'Recommendation 21'},
            {key: 'Recommendation 22', username: 'Recommendation 22'},
            {key: 'Recommendation 23', username: 'Recommendation 23'},
            {key: 'Recommendation 24', username: 'Recommendation 24'},
            {key: 'Recommendation 25', username: 'Recommendation 25'},
            {key: 'Recommendation 26', username: 'Recommendation 26'},
            {key: 'Recommendation 27', username: 'Recommendation 27'},
            {key: 'Recommendation 28', username: 'Recommendation 28'},
            {key: 'Recommendation 29', username: 'Recommendation 29'},
            {key: 'Recommendation 30', username: 'Recommendation 30'},
            {key: 'Recommendation 31', username: 'Recommendation 31'},
            {key: 'Recommendation 32', username: 'Recommendation 32'},
            {key: 'Recommendation 33', username: 'Recommendation 33'},
            {key: 'Recommendation 34', username: 'Recommendation 34'},
            {key: 'Recommendation 35', username: 'Recommendation 35'},
            {key: 'Recommendation 36', username: 'Recommendation 36'},
            {key: 'Recommendation 37', username: 'Recommendation 37'},
            {key: 'Recommendation 38', username: 'Recommendation 38'},
            {key: 'Recommendation 39', username: 'Recommendation 39'},
            {key: 'Recommendation 40', username: 'Recommendation 40'},
        ];
        setResults({loading: false, error: null, data: mockData});
    }, []);

    return results;
}