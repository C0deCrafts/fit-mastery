import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Image} from 'expo-image';
import {router} from 'expo-router';
import {Fonts, Icons} from "@/constants";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {useAppStyle} from "@/context/AppStyleContext";
import {useAuth} from "@/context/AuthContext";
import FocusAwareStatusBar from "@/components/header/FocusAwareStatusBar";

interface HeaderProps {
    title: string;
    backButtonVisible?: boolean;
    logOutButtonVisible?: boolean;
    chatAvatarVisible?: boolean;
    imageUrl?: string;
}

const Header = (props:HeaderProps) => {
    const {signOut} = useAuth();
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);
    const statusBarStyle = colors.colorButtonLabel === "rgb(255,255,255)" ? "light-content" : "dark-content";

    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = async () => {
        await signOut();
    };

    const handleShowAvatar = () => {
        console.log("Show Avatar")
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <FocusAwareStatusBar barStyle={statusBarStyle}/>
                {props.backButtonVisible && (
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButtonContainer}>
                        <Image source={Icons.back} style={styles.backButton}/>
                    </TouchableOpacity>
                )}
                {props.chatAvatarVisible && (
                    <>
                        <TouchableOpacity onPress={handleShowAvatar} style={styles.avatarButtonContainer}>
                            {/*<ChatAvatar imageRadius={40} imageUrl={props.imageUrl}/>*/}
                        </TouchableOpacity>
                    </>
                )}
                {props.logOutButtonVisible && (
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonContainer}>
                        <Image source={Icons.logout} style={styles.icon} />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">{props.title}</Text>
            </View>
        </>
    );
};

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        headerContainer: {
            width: "100%",
            //120
            height: 110,
            backgroundColor: colors.baseColor,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 5,
            position: "relative",
        },
        backButtonContainer: {
            position: "absolute",
            top: 73,
            left: 10,
            zIndex: 1,
        },
        avatarButtonContainer: {
            position: "absolute",
            right: 10,
            bottom: 10,
            zIndex: 1,
        },
        backButton: {
            tintColor: colors.colorButtonLabel,
            width: 30,
            height: 30,
        },
        headerTitle: {
            color: colors.colorButtonLabel,
            fontFamily: Fonts.semiBold,
            fontSize: fontSizes.title2,
            maxWidth: "80%",
            textAlign: "center",
        },
        logoutButtonContainer: {
            position: "absolute",
            top: 73,
            right: 10,
            zIndex: 1,
        },
        icon: {
            width: 28,
            height: 28,
            tintColor: colors.colorButtonLabel,
        }
    });
}

export default Header;
