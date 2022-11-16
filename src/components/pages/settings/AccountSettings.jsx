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

    const changePassword = (oldPassword, newPassword, confirmNewPassword) => {
        if(newPassword !== confirmNewPassword) {
            window.alert('Passwwords must match');
        }
        
        Auth.currentAuthenticatedUser().then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
        }).then(data => 
            console.log(data)
        ).catch(err => 
            console.log(err)
        );
    };
    
    return (
        <div>
            Account Settings
            <Divider/>
            Change Password
            <form onSubmit={changePassword(oldPassword, newPassword, confirmNewPassword)}>
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
                />
                <button type='submit'>Change Password</button>
            </form>
        </div>
    );

}

export default AccountSettings;