import {View, TextInput} from "react-native";
import Spacing from "@/components/spacing/Spacing";
import {ThemeSizes} from "@/constants";
import {useRef} from "react";
import AuthField from "@/components/auth/AuthField";

interface SignInFormProps {
    email: string;
    setEmail: (text: string) => void;
    password: string;
    setPassword: (text: string) => void;
    handleSignIn: () => void;
}
/**
 * SignInForm is a component that renders the email and password input fields for the sign-in process.
 * It uses `AuthField` for the input fields, and `useRef` to manage focus between fields.
 *
 * @param {SignInFormProps} props - The properties for configuring the SignInForm component.
 * @param {string} props.email - The current value of the email field.
 * @param {(text: string) => void} props.setEmail - Function to set the email value when the user types.
 * @param {string} props.password - The current value of the password field.
 * @param {(text: string) => void} props.setPassword - Function to set the password value when the user types.
 * @param {() => void} props.handleSignIn - Callback function to handle the sign-in action when the form is submitted.
 *
 * @example
 * <SignInForm
 *    email={email}
 *    setEmail={setEmail}
 *    password={password}
 *    setPassword={setPassword}
 *    handleSignIn={handleSignIn}
 * />
 */
const SignInForm = (props :SignInFormProps) => {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    return (
        <View>
            <AuthField ref={emailRef}
                       value={props.email}
                       placeholder={"E-Mail"}
                       onChangeText={props.setEmail}
                       returnKeyType="next"
                       inputMode="email"
                       onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <Spacing bottom={ThemeSizes.Spacing.extraSmall}/>
            <AuthField ref={passwordRef}
                       value={props.password}
                       placeholder={"Passwort"}
                       isPassword
                       onChangeText={props.setPassword}
                       returnKeyType="done"
                       inputMode="text"
                       onSubmitEditing={props.handleSignIn}
            />
        </View>
    );
};

export default SignInForm;
