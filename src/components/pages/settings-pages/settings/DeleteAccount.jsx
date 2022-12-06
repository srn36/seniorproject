import React from 'react';
import { Auth, Storage } from 'aws-amplify';
import SettingsForm from './SettingsForm';
import { useNavigate } from 'react-router-dom';

function DeleteAccount({ username }) {
    const navigate = useNavigate();
    const formFields = [];
    
    const deleteAccount = async () => {
        if(window.confirm('Delete your account?')) {
            const deleteRequests = [
                Storage.remove(`${username}-profilepic`),
                Auth.deleteUser(),
                'backend' //TODO: Real call to backend
            ];

            Promise.allSettled(deleteRequests).then(values => {
                const retry = Object.keys(values).map(respKey => 
                    (values[respKey].status === 'rejected') ? deleteRequests[respKey] : values[respKey].value
                );
                
                /**
                 * Retry any failed requests
                 * Any values from successful requests resolve instantly,
                 * so there is no cost to always running this
                 */
                return Promise.allSettled(retry).then(() => navigate('/'));
            });
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