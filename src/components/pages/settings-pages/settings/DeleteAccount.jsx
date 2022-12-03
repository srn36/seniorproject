import React from 'react';
import { Auth } from 'aws-amplify';
import SettingsForm from './SettingsForm';
import { useNavigate } from 'react-router-dom';

function DeleteAccount(props) {
    const navigate = useNavigate();
    const formFields = [];
    
    const deleteAccount = () => {
        if(window.confirm('Delete your account?')) {
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