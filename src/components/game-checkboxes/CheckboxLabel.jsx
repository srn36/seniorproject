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


function ConsoleDropdown(consoleOptionString) {
    let consoleOptions = [];
    try {
        consoleOptions = optionStringToConsoles(consoleOptionString);
    } catch(e) {
        console.error(e);
    }   
    const consoleDropdownItems = consoleOptions.map(console => 
        <Dropdown.Item
            key={console}
            className='dropdown-item'
        >
            {console}
        </Dropdown.Item> 
    );
    return (
        <DropdownButton
            id='dropdown-basic-button'
            title='Console'
        >
            {consoleDropdownItems}
        </DropdownButton>
    );
}


function CheckboxLabel(props) {
    const {icon, title, consoleOptionString} = props;
    const consoleDropdown = ConsoleDropdown(consoleOptionString);

    return (
        <div className='game-label'>
            <div>
                <img src={icon} alt=''/>
                <p>{title}</p>
            </div>
            {consoleDropdown}
        </div>
    )
}

export default CheckboxLabel;