/*
 * Adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import React, { useState } from 'react';
import { /*getToken,*/ storeToken } from '../helper/tokens';
import { fetchLoginTokenFromCredentials, fetchUserInfoFromToken } from '../helper/apiCalls';
import { useNavigate } from 'react-router-dom/dist';
import { useEffect } from 'react';
import backg from '../BG.jpeg';

<body background={backg} />

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();
    //const loginToken = getToken();

    useEffect(() => {
        const submitCredentials = /*async*/ e => {
            e.preventDefault();
            const credentials = {
                'username': username,
                'password': password
            };
            const token = /*await*/ fetchLoginTokenFromCredentials(credentials);
            storeToken(token);
            const userInfo = fetchUserInfoFromToken(token);
            navigate('/', {state: {userInfo: userInfo} } );
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
    }, [username, password, navigate]);

    return /*(loginToken != null) ? navigate('/', {state: {userInfo: userInfo} } ) :*/ content;
}

export default Login