import React from 'react';
import { Auth } from 'aws-amplify';
import SettingsForm from './SettingsForm';

function DeleteAccount(props) {
    const deleteAccount = () => {
        if(window.confirm('Delete your account?')) {
            Auth.deleteUser();
        }
    };
    
    const formFields = [
        <button 
            type='submit'
        >
            Delete Account
        </button>
    ]

    return (
        <SettingsForm
            title='Delete Account'
            fields={formFields}
            onSubmit={deleteAccount}
        />
    );

}

export default DeleteAccount;