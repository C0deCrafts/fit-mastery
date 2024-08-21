import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {lightColors} from "@/constants/Colors";
import {forwardRef, useState} from "react";
import {Image} from "expo-image";
import {SecurityIcons} from "@/constants/Icons";
import {Fonts, ThemeSizes} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import { FontSize } from '@/constants/types/styleTypes';

interface AuthFieldProps {
    value: string;
    placeholder: string;
    isPassword?: boolean;
    returnKeyType?: "done" | "next";
    inputMode?: "text" | "email";
    keyboardType?: "default" | "email-address";
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
}
/**
 * AuthField is a reusable input component designed for authentication forms.
 * It supports standard text input and password input with a toggle to show/hide the password.
 *
 * @param {AuthFieldProps} props - The properties for configuring the AuthField component.
 * @param {string} props.value - The current value of the input field.
 * @param {string} props.placeholder - Placeholder text to display when the input is empty.
 * @param {boolean} [props.isPassword=false] - Optional: If true, the input is treated as a password field.
 * @param {"done" | "next"} [props.returnKeyType] - Optional: The return key type for the keyboard.
 * @param {"text" | "email"} [props.inputMode] - Optional: Specifies the input type (e.g., text or email).
 * @param {"default" | "email-address"} [props.keyboardType] - Optional: Specifies the keyboard type (e.g., default or email).
 * @param {(text: string) => void} props.onChangeText - Callback function triggered when the text changes.
 * @param {() => void} [props.onSubmitEditing] - Optional: Callback function triggered when the return key is pressed.
 *
 * @example
 * <AuthField
 *    value={password}
 *    placeholder="Enter your password"
 *    isPassword={true}
 *    onChangeText={(text) => setPassword(text)}
 *    onSubmitEditing={handleLogin}
 * />
 */
const AuthField = forwardRef<TextInput, AuthFieldProps>(({
                                                             isPassword = false,
                                                             ...props
                                                         }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const {fontSizes, colorScheme} = useAppStyle();
    const styles = dynamicStyles(fontSizes);

    return (
        <>
            <View style={[styles.container, isFocused && styles.focused]}>
                <TextInput ref={ref}
                           style={styles.input}
                           value={props.value}
                           placeholder={props.placeholder}
                           placeholderTextColor={lightColors.secondaryLabel}
                           onChangeText={props.onChangeText}
                           secureTextEntry={isPassword && !showPassword}
                           onSubmitEditing={props.onSubmitEditing}
                           onFocus={() => setIsFocused(true)}
                           onBlur={() => setIsFocused(false)}
                           returnKeyType={props.returnKeyType}
                           autoCapitalize="none"
                           keyboardAppearance={colorScheme === "light" ? "light" : "dark"}
                           keyboardType={props.keyboardType}
                           maxLength={300}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? SecurityIcons.lock : SecurityIcons.unlock}
                               style={styles.passwordIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </>
    )
});

export default AuthField

const dynamicStyles = (fontSizes: FontSize) => {
    return StyleSheet.create({
        container: {
            backgroundColor: lightColors.secondaryTransparent,
            borderRadius: ThemeSizes.Radius.input,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: ThemeSizes.Sizes.authFieldHeight,
            paddingHorizontal: ThemeSizes.Spacing.horizontalDefault
        },
        input: {
            flex: 1,
            fontFamily: Fonts.regular,
            fontSize: fontSizes.body,
        },
        passwordIcon: {
            width: ThemeSizes.Sizes.lockIcon,
            height: ThemeSizes.Sizes.lockIcon,
            marginLeft: ThemeSizes.Spacing.horizontalDefault
        },
        focused: {
            borderWidth: 2,
            borderColor: "#185360",
        },
    })
}
