import React, { useState } from 'react';
import { 
    BirthdaySettings 
} from '../../../../ui-components';
import { Divider } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

function maxDaysByMonth(month, year) {
    if(month === 2) {
        return (year % 4 === 0) ? 29 : 28;
    } else if(month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    } else {
        return 31;
    }
}

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

    const validateBirthday = () => {
        const avoidEmojis = [...birthday];
        if(!(avoidEmojis[4] === '-' && avoidEmojis[7] === '-')) {
            return false;
        }
        
        const currentTime = new Date();
        const currentMonth = currentTime.getMonth() + 1;
        const currentDay = currentTime.getDate();
        const currentYear = currentTime.getFullYear();

        const month = parseInt(birthday.substring(6,8));
        const day = parseInt(birthday.substring(9));
        const year = parseInt(birthday.substring(0,4));

        // Check numeric
        if(isNaN(month) || isNaN(day) || isNaN(year)) {
            return false;
        }

        const maxDays = maxDaysByMonth(month, year);

        // Month validation
        if(month < 1 || month > 12) {
            return false;
        }

        // Date validation
        if(day < 1 || day > maxDays) {
            return false;
        }

        // Year validation
        if(year < currentYear - 110 || year > currentYear - 13) {
            // Check if the user turned 13 this year
            if(year === currentYear - 13 && month <= currentMonth && day <= currentDay) {
                return true;
            }
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
                    disabled={!validateBirthday() || birthday === birthdate}
                >
                    Update Birthday
                </button>
            </form>
        </>
    );
}

export default ChangeBirthday;