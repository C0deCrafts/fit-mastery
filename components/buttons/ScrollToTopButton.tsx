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