/*
 * Adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import React, { useState, useEffect } from 'react';
import { storeToken } from '../helper/tokens';
import Home from './Home';

function Login(props) {   
    const submitCredentials = /*async*/ e => {
        e.preventDefault();
        const token = /*await*/ validateLogin({
            'username': username,
            'password': password
        });
        storeToken(token);
    }

    const loginInputs = () => {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={submitCredentials}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUsername(e.target.value)}></input>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}></input>
                    </label>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        );
    };

    const validateLogin = /*async*/ (credentials) => {
        /*
        return fetch('login validation service', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(data => 
            data.json()
        );
        */
        setUserInfo({...credentials});
        return "login token";
    }

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [userInfo, setUserInfo] = useState(props.userInfo);
    const [content, setContent] = useState(loginInputs());

    useEffect(() => {
        if(userInfo && Object.keys(userInfo).length > 0) {
            setContent(<Home {...props} userInfo={userInfo}/>);
        }
    }, [props, userInfo]);   

    return content;
}

export default Login