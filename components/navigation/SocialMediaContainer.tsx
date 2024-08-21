import {StyleSheet, View} from "react-native"
import {SocialIcons} from "@/constants/Icons";
import {ThemeSizes} from "@/constants";
import SocialMediaButton from "@/components/navigation/SocialMediaButton";

interface SocialMediaContainerProps {
    onPressApple: () => void,
    onPressFacebook: () => void,
    onPressGoogle: () => void,
}
/**
 * SocialMediaContainer is a component that displays a row of social media buttons.
 * Each button represents a different social media platform and triggers a corresponding onPress function when pressed.
 *
 * @param {SocialMediaContainerProps} props - The properties for configuring the SocialMediaContainer component.
 * @param {() => void} props.onPressApple - The callback function triggered when the Apple button is pressed.
 * @param {() => void} props.onPressFacebook - The callback function triggered when the Facebook button is pressed.
 * @param {() => void} props.onPressGoogle - The callback function triggered when the Google button is pressed.
 *
 * @example
 * <SocialMediaContainer
 *    onPressApple={() => console.log('Apple button pressed')}
 *    onPressFacebook={() => console.log('Facebook button pressed')}
 *    onPressGoogle={() => console.log('Google button pressed')}
 * />
 */
const SocialMediaContainer = (props: SocialMediaContainerProps) => {
    return (
        <View style={styles.container}>
            <SocialMediaButton source={SocialIcons.apple} onPress={props.onPressApple}/>
            <SocialMediaButton source={SocialIcons.facebook} onPress={props.onPressFacebook}/>
            <SocialMediaButton source={SocialIcons.google} onPress={props.onPressGoogle}/>
        </View>
    )
}

export default SocialMediaContainer

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: ThemeSizes.Spacing.extraLarge
    },
    icon: {
        width: ThemeSizes.Sizes.largeIcon,
        height: ThemeSizes.Sizes.largeIcon,
    }
})