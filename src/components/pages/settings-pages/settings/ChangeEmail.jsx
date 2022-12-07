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

    const verifyEmail = async () => new Promise((resolve) => {
        const dialog = document.getElementById('confirm');
        const input = document.getElementById('code-input');
        dialog.showModal();

        input.addEventListener('change', (e) => {
            dialog.returnValue = e.target.value;
        })

        // I don't want the user to be able to exit the modal without inputting a 6 number code
        dialog.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                e.preventDefault();
            }
        });

        dialog.addEventListener('close', () => {
            return resolve(dialog.returnValue);
        });
    });

    const changeEmail = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const updateAttributes = {email: newEmail};
        Auth.updateUserAttributes(user, updateAttributes).then(async () => {
            const val = await verifyEmail();
            return val;
        }).then(async codeVal =>
            await Auth.verifyCurrentUserAttributeSubmit('email', codeVal)
        ).then(() => {
            window.alert('Email updated successfully');
            window.location.reload();
        }).catch(e => window.alert(`Error updating email: ${e}`));
    };

    return (
        <>
            <SettingsForm
                title='Change Email'
                fields={formFields}
                onSubmit={changeEmail}
                submitLabel='Change Email'
                submitDisabled={!(newEmail.length > 0 && newEmail !== email)}
            />
            <dialog id='confirm'>
                <p>A verification code has been sent to your email address</p>
                <form method='dialog'>
                    <TextField
                        id='code-input'
                        placeholder='Enter verification code'
                    />
                    <button>
                        Verify
                    </button>
                </form>
            </dialog>
        </>
        
    );
}

export default ChangeEmail;