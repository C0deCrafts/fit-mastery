import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ReactNode} from "react";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts, ThemeSizes} from "@/constants";
import {Image} from "expo-image";

interface TitleCardContainerProps {
    title: string;
    children: ReactNode;
    icon?: any; // Optional: Icon image source (e.g., require('./path/to/icon.png'))
    iconLeft?: any; // Optional: Icon image source (e.g., require('./path/to/icon.png'))
    onPressIcon?: () => void; // Optional: Icon onPress event handler
}

/**
 * TitleCardContainer is a reusable component that displays a title followed by its children content.
 * The component applies dynamic styles based on the current theme's font sizes and colors,
 * which are provided by the useAppStyle context. An optional clickable icon can be displayed on the right.
 *
 * @param {TitleCardContainerProps} props - The properties for configuring the TitleCardContainer component.
 * @param {string} props.title - The title text displayed at the top of the container.
 * @param {ReactNode} props.children - The content to be displayed below the title.
 * @param {any} [props.icon] - Optional: The image source for the icon displayed on the right.
 * @param {() => void} [props.onPressIcon] - Optional: The callback function triggered when the icon is pressed.
 *
 * @example
 * <TitleCardContainer title="Section Title" icon={require('path/to/icon.png')} onPressIcon={handlePress}>
 *    <Text>Content goes here</Text>
 * </TitleCardContainer>
 */
const TitleCardContainer = (props: TitleCardContainerProps) => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    return (
        <>
            <View style={[styles.headerContainer,props.iconLeft && {
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
            }]}>
                {props.iconLeft && (
                        <Image style={styles.iconLeft} source={props.iconLeft} contentFit="contain" />
                )}
                <Text style={styles.title}>{props.title}</Text>
                {/* Render icon if icon source and onPressIcon are provided */}
                {props.icon && props.onPressIcon && (
                    <TouchableOpacity onPress={props.onPressIcon}>
                        <Image style={styles.icon} source={props.icon} contentFit="contain" />
                    </TouchableOpacity>
                )}
            </View>
            {props.children}
        </>
    );
};

export default TitleCardContainer;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between', // Aligns the icon to the right
            alignItems: 'center',
            marginVertical: 10,
        },
        title: {
            fontSize: fontSizes.title3,
            fontFamily: Fonts.semiBold,
            color: colors.label,
        },
        icon: {
            width: ThemeSizes.Sizes.defaultIcon, // Set the icon width
            height: ThemeSizes.Sizes.defaultIcon, // Set the icon height
            tintColor: colors.label, // Adjust icon color if needed
        },
        iconLeft: {
            width: ThemeSizes.Sizes.smallIcon, // Set the icon width
            height: ThemeSizes.Sizes.smallIcon, // Set the icon height
            tintColor: colors.baseColor, // Adjust icon color if needed
        },
    });
};
