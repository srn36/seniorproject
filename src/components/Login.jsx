/*
 * Adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import React, { useState, useEffect } from 'react';
import { getToken, storeToken } from '../helper/tokens';
import Home from './Home';
import { fetchLoginTokenFromCredentials } from '../helper/apiCalls';
import '../styles/Login.css';

function Login(props) {
    const submitCredentials = /*async*/ e => {
        e.preventDefault();
        const credentials = {
            'username': username,
            'password': password
        };
        setUserInfo({...credentials});
        const token = /*await*/ fetchLoginTokenFromCredentials(credentials);
        storeToken(token);
    }

    const loginInputs = () => {
        return (
            <div class='center'>
                <h1>LOGIN</h1>
                <form onSubmit={submitCredentials}>        
                    <div class='center'>
                        <label>
                            <p class='center'>Username</p>
                            <input type="text" onChange={e => setUsername(e.target.value)}></input>
                        </label>
                    </div>
                    <div class='center'>
                        <label>
                            <p class='center'>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        </label>
                    </div>
                    <div class='center'>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        );
    };

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [userInfo, setUserInfo] = useState(props.userInfo);
    const [content, setContent] = useState(loginInputs());

    useEffect(() => {
        if(getToken() || (userInfo && Object.keys(userInfo).length > 0)) {
            setContent(<Home {...props} userInfo={userInfo}/>);
        }
    }, [props, userInfo]);   

    return content;
}

export default Login