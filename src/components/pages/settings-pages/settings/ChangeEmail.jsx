import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeEmail({ email }) {
    const [newEmail, setNewEmail] = useState('');

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
        const user = await Auth.currentAuthenticatedUser();
        const updateAttributes = {email: newEmail};
        Auth.updateUserAttributes(user, updateAttributes).then(async () =>
            await Auth.verifyCurrentUserAttributeSubmit('email', window.prompt('Enter the confirmation code:'))
        ).then(() => {
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
            submitDisabled={!(newEmail.length > 0 && newEmail !== email)}
        />
    );
}

export default ChangeEmail;