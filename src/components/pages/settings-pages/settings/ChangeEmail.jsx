/* eslint-disable */
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeEmail({ email }) {
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    const formFields = [
        <TextField
            key='Current Email'
            label='Current Email'
            defaultValue={email}
            disabled={true}
        />,
        <TextField
            key='New Email'
            placeholder='New Email'
            label='New Email'
            onChange={e => setNewEmail(e.target.value)}
        />,
        <TextField
            key='Confirm New Email'
            placeholder='Confirm New Email'
            label='Confirm New Email'
            onChange={e => setConfirmNewEmail(e.target.value)}
            hasError={confirmNewEmail !== newEmail}
            errorMessage='Must match new Email'
        />
    ];

    const changeEmail = async () => {
        // REVERIFY EMAIL
        const user = Auth.currentAuthenticatedUser();
        Auth.veri
        const updateAttributes = {email: newEmail};
        Auth.updateUserAttributes(user, updateAttributes).then(() => {
            window.alert('Email updated successfully');
            window.location.reload();
        }).catch(e => console.log('Error updating email: ', e));
    };
    
    return (
        <SettingsForm
            title='Change Email'
            fields={formFields}
            onSubmit={changeEmail}
            submitLabel='Change Email'
            submitDisabled={!(newEmail.length > 0 && newEmail === confirmNewEmail && newEmail !== currentEmail)}
        />
    );
}

export default ChangeEmail;