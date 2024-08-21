import {StyleSheet, TouchableOpacity} from 'react-native'
import {Image, ImageSource} from 'expo-image';
import {ThemeSizes} from "@/constants";

interface SocialMediaButtonProps {
    source: ImageSource
    onPress: () => void
}
/**
 * SocialMediaButton is a reusable component that renders a social media icon as a button.
 * It uses a TouchableOpacity wrapper to make the image touchable, triggering the provided onPress function.
 *
 * @param {SocialMediaButtonProps} props - The properties for configuring the SocialMediaButton component.
 * @param {ImageSource} props.source - The source of the image to display as the button icon.
 * @param {() => void} props.onPress - The callback function triggered when the button is pressed.
 *
 * @example
 * <SocialMediaButton
 *    source={{ uri: 'https://example.com/icon.png' }}
 *    onPress={() => console.log('Button pressed')}
 * />
 */
const SocialMediaButton = (props: SocialMediaButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image source={props.source} style={styles.icon}/>
        </TouchableOpacity>
    )
}

export default SocialMediaButton

const styles = StyleSheet.create({
    icon: {
        width: ThemeSizes.Sizes.largeIcon,
        height: ThemeSizes.Sizes.largeIcon,
    }
})