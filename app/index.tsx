import {View, Text, Button, StyleSheet} from 'react-native';
import {useAppStyle} from "@/context/AppStyleContext";
import {xSmall} from "@/constants/FontSizes";
import {FontSize} from '@/assets/types/styleTypes';

export default function Index() {
    const { colors, colorScheme, fontSizes, toggleTheme, changeBaseColor, changeFontSize} = useAppStyle();

    const handleColorChange = (color : string) => {
        changeBaseColor(color);
    };

    const handleFontSizeChange = (size : FontSize) => {
        changeFontSize(size);
    }

        return (
            <View style={[styles.container, {backgroundColor: colors.primary}]}>
                <View style={{backgroundColor: colors.baseColor, padding: 20}}>
                    <Text style={{
                        color: colors.colorButtonLabel,
                        fontSize: fontSizes.title1,
                    }}>Current theme: {colorScheme}</Text>
                </View>
                <Button title="Toggle Theme" onPress={toggleTheme} />
                <Button title="Change Base Color" onPress={() => handleColorChange(colors.pink_2)} />
                <Button title="Change Text Size" onPress={() => handleFontSizeChange(xSmall)} />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
