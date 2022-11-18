/* eslint-disable */
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeEmail(props) {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    const formFields = [
        <TextField
            key='Old Email'
            placeholder='Old Email'
            label='Old Email'
            onChange={e => setOldEmail(e.target.value)}
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

    const changeEmail = () => {
        window.alert('Not implemented');
    };
    
    return (
        <SettingsForm
            title='Change Email'
            fields={formFields}
            onSubmit={changeEmail}
            submitLabel='Change Email'
            submitDisabled={!(newEmail.length > 0 && newEmail === confirmNewEmail)}
        />
    );
}

export default ChangeEmail;