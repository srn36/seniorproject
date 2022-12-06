import React, { useState } from 'react';
import { 
    BirthdaySettings 
} from '../../../../ui-components';
import { Divider } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { validateBirthday } from '../../../../helper/birthdate-validation';

function ChangeBirthday({ birthdate }) {
    const [birthday, setBirthday] = useState(birthdate);

    const changeBirthday = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const updateAttributes = {birthdate: birthday};
        Auth.updateUserAttributes(user, updateAttributes).then(() => {
            window.alert('Birthday updated successfully');
            window.location.reload();
        }).catch(e => window.alert(`Error updating birthday: ${e}`));
    };
    
    return (
        <>
            <Divider/>
            <h3>Change Birthday</h3>
            <BirthdaySettings 
                key='birthday'
                overrides={{birthday: {value: birthday}}}
                onChange={(e) => setBirthday(e.birthday)}
            />
            <form onSubmit={e => {
                e.preventDefault();
                return changeBirthday();
            }}>
                <button 
                    type='submit'
                    disabled={!(validateBirthday(birthday).valid) || birthday === birthdate}
                >
                    Update Birthday
                </button>
            </form>
        </>
    );
}

export default ChangeBirthday;