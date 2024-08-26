import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Image} from 'expo-image';
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts} from "@/constants";
import {blurHash} from "@/utils/common";

interface RadioButtonProps {
    button: {
        label: string;
        image: any;
    };
    isSelected: boolean;
    onPress: () => void;
}
/**
 * RadioButton is a reusable component that displays a selectable button with an image and label.
 * The button can be selected or unselected, and the styles change accordingly.
 * The styles are generated dynamically based on the current theme's font sizes and colors, which are provided by the useAppStyle context.
 *
 * @param {RadioButtonProps} props - The properties for configuring the RadioButton component.
 * @param {object} props.button - The button object containing a label and an image.
 * @param {string} props.button.label - The label text to display next to the radio button.
 * @param {any} props.button.image - The image source to display above the label.
 * @param {boolean} props.isSelected - Indicates whether the radio button is currently selected.
 * @param {() => void} props.onPress - The callback function triggered when the button is pressed.
 *
 * @example
 * <RadioButton
 *    button={{ label: "Option 1", image: require('path/to/image.png') }}
 *    isSelected={true}
 *    onPress={() => console.log('Option 1 selected')}
 * />
 */
const RadioButton = (props:RadioButtonProps) => {
    const { colors, fontSizes } = useAppStyle();
    const styles = dynamicStyles(colors, fontSizes);

    return (
        <TouchableOpacity onPress={!props.isSelected ? props.onPress : undefined}
                          disabled={props.isSelected}>
            <View style={styles.radioButton}>
                <Image source={props.button.image} style={styles.radioImage} placeholder={blurHash} transition={1000}/>
                <Text style={styles.text}>{props.button.label}</Text>
                {props.isSelected ? (
                    <View style={styles.radioSelectedContainer}>
                        <View style={styles.radioSelected} />
                    </View>
                ) : (
                    <View style={styles.radioNotSelected} />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default RadioButton;

const dynamicStyles = (colors: Colors, fontSizes: FontSize) => {
    return StyleSheet.create({
        radioButton: {
            alignItems: "center",
            gap: 5
        },
        radioImage: {
            width: 60,
            height: 100,
        },
        radioSelected: {
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: colors.baseColor
        },
        radioSelectedContainer: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: colors.baseColor,
            alignItems: 'center',
            justifyContent: 'center'
        },
        radioNotSelected: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: colors.baseColor,
        },
        text: {
            fontFamily: Fonts.regular,
            color: colors.label,
            textAlign: "left",
            fontSize: fontSizes.subhead,
        }
    })};
