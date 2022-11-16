import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { putUserInfoFromSettings } from '../../../helper/api-calls/user';

function Settings(props) {
    const {userInfo} = useOutletContext();
    const navigate = useNavigate();
    const [age, setAge] = useState();
    const [password, setPassword] = useState();
    const [displayName, setDisplayName] = useState();
    const [deleteAccount, setDeleteAccount] = useState();
    // eslint-disable-next-line
    const [privacy, setPrivacy] = useState();

    //age
    //password
    //display name
    //delete account
    //privacy
 
    const saveSettings = /*async*/ e => {
        e.preventDefault();
        const settings = {
            'age': age,
            'password': password,
            'displayName': displayName,
            'deleteAccount': deleteAccount,
            'privacy': privacy
        };
        // eslint-disable-next-line
        const settingsList = /*await*/ putUserInfoFromSettings(settings);
        navigate(`/profile/${userInfo.username}`);
    }

    return (
        <>
            <h1>SETTINGS</h1>
            <form onSubmit={e => saveSettings(e)}>    
                <div>
                    <label>
                        <p>Age</p>
                        <input type='text' onChange={e => setAge(e.target.value)}></input>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Password</p>
                        <input type='password' onChange={e => setPassword(e.target.value)}></input>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Display Name</p>
                        <input type='text' onChange={e => setDisplayName(e.target.value)}></input>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Delete Account</p>
                        <input type='text' onChange={e => setDeleteAccount(e.target.value)}></input>
                    </label>
                </div>
                <div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </>
    );
}

export default Settings;