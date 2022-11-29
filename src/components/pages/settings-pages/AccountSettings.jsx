import React from 'react';
import ChangePassword from './settings/ChangePassword';
import DeleteAccount from './settings/DeleteAccount';
import ChangeEmail from './settings/ChangeEmail';
import ChangePrivacy from './settings/ChangePrivacy';
import { useOutletContext } from 'react-router-dom';

function AccountSettings(props) {
    const {attributes} = useOutletContext();
    const {email} = attributes;
    const privacy = attributes['custom:privacy'];

    return (
        <div className='settings-content'>
            <h2>Account Settings</h2>
            <ChangePassword/>
            <ChangeEmail email={email}/>
            <ChangePrivacy currentPrivacy={privacy}/>
            <DeleteAccount/>
        </div>
    );
}

export default AccountSettings;