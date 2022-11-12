import routes from './helper/routes';
import bg from './BG.jpeg';
import { RouterProvider } from 'react-router-dom';
import { 
    View,
    Authenticator,
    useAuthenticator
} from "@aws-amplify/ui-react";
import GameCheckboxes from './components/game-checkboxes/GameCheckboxes';

function App() {
    const router = routes();

    return (
        <Authenticator
            // Default to Sign In screen
            initialState="signIn"
            
            // Customize `Authenticator.SignUp.FormFields`
            components={{
                SignUp: {
                    FormFields() {
                        // (context) => [context.validationErrors] ensures reloads only happen when validationErrors changes
                        const { validationErrors } = useAuthenticator((context) => [context.validationErrors]);
            
                        return (
                            <>
                                <Authenticator.SignUp.FormFields />
                                <GameCheckboxes validationErrors={validationErrors}/>
                            </>
                        );
                    },
                },
            }}
            services={{
                /* 
                This what decides if the "sign up" button at the bottom of the form is enabled or disabled.
                Assigning a validationError to a CheckBox makes it required -- I haven't tested text input fields, but I imagine it'll be similar.
                */
                async validateCustomSignUp(formData) {
                    // Separate arrays containing each selected game and console
                    const selectedGames = Object.keys(formData).filter(dataKey => formData[dataKey] === 'game-selected');
                    const selectedConsoles = Object.keys(formData).filter(dataKey => formData[dataKey] === 'console-selected');

                    const gameToInfoMap = {};
                    const validateErrors = selectedGames.length > 0 ? {} : {game: 'You must select at least one game'};
                    selectedGames.forEach(gameTitle => {
                        // I can explain, I swear
                        const selectedConsolesForTitle = selectedConsoles.filter(gameConsoleLabel => 
                            gameConsoleLabel.includes(gameTitle)
                        ).map(selectedConsole => 
                            // selectedConsoles has strings formatted as '<gameTitle>-<console>', we want '<console>'
                            selectedConsole.substring(gameTitle.length + 1)
                        );
                        // Store the consoles and username listed for each game
                        gameToInfoMap[gameTitle] = {
                            'consoles': [...selectedConsolesForTitle],
                            'username': !!formData[`${gameTitle}-Default-Username`] ? 1 : (formData[`${gameTitle}-Username`] ||  '')
                        };

                        if(!formData[`${gameTitle}-Username`] && !formData[`${gameTitle}-Default-Username`]) {
                            validateErrors[`${gameTitle}-Username`] = `Input username for ${gameTitle}`;
                        }
                        if(selectedConsolesForTitle.length === 0) {
                            validateErrors[gameTitle] = `You must select at least one console for ${gameTitle}`;
                        }
                    });
                    
                    // Check if there is at least 1 validation error
                    if (Object.keys(validateErrors).length > 0) {
                        return validateErrors;
                    }
                },
            }}
        >
            {/* This stuff down here is simply rendering the app itself */}
            {({ signOut, user }) => (
                <View>
                    <main>
                        <img className="background-pic" src={bg} alt="" />
                    </main>
                    <RouterProvider router={router} />
                </View>
            )}
        </Authenticator>
    );
}

export default App;