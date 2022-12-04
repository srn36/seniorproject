import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ChangePassword from './settings/ChangePassword';
import ChangeEmail from './settings/ChangeEmail';
import DeleteAccount from './settings/DeleteAccount';

function AccountSettings(props) {
    const {username, attributes} = useOutletContext();
    const {email} = attributes;
    
    return (
        <div className='settings-content'>
            <h2>Account Settings</h2>
            <ChangePassword/>
            <ChangeEmail email={email}/>
            <DeleteAccount username={username}/>
        </div>
    );
}

export default AccountSettings;