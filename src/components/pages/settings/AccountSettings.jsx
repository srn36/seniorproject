import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Divider, TextField } from '@aws-amplify/ui-react';

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

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const changePassword = () => {
        Auth.currentAuthenticatedUser().then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
        }).then(data => 
            console.log(data)
        ).catch(err => 
            console.log(err)
        );
    };
    console.log((newPassword.length > 0 && newPassword === confirmNewPassword))
    
    return (
        <div className='settings-content'>
            <h2>Account Settings</h2>
            <Divider/>
            <h3>Change Password</h3>
            <form onSubmit={changePassword}>
                <TextField
                    placeholder="Old Password"
                    label="Old Password"
                    onChange={e => setOldPassword(e.target.value)}
                />
                <TextField
                    placeholder="New Password"
                    label="New Password"
                    onChange={e => setNewPassword(e.target.value)}
                />
                <TextField
                    placeholder="Confirm New Password"
                    label="Confirm New Password"
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    hasError={confirmNewPassword !== newPassword}
                    errorMessage='Must match new password'
                />
                <button 
                    type='submit'
                    disabled={!(newPassword.length > 0 && newPassword === confirmNewPassword)}
                >
                    Change Password
                </button>
            </form>
        </div>
    );

}

export default AccountSettings;