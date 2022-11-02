import React, { useEffect, useMemo, useState } from "react";

function Settings(props) {
    const userInfo = props.userInfo;
    const [age, setAge] = useState();
    const [password, setPassword] = useState();
    const [displayName, setDisplayName] = useState();
    const [deleteAccount, setDeleteAccount] = useState();
    const [privacy, setPrivacy] = useState();

    //age
    //password
    //display name
    //delete account
    //privacy
    
    return useMemo(() => {
        const saveSettings = /*async*/ e => {
            e.preventDefault();
            const settings = {
                'age': age,
                'password': password,
                'displayName': displayName,
                'deleteAccount': deleteAccount,
                'privacy': privacy
            };
            const loginToken = /*await*/ fetchLoginTokenFromCredentials(credentials);
            storeToken(loginToken);
            const userInfo = /*await*/ fetchUserInfoFromToken(loginToken);
            navigate('/profile/', {state: {userInfo: userInfo} });
        }

        <div className='center'>
                <h1>SETTINGS</h1>
                <form onSave={e => saveCredentials(e)}>    
                    <div>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setUsername(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
    })
}