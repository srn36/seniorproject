import React, { useState } from 'react';
import { 
    BirthdaySettings 
} from '../../../../ui-components';
import { Divider } from '@aws-amplify/ui-react';

function ChangeBirthday(props) {
    const [birthday, setBirthday] = useState('');

    const changeBirthday = () => {
        window.alert('Not Implemented');
    };

    const validateBirthday = () => {
        const avoidEmojis = [...birthday];
        if(!(avoidEmojis[4] === '-' && avoidEmojis[7] === '-')) {
            return false;
        }

        // Month validation
        const month = parseInt(birthday.substring(6,8));
        if(isNaN(month) || month < 1 || month > 12) {
            return false;
        }

        // Year validation
        const year = parseInt(birthday.substring(0,4));
        if(isNaN(year) || year < 1900 || year > 2022) { // Fix upper limit to dynamic current year
            return false;
        }

        // Date validation
        const day = parseInt(birthday.substring(9));
        if(isNaN(day) || day < 1 || day > 31) { // Fix date validation
            return false;
        }

        return true;
    }
    
    return (
        <>
            <Divider/>
            <h3>Change Birthday</h3>
            <BirthdaySettings 
                key='birthday'
                onChange={(e) => setBirthday(e.birthday)}
            />
            <form onSubmit={e => {
                e.preventDefault();
                return changeBirthday();
            }}>
                <button 
                    type='submit'
                    disabled={!validateBirthday()}
                >
                    Update Birthday
                </button>
            </form>
        </>
    );
}

export default ChangeBirthday;