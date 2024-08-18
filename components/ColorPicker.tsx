import {StyleSheet, View, TouchableOpacity} from 'react-native'

interface ColorPickerProps {
    color: string;
    onPress: () => void;
}

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