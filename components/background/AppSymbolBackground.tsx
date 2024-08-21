import {StyleSheet, View} from "react-native";
import {Image} from 'expo-image';
import {Images} from "@/constants";
import {ReactNode} from "react";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors} from "@/constants/types/styleTypes";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface ImageBackgroundContainerProps {
    children: ReactNode
}
/**
 * AppImageBackground is a component that provides a full-screen background image with optional children content.
 * It automatically adjusts padding based on the device's safe area insets (e.g., for devices with a bottom tab bar).
 *
 * @param {ImageBackgroundContainerProps} props - The properties for configuring the AppImageBackground component.
 * @param {ReactNode} props.children - The content to be rendered on top of the background image.
 *
 * Usage Example:
 *
 * <AppImageBackground>
 *    <Text>Your content here</Text>
 * </AppImageBackground>
 *
 * This will render the background image with the specified content on top.
 */
const AppImageBackground = ({children}: ImageBackgroundContainerProps) => {
    const {colors} = useAppStyle();
    const insets = useSafeAreaInsets();

    const bottomTabSpacing = insets.bottom - 25;
    const styles = dynamicStyles(colors, bottomTabSpacing);

    return (
        <View style={styles.container}>
            <Image
                source={Images.backgroundSymbol}
                contentFit="cover"
                style={styles.image}
            />
            {children}
        </View>
    )
};

const dynamicStyles = (colors: Colors, bottomTabSpacing: number) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
            paddingBottom: bottomTabSpacing,
        },
        image: {
            position: "absolute",
            width: "100%",
            height: "100%",
            tintColor: colors.quaternaryLabel,
            pointerEvents: "none"
        }
    });
}

export default AppImageBackground;