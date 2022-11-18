import React from 'react';
import ChangePassword from './settings/ChangePassword';
import DeleteAccount from './settings/DeleteAccount';
import ChangeEmail from './settings/ChangeEmail';
import ChangePrivacy from './settings/ChangePrivacy';

function AccountSettings(props) {
    return (
        <div className='settings-content'>
            <h2>Account Settings</h2>
            <ChangePassword/>
            <ChangeEmail/>
            <ChangePrivacy/>
            <DeleteAccount/>
        </div>
    );
}

export default AccountSettings;