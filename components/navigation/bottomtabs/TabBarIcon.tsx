import {StyleSheet, Text, View} from "react-native";
import {Image} from 'expo-image';
import {Fonts, ThemeSizes} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import {FontSize} from "@/constants/types/styleTypes";
/**
 * TabIcon is a component that renders an icon and a label for a tab in a navigation bar.
 * It adjusts the style based on whether the tab is focused or not, allowing for visual feedback to the user.
 *
 * This will render a tab icon with a label, and the icon and label color will change based on the `focused` prop.
 *
 * @param {TabIconProps} props - The properties for configuring the TabIcon component.
 * @param {any} props.icon - The source for the icon image to be displayed.
 * @param {string} props.color - The color applied to the icon and label text.
 * @param {string} props.name - The label text displayed below the icon.
 * @param {boolean} props.focused - Determines if the tab is currently focused (active).
 *
 * @example
 * <TabIcon
 *    icon={require('@/assets/icons/home.png')}
 *    color={focused ? 'blue' : 'gray'}
 *    name="Home"
 *    focused={focused}
 * />
 */
interface TabIconProps {
    icon: any,
    color: string,
    name: string,
    focused: boolean
}

const TabIcon = (props: TabIconProps) => {
    const {fontSizes} = useAppStyle();
    const styles = dynamicStyles(fontSizes);

    return (
        <View style={styles.container}>
            <Image
                source={props.icon}
                contentFit="contain"
                tintColor={props.color}
                style={{
                    width: 25,
                    height: 25,
                }}
            />
            <Text style={[styles.text, props.focused && styles.focusedText, {color: props.color}]} numberOfLines={1}
                  ellipsizeMode="tail">
                {props.name}
            </Text>
        </View>
    )
}

export default TabIcon;

const dynamicStyles = (fontSizes: FontSize) => {
    return StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            gap: ThemeSizes.Spacing.tabLabelSpacing,
            minWidth: 90
        },
        text: {
            fontSize: fontSizes.caption1,
            fontFamily: Fonts.light
        },
        focusedText: {
            fontFamily: Fonts.light
        }
    })
}