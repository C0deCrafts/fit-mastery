import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard, Alert,
} from "react-native"
import AppImageBackground from "@/components/background/AppImageBackground";
import {useState} from "react";
import Spacing from "@/components/spacing/Spacing";
import {Fonts, ThemeSizes} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {useAuth} from "@/context/AuthContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {useAppStyle} from "@/context/AppStyleContext";
import SocialMediaContainer from "@/components/navigation/SocialMediaContainer";
import {router} from "expo-router";
import {Image} from "expo-image";
import {Logo} from "@/constants/Images";
import {isScreenHeightAtLeastIphone14} from "@/utils/styleContextUtils";
import SignUpForm from "@/components/auth/SignUpForm";
/**
 * SignUp is a page that provides a user interface for creating a new account.
 * It includes a form for entering a username, email, password, and password confirmation,
 * as well as social media sign-up options and navigation back to the sign-in screen.
 *
 * The component handles the following:
 * - User input for username, email, password, and password confirmation.
 * - Validation to ensure all fields are filled and the passwords match before attempting to sign up.
 * - Social media sign-up options for Apple, Facebook, and Google.
 * - Navigation back to the sign-in screen.
 */
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {isLoading, signUp} = useAuth();
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    const showLogo = isScreenHeightAtLeastIphone14();

    const handleSignUp = async () => {
        if (!email || !password || !username || !confirmPassword) {
            Alert.alert("Login", "Bitte fülle alle Felder aus!");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwort", "Die Passwörter stimmen nicht überein. Bitte gib sie erneut ein!")
            return;
        }
        await signUp(email, password, username);
        console.log("Sign Up")
    }

    const handleSignUpApple = () => {
        console.log("Apple Sign Up")
    }
    const handleSignUpFacebook = () => {
        console.log("Facebook Sign Up")
    }
    const handleSignUpGoogle = () => {
        console.log("Google Sign Up")
    }

    const handleBackToLogin = () => {
        router.replace("/signIn");
    }

    return (
        <AppImageBackground>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    {showLogo && (<View style={styles.header}>
                        <Image source={Logo.logo}
                               style={styles.logo}
                               contentFit="contain"
                        />
                    </View>)}
                    <View style={styles.body}>
                        <SignUpForm
                            username={username}
                            setUsername={setUsername}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            handleSignUp={handleSignUp}
                        />
                        <Spacing bottom={ThemeSizes.Spacing.extraLarge}/>
                        <CustomButton onPress={handleSignUp} title={"Registrieren"} isLoading={isLoading}/>
                        <Spacing vertical={ThemeSizes.Spacing.verticalSmall}>
                            <Text style={styles.text}>oder</Text>
                        </Spacing>
                        <SocialMediaContainer
                            onPressApple={handleSignUpApple}
                            onPressFacebook={handleSignUpFacebook}
                            onPressGoogle={handleSignUpGoogle}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.text}>Du hast bereits einen Account?</Text>
                        <Text style={styles.link} onPress={handleBackToLogin}>Logge dich ein!</Text>
                        <Spacing bottom={ThemeSizes.Spacing.extraDefault}/>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </AppImageBackground>
    )
}

export default SignUp


const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
        },
        text: {
            color: colors.white,
            textAlign: "center",
            fontFamily: Fonts.regular,
            fontSize: fontSizes.body
        },
        link: {
            color: colors.white,
            textAlign: "center",
            fontFamily: Fonts.semiBold,
            fontSize: fontSizes.body,
            textDecorationLine: "underline"
        },
        logo: {
            //backgroundColor: "red",
            width: "100%",
            height: ThemeSizes.Sizes.logo,
        },
        header: {
            flex: 1,
            //backgroundColor: "red",
            justifyContent: "center",
        },
        body: {
            flex: 4,
            //backgroundColor: "blue",
            justifyContent: "flex-end"
        },
        footer: {
            flex: 1,
            //backgroundColor: "red",
            justifyContent: "flex-end"
        }
    })
}