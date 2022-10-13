/*
 * Adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import { useState } from 'react';

function useToken() {
    const getToken = () => {
        const storedToken = sessionStorage.getItem('token');
        console.log(storedToken);
        const userLoginToken = JSON.parse(storedToken);
        return userLoginToken?.token
    };

    const [token, setToken] = useState(getToken());

    const storeToken = userLoginToken => {
        sessionStorage.setItem('token', JSON.stringify(userLoginToken));
        setToken(userLoginToken.token);
    };

    return {
        token,
        setToken: storeToken       
    }
}

export default useToken