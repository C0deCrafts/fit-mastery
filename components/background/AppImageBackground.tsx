import {ImageBackground, StyleSheet} from "react-native";
import {Images, ThemeSizes} from "@/constants";
import {ReactNode} from "react";

/**
 * Interface for the props of the AppImageBackground component.
 *
 * @property {ReactNode} children - The content that will be displayed within the image background.
 */
interface ImageBackgroundContainerProps {
    children: ReactNode
}

/**
 * AppImageBackground Component
 *
 * This component provides a container with a background image.
 * It wraps the given content (children) inside an ImageBackground component,
 * allowing you to display any content over a background image.
 *
 * @param {ImageBackgroundContainerProps} props - The props for this component.
 */
const AppImageBackground = ({children}: ImageBackgroundContainerProps) => (
        <ImageBackground
            source={Images.backgroundMale}
            resizeMode="cover"
            style={styles.image}>
            {children}
        </ImageBackground>
);

/**
 * Styles used in the AppImageBackground component.
 *
 * - container: Sets the component to take up the full available space.
 * - content: Adds the default horizontal padding for the app around the children content.
 * - image: Makes the background image cover the full container and centers the content within it.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        paddingHorizontal: ThemeSizes.Spacing.horizontalDefault
    }
});

export default AppImageBackground;