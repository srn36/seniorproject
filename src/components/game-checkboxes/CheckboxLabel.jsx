import { CheckboxField } from '@aws-amplify/ui-react';
import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { consoles } from '../../helper/game-selection';

function optionStringToConsoles(optionString) {
    if(optionString.length !== consoles.length) {
        throw new Error(`Expected Option String of length ${consoles.length}. Received string with length ${optionString.length}.`);
    }

    const optionsAsArray = [...optionString];
    let consoleOptions = [];
    Object.keys(optionsAsArray).forEach(index => {
        const optionSelected = parseInt(optionsAsArray[index]) === 1;
        if(optionSelected) {
            consoleOptions = [consoles[index], ...consoleOptions];
        }
    });

    if(consoleOptions.length === 0) {
        throw new Error('No console options provided.');
    }

    return consoleOptions;
}


function ConsoleDropdown(title, consoleOptionString, disable) {
    let consoleOptions = [];
    try {
        consoleOptions = optionStringToConsoles(consoleOptionString);
    } catch(e) {
        console.error(e);
    }   
    const consoleDropdownItems = consoleOptions.map(gameConsole => 
        <Dropdown.Item
            as={CheckboxField}
            key={gameConsole}
            className='dropdown-item'
            name={`${title}-${gameConsole}`}
            label={gameConsole}
            value='console-selected'
        />
    );
    return (
        <DropdownButton
            id={`dropdown-basic-button-${title}`}
            title='Console'
            autoClose='outside'
            disabled={!disable}
            onClick={e => e.stopPropagation()}
        >
            {consoleDropdownItems}
        </DropdownButton>
    );
}


function CheckboxLabel(props) {
    const {disable, icon, title, consoleOptionString} = props;
    const consoleDropdown = ConsoleDropdown(title, consoleOptionString, disable);

    return (
        <div
            className='game-label'
        >
            <img src={icon} alt=''/>
            <p>{title}</p>
            {consoleDropdown} 
        </div>
    )
}

export default CheckboxLabel;