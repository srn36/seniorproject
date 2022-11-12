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
                        /* 
                        The (context) => [context.validationErrors] is used to avoid re-rendering the entire site unnecessarily.
                        Instead, that function makes sure the entire site is only reloaded when the site's validation errors change.
                        */
                        const { validationErrors } = useAuthenticator((context) => [context.validationErrors]);
            
                        return (
                            <>
                                {/* Here we are simply telling the form to at least use the default fields.
                                Below we will append additional custom fields. */}
                                <Authenticator.SignUp.FormFields />

                                {/* 
                                >>>>>> CHECKBOX FORMAT GUIDE <<<<<<

                                <CheckboxField
                                    -------------------------------------------------
                                    -- Validation/Error Handling --

                                    errorMessage={Message to display when box isn't checked}
                                    hasError={Highlight box in red if not checked} <-------------- This is the field that makes a checkbox required
                                    -------------------------------------------------
                                    -- Submitted Form Data --

                                    name="acknowledgement"
                                    value="yes"

                                    -- When this checkbox is checked the form will receive {<name>: <value>} as a key-value pair --
                                    -------------------------------------------------
                                    -- Display Text --
                                    label="Text You Want Displayed"
                                /> 
                                */}

                                {/* As of right now, I have no idea how AWS Cognito will handle/store the checkbox options */}
                                <GameCheckboxes validationErrors={validationErrors}/>
                            </>
                        );
                    },
                },
            }}
            services={{
                /* 
                This is somehow the thing that decides if the "sign up" button at the bottom
                of the form is enabled or disabled.
                Assigning a validationError to a CheckBox makes it required -- I haven't tested text input fields, but I imagine it'll be similar.
                */
                async validateCustomSignUp(formData) {
                    console.log(formData);
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
                            selectedConsole.substring(gameTitle.length + 1)
                        );
                                                
                        // Store the consoles and username listed for each game
                        gameToInfoMap[gameTitle] = {
                            'consoles': [...selectedConsolesForTitle],
                            'username': formData[`${gameTitle}-Username`] || ''
                        };

                        if(selectedConsolesForTitle.length === 0) {
                            validateErrors[gameTitle] = `You must select at least one console for ${gameTitle}`;
                        }
                    });
                    console.log(gameToInfoMap)
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