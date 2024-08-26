import {StyleSheet, View, Text} from 'react-native'
import {ReactNode} from "react";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts} from "@/constants";

interface TitleCardContainerProps {
    title: string;
    children: ReactNode;
}
/**
 * TitleCardContainer is a reusable component that displays a title followed by its children content.
 * The component applies dynamic styles based on the current theme's font sizes and colors,
 * which are provided by the useAppStyle context.
 *
 * @param {TitleCardContainerProps} props - The properties for configuring the TitleCardContainer component.
 * @param {string} props.title - The title text displayed at the top of the container.
 * @param {ReactNode} props.children - The content to be displayed below the title.
 *
 * @example
 * <TitleCardContainer title="Section Title">
 *    <Text>Content goes here</Text>
 * </TitleCardContainer>
 */
const TitleCardContainer = (props: TitleCardContainerProps) => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    return (
        <>
            <View style={styles.spacing}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            {props.children}
        </>
    )
}

export default TitleCardContainer

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        spacing: {
            marginVertical: 10,
        },
        title: {
            fontSize: fontSizes.title3,
            fontFamily: Fonts.semiBold,
            color: colors.label,
        },
    });
}