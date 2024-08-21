import {StyleSheet, View, Text, Button} from 'react-native'
import {useAppStyle} from "@/context/AppStyleContext";
import {FontSize} from "@/constants/types/styleTypes";
import {xSmall} from "@/constants/FontSizes";
import {useAuth} from "@/context/AuthContext";

const SettingsIndex = () => {
    const { colors, colorScheme, fontSizes, toggleTheme, changeBaseColor, changeFontSize} = useAppStyle();
const {deleteUserData} = useAuth();

    const handleColorChange = (color : string) => {
        changeBaseColor(color);
    };

    const handleFontSizeChange = (size : FontSize) => {
        changeFontSize(size);
    }

    const deleteUser = async () => {
        console.log("Delete User Data")
        await deleteUserData();
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
            <Button title="Delete User Data" onPress={deleteUser} />
        </View>
    );
}

export default SettingsIndex

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
