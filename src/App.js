import routes from './helper/routes';
import bg from './BG.jpeg';
import { RouterProvider } from 'react-router-dom';
import { 
    View,
    Authenticator,
    CheckboxField,
    useAuthenticator
} from "@aws-amplify/ui-react";

function App() {
    const router = routes();

    return (
        <Authenticator
            // Default to Sign Up screen
            initialState="signIn"
            // Customize `Authenticator.SignUp.FormFields`
            components={{
                SignUp: {
                    FormFields() {
                        const { validationErrors } = useAuthenticator(); //Probably important to know wtf this atually does
            
                        return (
                            <>
                                {/* Here we are simply telling the form to at least use the default fields.
                                Below we will append additional custom fields. */}
                                <Authenticator.SignUp.FormFields />

                                {/* Append & require Terms & Conditions field to sign up.  */}
                                {/* This is the only thing that matters for determining if the user can hit the sign up button.
                                Nothing else is required.
                                All I know is that it has something to do with the services, as defined below this block. */}
                                <CheckboxField
                                    errorMessage={validationErrors.acknowledgement}
                                    hasError={!!validationErrors.acknowledgement}
                                    name="acknowledgement"
                                    value="yes" //IDK what this actually means
                                    label="I agree with the Terms & Conditions"
                                />

                                <CheckboxField
                                    name="cat"
                                    label="Cat"
                                    value="cat"
                                    onChange={console.log('check')}
                                />
                            </>
                        );
                    },
                },
            }}
            services={{
                /* 
                This is somehow the thing that decides if the "sign up" button at the bottom
                of the form is enabled or disabled.
                Nearest I can tell, it works via black magic.
                */
                async validateCustomSignUp(formData) {
                    if (!formData.acknowledgement) {
                        return {
                            acknowledgement: 'You must agree to the Terms & Conditions',
                        };
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