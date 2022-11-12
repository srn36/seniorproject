import React from 'react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';
import { games } from '../../helper/game-selection';
import CheckboxLabel from './CheckboxLabel';

function GameCheckboxes({ validationErrors }) {
    const gamesKeys = Object.keys(games);
    const checkboxesFromGames = gamesKeys.map(index => {
        return (
            // This check ensures that the error message is only displayed once instead of after each checkbox
            parseInt(index) === (gamesKeys.length - 1) ?
                <CheckboxField
                    errorMessage={validationErrors.game}
                    hasError={!!validationErrors.game}
                    key={index}
                    name={games[index].title}
                    label={games[index].title}
                    value='game-selected'
                />
                :
                <CheckboxField
                    hasError={!!validationErrors.game}
                    key={index}
                    name={games[index].title}
                    label={<CheckboxLabel {...games[index]}/>}
                    value='game-selected'
                />
        );
    });

    return (
        <Flex direction='column' gap='0'>
            {checkboxesFromGames}
        </Flex>
    );
}

export default GameCheckboxes;