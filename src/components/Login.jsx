/*
 * Adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import React, { useState } from 'react';
import { getToken, storeToken } from '../helper/tokens';
import { fetchLoginTokenFromCredentials } from '../helper/apiCalls';
import '../styles/Login.css';
import { Navigate } from 'react-router-dom/dist';
import { useEffect } from 'react';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [content, setContent] = useState(); 
    const loginToken = getToken();

    useEffect(() => {
        const submitCredentials = /*async*/ e => {
            e.preventDefault();
            const credentials = {
                'username': username,
                'password': password
            };
            const token = /*await*/ fetchLoginTokenFromCredentials(credentials);
            storeToken(token);
            setContent(<Navigate to='/' />);
        }

        setContent(
            <div className='center'>
                <h1>LOGIN</h1>
                <form onSubmit={submitCredentials}>        
                    <div className='center'>
                        <label>
                            <p className='center'>Username</p>
                            <input type="text" onChange={e => setUsername(e.target.value)}></input>
                        </label>
                    </div>
                    <div className='center'>
                        <label>
                            <p className='center'>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        </label>
                    </div>
                    <div className='center'>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        );
    }, [username, password]);

    return (loginToken != null) ? <Navigate to='/' /> : content;
}

export default Login