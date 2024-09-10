import React, {useState} from "react";
import {TouchableOpacity, View, Text, StyleSheet, Animated, LayoutChangeEvent} from "react-native";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts, ThemeSizes} from "@/constants";

interface SegmentedControlProps {
    options: string[],
    selectedOption: string,
    onOptionPress: (option: string, index: number) => void,
    slideAnim: Animated.Value  // Externer Animationswert
}

const SegmentedControl = (props: SegmentedControlProps) => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);
    const [containerWidth, setContainerWidth] = useState(0);  // Gesamtbreite des Containers

    const optionWidth = containerWidth / props.options.length;  // Berechne die Breite jeder Option
    const slideWidth = optionWidth - 6;  // Breite des Indikators

    const handleLayout = (event: LayoutChangeEvent) => {
        const {width} = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    return (
        <View style={styles.container} onLayout={handleLayout}>
            <Animated.View
                style={[
                    styles.slideIndicator,
                    {
                        width: slideWidth,
                        transform: [{
                            translateX: props.slideAnim.interpolate({
                                inputRange: [0, props.options.length - 1],
                                outputRange: [0, (props.options.length - 1) * optionWidth],
                                extrapolate: 'clamp',
                            })
                        }]
                    }
                ]}
            />
            {props.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => props.onOptionPress(option, index)}  // Wechsel der Seite bei Klick
                >
                    <Text style={[styles.text, option === props.selectedOption && styles.selectedText]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default SegmentedControl;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    function addTransparencyToRGB(rgbColor, alpha) {
        // Entfernt "rgb(" und ")" und wandelt die Farbe in ein Array von Werten um
        const rgbValues = rgbColor.replace(/[^\d,]/g, '').split(',');

        // Gibt die Farbe im rgba-Format zurück
        return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
    }

    return StyleSheet.create({
        container: {
            flexDirection: "row",
            marginTop: ThemeSizes.Spacing.fromHeader,
            backgroundColor: addTransparencyToRGB(colors.baseColor, 0.2),
            marginHorizontal: ThemeSizes.Spacing.horizontalDefault,
            borderRadius: 10,
            position: 'relative',
        },
        option: {
            flex: 1,
            height: 35,
            margin: 3,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        slideIndicator: {
            position: 'absolute',
            backgroundColor: colors.secondary,
            borderRadius: 8,
            height: 35,
            margin: 3,
            shadowColor: colors.label,
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
        },
        text: {
            fontSize: fontSizes.caption1,
            fontFamily: Fonts.regular,
            color: colors.label,
        },
        selectedText: {
            color: colors.label,
            fontFamily: Fonts.semiBold,
        }
    });
};
