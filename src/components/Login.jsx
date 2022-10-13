/*
 * Adapted from tutorial by Joe Morgan
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 */

import React, { useState } from 'react'
//import PropTypes from 'prop-types'

/*async*/ function validateLogin(credentials) {
    /*
    return fetch('login validation service', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
    */
   return "login token"
}

function Login(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const message = props.greet ? 'hi' : 'bye';

    const submitCredentials = /*async*/ e => {
        e.preventDefault();
        const token = /*await*/ validateLogin({
            username,
            password
        });
        props.setToken(token);
    }

    return(
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
            {message}
        </div>
    );
}

/*
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
*/

export default Login