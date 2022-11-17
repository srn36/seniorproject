import React from 'react';
import { Divider } from '@aws-amplify/ui-react';
import ChangePassword from './settings/ChangePassword';
import DeleteAccount from './settings/DeleteAccount';

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
            <Divider/>
            <ChangePassword/>
            <Divider/>
            <DeleteAccount/>
        </div>
    );

}

export default AccountSettings;