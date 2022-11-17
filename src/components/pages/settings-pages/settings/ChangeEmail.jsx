/* eslint-disable */
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeEmail(props) {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');

    const changeEmail = () => {
        window.alert('Not implemented');
    };

    const formFields = [
        <TextField
            placeholder='Old Email'
            label='Old Email'
            onChange={e => setOldEmail(e.target.value)}
        />,
        <TextField
            placeholder='New Email'
            label='New Email'
            onChange={e => setNewEmail(e.target.value)}
        />,
        <TextField
            placeholder='Confirm New Email'
            label='Confirm New Email'
            onChange={e => setConfirmNewEmail(e.target.value)}
            hasError={confirmNewEmail !== newEmail}
            errorMessage='Must match new Email'
        />,
        <button 
            type='submit'
            disabled={!(newEmail.length > 0 && newEmail === confirmNewEmail)}
        >
            Change Email
        </button>
    ]
    
    return (
        <SettingsForm
            title='Change Email'
            fields={formFields}
            onSubmit={changeEmail}
        />
    );
}

export default ChangeEmail;