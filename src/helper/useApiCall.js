import { useEffect, useState } from "react";

function useApiCall(fetchFunction, fetchParams) {
    const [results, setResults] = useState({loading: true, error: null, data: null});

    useEffect(() => {
        fetchFunction(...fetchParams).then(response => response.json())
        .then(data => setResults({loading: false, error: null, data: data}))
        .catch( e => {
            console.log(e.message);
            return setResults({loading: false, error: e, data: null});
        })
    // eslint-disable-next-line
    }, []);

    return results;
}

export default useApiCall;