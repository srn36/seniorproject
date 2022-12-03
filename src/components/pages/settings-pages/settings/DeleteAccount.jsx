import React from 'react';
import { Auth, Storage } from 'aws-amplify';
import SettingsForm from './SettingsForm';
import { useNavigate } from 'react-router-dom';

function DeleteAccount({ username }) {
    const navigate = useNavigate();
    const formFields = [];
    
    const deleteAccount = async () => {
        if(window.confirm('Delete your account?')) {
            await Storage.remove(`${username}-profilepic`);
            Auth.deleteUser();
            navigate('/');
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