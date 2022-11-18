import React from 'react';
import ChangePassword from './settings/ChangePassword';
import DeleteAccount from './settings/DeleteAccount';
import ChangeEmail from './settings/ChangeEmail';

function AccountSettings(props) {
    /**
     * SETTINGS TO INCLUDE:
     * 
     * Change password
     * 
     * Change email address
     * 
     * Change privacy
     * 
     * Delete account
     * 
     */
    
    return (
        <div className='settings-content'>
            <h2>Account Settings</h2>
            <ChangePassword/>
            <ChangeEmail/>
            <DeleteAccount/>
        </div>
    );

}

export default AccountSettings;