import React from 'react';

function SettingsForm({ title, fields, onSubmit }) {   
    return (
        <>
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