import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
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
import SignInForm from "@/components/auth/SignInForm";
import {Loading} from "@/components/Loading";

/**
 * SignIn is a page that provides a user interface for signing into an account.
 * It includes an email and password form, social media login options, and navigation to the sign-up screen.
 *
 * The component handles the following:
 * - User input for email and password.
 * - Validation to ensure both fields are filled before attempting to sign in.
 * - Social media login options for Apple, Facebook, and Google.
 * - Navigation to the sign-up screen.
 */
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {isLoading, signIn, resetPassword} = useAuth();
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Login", "Bitte fülle alle Felder aus!");
            return;
        }
        await signIn(email, password);
        console.log("Sign Up")
    }

    const handleSignInApple = () => {
        console.log("Apple Sign Up")
    }
    const handleSignInFacebook = () => {
        console.log("Facebook Sign Up")
    }
    const handleSignInGoogle = () => {
        console.log("Google Sign Up")
    }

    const handleForgotPassword = () => {
        if (!email) {
            Alert.prompt('Passwort vergessen?', 'Gib bitte deine E-Mail-Adresse ein, damit wir dir helfen können.', [
                {
                    text: 'Abbrechen',
                    style: 'cancel',
                },
                {
                    text: 'Passwort zurücksetzen',
                    onPress: async (inputEmail: string) => {
                        await resetPassword(inputEmail);
                    },
                },
            ]);
        } else {
            Alert.alert(
                'Passwort zurücksetzen?',
                `Möchtest du das Passwort für ${email} zurücksetzen?`,
                [
                    {
                        text: 'Abbrechen',
                        style: 'cancel',
                    },
                    {
                        text: 'Ja, bitte!',
                        onPress: async () => {
                            await resetPassword(email);
                        },
                    },
                ]
            );
        }
    };

    const handleNavigateToSignUp = () => {
        router.replace("/signUp");
    }

    return (
        <AppImageBackground>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image source={Logo.logo}
                               style={styles.logo}
                               contentFit="contain"
                        />
                    </View>
                    <View style={styles.body}>
                        <SignInForm email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    handleSignIn={handleSignIn}
                        />
                        <Spacing top={ThemeSizes.Spacing.extraExtraSmall}/>
                        <Text style={styles.textForgotPassword} onPress={handleForgotPassword}>Password
                            vergessen? </Text>
                        <Spacing bottom={ThemeSizes.Spacing.extraLarge}/>
                        <CustomButton onPress={handleSignIn} title={"Login"}/>
                        <Spacing vertical={ThemeSizes.Spacing.verticalSmall}>
                            <Text style={styles.text}>oder</Text>
                        </Spacing>
                        <SocialMediaContainer
                            onPressApple={handleSignInApple}
                            onPressFacebook={handleSignInFacebook}
                            onPressGoogle={handleSignInGoogle}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.text}>Kein Account? </Text>
                        <Text style={styles.link} onPress={handleNavigateToSignUp}>Registriere dich jetzt!</Text>
                    </View>
                    <Spacing bottom={ThemeSizes.Spacing.extraDefault}/>
                </SafeAreaView>
            </TouchableWithoutFeedback>
            {isLoading && <Loading/>}
        </AppImageBackground>
    )
}

export default SignIn


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
        textForgotPassword: {
            color: colors.white,
            textAlign: "right",
            fontFamily: Fonts.regular,
            fontSize: fontSizes.body,
            textDecorationLine: "underline"
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
            flex: 2,
            //backgroundColor: "red",
            justifyContent: "flex-end",
        },
        body: {
            flex: 4,
            //backgroundColor: "blue",
            justifyContent: "flex-end"
        },
        footer: {
            flex: 1,
            flexDirection: "row",
            //backgroundColor: "red",
            alignItems: "flex-end",
            justifyContent: "center"
        }
    })
}