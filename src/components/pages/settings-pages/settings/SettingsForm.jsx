import React from 'react';
import { Divider } from '@aws-amplify/ui-react';

function SettingsForm({ title, fields, onSubmit }) {   
    return (
        <>
            <Divider/>
            <h3>{title}</h3>
            <form onSubmit={e => {
                e.preventDefault();
                return onSubmit();
            }}>
                {fields}
            </form>
        </>
    );
}

export default SettingsForm;