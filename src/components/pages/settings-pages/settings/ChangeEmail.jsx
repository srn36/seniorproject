import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField } from '@aws-amplify/ui-react';
import SettingsForm from './SettingsForm';

function ChangeEmail({ email }) {
    const [newEmail, setNewEmail] = useState('');
    const [code, setCode] = useState('');

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
        const verifyButton = document.getElementById('verify-button');

        // I don't want the user to be able to exit the modal without inputting a 6 number code
        dialog.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                e.preventDefault();
            }
        });
        dialog.addEventListener('keypress', (e) => {
            if(e.key === 'Escape') {
                e.preventDefault();
            }
        });

        // Listen for when the form is submitted
        dialog.addEventListener('close', () => {
            return resolve(dialog.returnValue);
        });

        /**
         * Apparently Chrome for Android and a few minor browsers do not support the 'close'
         * event for dialog components?!?!?! This technique for detecting close events works
         * for all browsers
         */ 
        verifyButton.addEventListener('click', () => {
            dialog.close();
            return resolve(dialog.returnValue);
        });

        dialog.showModal();
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
                        placeholder='Enter verification code'
                        onChange={e => setCode(e.target.value)}
                    />
                    <button 
                        id='verify-button'
                        value={code} 
                        disabled={code.length !== 6}
                    >
                        Verify
                    </button>
                </form>
            </dialog>
        </>
        
    );
}

export default ChangeEmail;