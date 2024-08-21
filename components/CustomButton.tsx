import {StyleSheet, Text, TouchableOpacity} from "react-native"
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts, ThemeSizes} from "@/constants";

interface CustomButtonProps {
    isLoading?: boolean,
    title: string;
    onPress: () => void;
}
/**
 * CustomButton is a reusable component that renders a button with dynamic styles.
 * The styles are generated based on the current theme's font sizes and colors, which are provided by the useAppStyle context.
 *
 * @param {CustomButtonProps} props - The properties for configuring the CustomButton component.
 * @param {boolean} [props.isLoading=false] - Optional: If true, the button appears in a loading state (with reduced opacity).
 * @param {string} props.title - The text label to display on the button.
 * @param {() => void} props.onPress - The callback function triggered when the button is pressed.
 *
 * @example
 * <CustomButton
 *    title="Click Me"
 *    onPress={() => console.log('Button pressed')}
 *    isLoading={false}
 * />
 */
const CustomButton = ({
                          isLoading = false, // Default value for isLoading is false
                          ...props}:CustomButtonProps) => {
    const {fontSizes, colors} = useAppStyle(); // Extracting font sizes and colors from the app style context
    const styles = dynamicStyles(fontSizes, colors); // Creating dynamic styles based on the current theme

    return (
        <TouchableOpacity onPress={props.onPress}
                          style={[styles.container, isLoading && styles.loading]}
        >
            <Text style={styles.label}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
/**
 * Generates dynamic styles for the CustomButton component based on the current font sizes and colors.
 *
 * @param {FontSize} fontSizes - The font size settings based on the current theme.
 * @param {Colors} colors - The color palette based on the current theme.
 */
const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.darkNeutral,
            borderRadius: ThemeSizes.Radius.button,
            height: ThemeSizes.Sizes.buttonHeight,
            justifyContent: "center",
            alignItems: "center"
        },
        label: {
            color: colors.white,
            fontFamily: Fonts.semiBold,
            fontSize: fontSizes.title3
        },
        loading: {
            opacity: 0.5
        }
    })
}
