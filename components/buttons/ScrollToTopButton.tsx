import {StyleSheet,TouchableOpacity} from 'react-native'
import {Image} from "expo-image";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors} from "@/constants/types/styleTypes";
import {NavigationIcons} from "@/constants/Icons";
import Animated from "react-native-reanimated";

interface ScrollToTopButtonProps {
    buttonStyle: any;
    onPress: () => void;
}
/**
 * ScrollToTopButton is a reusable component that displays a button to scroll to the top of the screen.
 * The button is animated and can be customized with different styles and actions.
 *
 * @param {ScrollToTopButtonProps} props - The properties for configuring the ScrollToTopButton component.
 * @param {any} props.buttonStyle - The animated style applied to the button, typically used to control visibility.
 * @param {() => void} props.onPress - The function to call when the button is pressed.
 *
 * @example
 * <ScrollToTopButton
 *    buttonStyle={animatedStyle}
 *    onPress={() => scrollToTop()}
 * />
 */
const ScrollToTopButton = ({buttonStyle, onPress}:ScrollToTopButtonProps) => {
    const {colors} = useAppStyle();
    const styles = dynamicStyles(colors);

  return (
    <Animated.View style={[buttonStyle, styles.container]}>
      <TouchableOpacity onPress={onPress}>
          <Image style={styles.image} source={NavigationIcons.up}/>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default ScrollToTopButton

const dynamicStyles = (colors: Colors) => {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 100,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 30,
            backgroundColor: colors.baseColor,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 30,
            height: 30,
            tintColor: colors.colorButtonLabel,
        }
    })
}