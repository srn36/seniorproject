import React, { useEffect, useMemo, useState } from "react";
import { putUserInfoFromSettings } from "../../helper/api-calls/user";

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
            const settingsList = /*await*/ putUserInfoFromSettings(settings);
            navigate('/profile/', {state: {userInfo: userInfo} });
        }

        <div className='center'>
                <h1>SETTINGS</h1>
                <form onSave={e => saveSettings(e)}>    
                    <div>
                        <label>
                            <p>Age</p>
                            <input type="text" onChange={e => setAge(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Display Name</p>
                            <input type="text" onChange={e => setDisplayName(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <p>Delete Account</p>
                            <input type="text" onChange={e => setDeletePassword(e.target.value)}></input>
                        </label>
                    </div>
                    <div>
                        <button type="save">Save</button>
                    </div>
                </form>
            </div>
    })
}