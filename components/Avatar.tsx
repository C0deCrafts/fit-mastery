import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {useAppStyle} from "@/context/AppStyleContext";
import {Image} from "expo-image";
import {Icons} from "@/constants";
import {useAuth} from "@/context/AuthContext";
import useAccountSettings from "@/hooks/useAccountSettings";

interface AvatarProps {
    imageRadius?: number;
    pressableDisabled?: boolean;
    isCameraVisible?: boolean;
}

/**
 * Avatar is a reusable component that displays a user's profile image.
 * The component can be configured to be pressable and can optionally display a camera icon for editing.
 * The styles for the avatar are generated dynamically based on the current theme's font sizes and colors,
 * which are provided by the useAppStyle context.
 *
 * @param {AvatarProps} props - The properties for configuring the Avatar component.
 * @param {number} [props.imageRadius=100] - Optional: The radius of the avatar image. Defaults to 100.
 * @param {boolean} [props.pressableDisabled=false] - Optional: If true, disables the press action on the avatar.
 * @param {boolean} [props.isCameraVisible=true] - Optional: If true, shows a camera icon overlay on the avatar.
 *
 * @example
 * <Avatar
 *    imageRadius={120}
 *    pressableDisabled={false}
 *    isCameraVisible={true}
 * />
 */
const Avatar = ({
                    imageRadius = 100,
                    pressableDisabled = false,
                    isCameraVisible = true
                }: AvatarProps) => {
    const {colors} = useAppStyle();
    const {user} = useAuth();
    const {selectImage, localPhotoURL} = useAccountSettings();

    // imageSource mit einem Fallback auf einen leeren String (wird benötigt damit die UI sofort mit dem neuen Bild gerendert wird)
    const imageSource = localPhotoURL ? {uri: localPhotoURL} : user?.photoURL ? {uri: user.photoURL} : null;

   // Überprüfe, ob das Bild "avatar.png" ist, wenn imageSource nicht null ist
    const isAvatarImage = imageSource?.uri && imageSource.uri.includes('avatar.png');


    return (
        <TouchableOpacity onPress={selectImage}
                          disabled={pressableDisabled}
        >
            <View style={[styles.imageContainer, {
                width: imageRadius,
                height: imageRadius,
                borderRadius: imageRadius / 2,
                backgroundColor: colors.secondary,
            }]}>
                <Image
                    source={imageSource}
                    style={{
                        width: imageRadius,
                        height: imageRadius,
                        borderRadius: imageRadius / 2,
                        tintColor: isAvatarImage ? colors.baseColor : undefined, // Wende tintColor nur an, wenn es sich um "avatar.png" handelt
                    }}
                    contentFit={"cover"}
                    //placeholder={blurHash}
                    //transition={1000}
                    cachePolicy={"memory-disk"}
                />
                {isCameraVisible && (
                    <View style={styles.camera}>
                        <Image source={Icons.camera} style={{
                            width: imageRadius / 4,
                            height: imageRadius / 4,
                            tintColor: colors.label
                        }}/>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default Avatar

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "flex-end",
    },
    camera: {
        flex: 1,
        justifyContent: "flex-end",
    },
});