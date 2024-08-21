import {View, TextInput} from "react-native";
import Spacing from "@/components/spacing/Spacing";
import {ThemeSizes} from "@/constants";
import {useRef} from "react";
import AuthField from "@/components/auth/AuthField";

interface SignUpFormProps {
    username: string;
    setUsername: (text: string) => void;
    email: string;
    setEmail: (text: string) => void;
    password: string;
    setPassword: (text: string) => void;
    confirmPassword: string;
    setConfirmPassword: (text: string) => void;
    handleSignUp: () => void;
}
/**
 * SignUpForm is a component that renders the input fields for a user to sign up, including username, email, password, and confirm password.
 * It uses `AuthField` for each input field, and `useRef` to manage focus transitions between fields.
 *
 * @param {SignUpFormProps} props - The properties for configuring the SignUpForm component.
 * @param {string} props.username - The current value of the username field.
 * @param {(text: string) => void} props.setUsername - Function to set the username value when the user types.
 * @param {string} props.email - The current value of the email field.
 * @param {(text: string) => void} props.setEmail - Function to set the email value when the user types.
 * @param {string} props.password - The current value of the password field.
 * @param {(text: string) => void} props.setPassword - Function to set the password value when the user types.
 * @param {string} props.confirmPassword - The current value of the confirm password field.
 * @param {(text: string) => void} props.setConfirmPassword - Function to set the confirm password value when the user types.
 * @param {() => void} props.handleSignUp - Callback function to handle the sign-up action when the form is submitted.
 *
 * @example
 * <SignUpForm
 *    username={username}
 *    setUsername={setUsername}
 *    email={email}
 *    setEmail={setEmail}
 *    password={password}
 *    setPassword={setPassword}
 *    confirmPassword={confirmPassword}
 *    setConfirmPassword={setConfirmPassword}
 *    handleSignUp={handleSignUp}
 * />
 */
const SignUpForm = (props :SignUpFormProps) => {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    return (
        <View>
            <AuthField value={props.username}
                       placeholder={"Benutzername"}
                       onChangeText={props.setUsername}
                       returnKeyType="next"
                       inputMode="text"
                       onSubmitEditing={() => emailRef.current?.focus()}
            />
            <Spacing bottom={ThemeSizes.Spacing.extraSmall}/>
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
                       returnKeyType="next"
                       inputMode="text"
                       onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <Spacing bottom={ThemeSizes.Spacing.extraSmall}/>
            <AuthField ref={confirmPasswordRef}
                       value={props.confirmPassword}
                       placeholder={"Passwort bestätigen"}
                       isPassword
                       onChangeText={props.setConfirmPassword}
                       returnKeyType="done"
                       inputMode="text"
                       onSubmitEditing={props.handleSignUp}
            />
        </View>
    );
};

export default SignUpForm;
