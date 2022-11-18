import React from 'react';
import { Divider } from '@aws-amplify/ui-react';

function SettingsForm({ title, fields, onSubmit, submitLabel, submitDisabled = false }) {   
    return (
        <>
            <Divider/>
            <h3>{title}</h3>
            <form onSubmit={e => {
                e.preventDefault();
                return onSubmit();
            }}>
                {fields}
                <button 
                    type='submit'
                    disabled={submitDisabled}
                >
                    {submitLabel}
                </button>
            </form>
        </>
    );
}

export default SettingsForm;