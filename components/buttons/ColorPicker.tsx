import {StyleSheet, View, TouchableOpacity} from 'react-native'

interface ColorPickerProps {
    color: string;
    onPress: () => void;
}
/**
 * ColorPicker is a reusable component that displays a circular color box.
 * The component can be pressed to trigger a callback function, making it useful for selecting colors.
 *
 * @param {ColorPickerProps} props - The properties for configuring the ColorPicker component.
 * @param {string} props.color - The background color of the color box.
 * @param {() => void} props.onPress - The callback function triggered when the color box is pressed.
 *
 * @example
 * <ColorPicker
 *    color="#FF0000"
 *    onPress={() => console.log('Red color selected')}
 * />
 */
const ColorPicker = ({color, onPress} : ColorPickerProps) => {
    const containerStyle = {
        ...styles.colorBox,
        backgroundColor: color,
    }

    return (
        <TouchableOpacity onPress={onPress}>
          <View style={containerStyle}>
          </View>
        </TouchableOpacity>
      )
}

export default ColorPicker

const styles = StyleSheet.create({
    colorBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        width: 35,
        height: 35,
    }
})