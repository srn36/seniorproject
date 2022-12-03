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
            type='password'
            onChange={e => setOldPassword(e.target.value)}
        />,
        <TextField
            key='New Password'
            placeholder='New Password'
            label='New Password'
            type='password'
            onChange={e => setNewPassword(e.target.value)}
        />,
        <TextField
            key='Confirm New Password'
            placeholder='Confirm New Password'
            label='Confirm New Password'
            type='password'
            onChange={e => setConfirmNewPassword(e.target.value)}
            hasError={confirmNewPassword !== newPassword}
            errorMessage='Must match new password'
        />
    ];

    const changePassword = () => {
        Auth.currentAuthenticatedUser().then(async user => {
            return await Auth.changePassword(user, oldPassword, newPassword);
        }).then(data => {
            window.alert('Password updated successfully');
            window.location.reload();
        }).catch(e => window.alert(`Error updating password: ${e}`));
    };
    
    return (
        <SettingsForm
            title='Change Password'
            fields={formFields}
            onSubmit={changePassword}
            submitLabel='Change Password'
            submitDisabled={!(newPassword.length > 0 && newPassword === confirmNewPassword && newPassword !== oldPassword)}
        />
    );
}

export default ChangePassword;