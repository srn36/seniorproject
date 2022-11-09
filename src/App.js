import routes from './helper/routes';
import bg from './BG.jpeg';
import { RouterProvider } from 'react-router-dom';
import { 
    View,
    Authenticator,
    CheckboxField,
    useAuthenticator
} from "@aws-amplify/ui-react";
import { GameCheckboxes } from './components/helper/game-selection';

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
                        Probably important to know wtf useAuthenticator atually does.
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

                                {/* Append & require Terms & Conditions field to sign up.  */}
                                <CheckboxField
                                    errorMessage={validationErrors.acknowledgement}
                                    hasError={!!validationErrors.acknowledgement}
                                    name="acknowledgement"
                                    value="yes" // When this checkbox is checked the form will receive {<name>: <value>} as a key pair
                                    label="I agree with the Terms & Conditions"
                                />

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
                Assigning a validationError to a CheckBox makes it required -- I haven't tested input fields, but I imagine it'll be similar.
                */
                async validateCustomSignUp(formData) {
                    /*
                    Generate an array of game titles which have been selected.
                    Check that this array is not empty.
                    */
                    const selectedGames = Object.keys(formData).filter(dataKey => formData[dataKey] === 'game-selected');
                    const hasGameSelected = selectedGames.length > 0;

                    const validateErrors = {
                        ...(!formData.acknowledgement && {acknowledgement: 'You must agree to the Terms & Conditions'}),
                        ...(!hasGameSelected && {game: 'You must select at least one game'}),
                    };

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