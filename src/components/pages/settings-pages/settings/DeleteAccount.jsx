import React from 'react';
import { Auth } from 'aws-amplify';
import SettingsForm from './SettingsForm';

function DeleteAccount(props) {
    const formFields = [];
    
    const deleteAccount = () => {
        if(window.confirm('Delete your account?')) {
            Auth.deleteUser();
        }
    };

    return (
        <SettingsForm
            title='Delete Account'
            fields={formFields}
            onSubmit={deleteAccount}
            submitLabel='Delete Account'
        />
    );

}

export default DeleteAccount;