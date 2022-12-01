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
        />
    ];

    const changeEmail = async () => {
        // REVERIFY EMAIL
        const user = Auth.currentAuthenticatedUser();
        Auth.veri
        const updateAttributes = {email: newEmail};
        Auth.updateUserAttributes(user, updateAttributes)/* .then( () =>
            Auth.verifyCurrentUserAttribute('email')
        ) */.then(() => {
            window.alert('Email updated successfully');
            window.location.reload();
        }).catch(e => window.alert(`Error updating email: ${e}`));
    };
    
    return (
        <SettingsForm
            title='Change Email'
            fields={formFields}
            onSubmit={changeEmail}
            submitLabel='Change Email'
            submitDisabled={!(newEmail.length > 0 && newEmail !== currentEmail)}
        />
    );
}

export default ChangeEmail;