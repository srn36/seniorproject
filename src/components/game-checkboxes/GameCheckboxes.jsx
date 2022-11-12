import React, { useState } from 'react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';
import { games } from '../../helper/game-selection';
import CheckboxLabel from './CheckboxLabel';
import { Dropdown } from 'react-bootstrap';

function GameCheckboxes({ validationErrors }) {
    const allFalseCheckValues = games.map(_game => false);
    // We have to track which checkboxes are not checked so that we can disable their droprowns
    const [selectedGames, setSelectedGames] = useState(allFalseCheckValues);
    const handleGameChecked = (index, e) => {
        const newSelectedGames = Object.keys(selectedGames).map(gameIndex => {
            return gameIndex === index ? e.target.checked : selectedGames[gameIndex];
        });
        setSelectedGames(newSelectedGames);
    };

    const gamesKeys = Object.keys(games);
    const checkboxesFromGames = gamesKeys.map(index => {
        const gameTitle = games[index].title;     
        // The following check ensures that the error message is only displayed once instead of after each checkbox
        const errorMessage = parseInt(index) === (gamesKeys.length - 1) ?
                                (validationErrors.game || validationErrors[gameTitle])
                                :
                                (validationErrors[gameTitle]);

        return (
            <React.Fragment key={index}>
                <Dropdown.Divider/>
                <CheckboxField
                    errorMessage={errorMessage}
                    hasError={!!validationErrors.game || !!validationErrors[gameTitle]}
                    name={gameTitle}
                    label={
                        <CheckboxLabel {
                            ...{
                                'disable': !selectedGames[index],
                                'hasError': !!validationErrors[gameTitle],
                                ...games[index]
                            }
                        }/>
                    }
                    value='game-selected'
                    onChange={e => handleGameChecked(index, e)}
                />
            </React.Fragment>
        );
    });

    return (
        <Flex direction='column' gap='0'>
            {checkboxesFromGames}
        </Flex>
    );
}

export default GameCheckboxes;