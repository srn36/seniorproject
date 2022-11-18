import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const formFields = [
        <TextField
            key='Old Password'
            placeholder='Old Password'
            label='Old Password'
            onChange={e => setOldPassword(e.target.value)}
        />,
        <TextField
            key='New Password'
            placeholder='New Password'
            label='New Password'
            onChange={e => setNewPassword(e.target.value)}
        />,
        <TextField
            key='Confirm New Password'
            placeholder='Confirm New Password'
            label='Confirm New Password'
            onChange={e => setConfirmNewPassword(e.target.value)}
            hasError={confirmNewPassword !== newPassword}
            errorMessage='Must match new password'
        />
    ];

    const changePassword = () => {
        Auth.currentAuthenticatedUser().then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
        }).then(data => 
            console.log(data)
        ).catch(err => 
            console.log(err)
        );
    };
    console.log((newPassword.length > 0 && newPassword === confirmNewPassword));
    
    return (
        <SettingsForm
            title='Change Password'
            fields={formFields}
            onSubmit={changePassword}
            submitLabel='Change Password'
            submitDisabled={!(newPassword.length > 0 && newPassword === confirmNewPassword)}
        />
    );
}

export default ChangePassword;