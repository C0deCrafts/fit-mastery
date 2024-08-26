import {darkColors, lightColors} from "@/constants/Colors";
import {Dimensions} from "react-native";
import {Colors} from "@/constants/types/styleTypes";
/**
 * Checks if a given color is considered a "dark base color".
 * Dark base colors should have a light label, while other colors
 * should have a dark label.
 *
 * @param {string} color - The color to check.
 * @returns {boolean} - Returns true if the color is a dark base color, otherwise false.
 */
export const isDarkColor = (color: string): boolean => {
    const darkBaseColors = [
        lightColors.red, lightColors.mint_2,
        lightColors.teal_2, lightColors.cyan_2, lightColors.blue,
        lightColors.indigo, lightColors.indigo_2, lightColors.purple,
        lightColors.purple_2, lightColors.pink, lightColors.pink_2,
        lightColors.custom,

        darkColors.red, darkColors.blue, darkColors.indigo,
        darkColors.purple, darkColors.pink,
    ];

    const isDark = darkBaseColors.includes(color);
    console.log(`[isDarkColor] Checked color: ${color}, isDark: ${isDark}`);
    return isDark;
};
/**
 * Retrieves an array of user-selectable colors for the color picker based on the current theme colors.
 *
 * @param {Colors} colors - The color palette of the current theme.
 * @returns {string[]} - An array of color strings that the user can select from.
 */
export const userColors = (colors: Colors): string[] => {
    return [
        colors.red,
        colors.orange,
        colors.yellow,
        colors.green,
        colors.mint,
        colors.mint_2,
        colors.teal,
        colors.teal_2,
        colors.cyan,
        colors.cyan_2,
        colors.blue,
        colors.indigo,
        colors.indigo_2,
        colors.purple,
        colors.purple_2,
        colors.pink,
        colors.pink_2,
        colors.brown,
        colors.gray,
        colors.custom,
    ];
};
/**
 * Finds the corresponding base color from the opposite color scheme.
 * This function helps in switching themes (e.g., from dark to light mode)
 * by ensuring the base color remains consistent with the user's selection.
 *
 * @param {string} currentBaseColor - The current base color in use.
 * @param {"light" | "dark"} targetScheme - The color scheme to switch to ("light" or "dark").
 * @returns {string} - Returns the corresponding base color from the target color scheme.
 */
export const getCorrespondingBaseColor = (
    currentBaseColor: string,
    targetScheme: "light" | "dark"
): string => {
    //console.log(`[getCorrespondingBaseColor] Current base color: ${currentBaseColor}, Target scheme: ${targetScheme}`);

    // Determine source and target color palettes based on the target color scheme
    const sourceColors = targetScheme === "light" ? darkColors : lightColors;
    const targetColors = targetScheme === "light" ? lightColors : darkColors;

    // Find the key of the current base color in the source color palette
    const matchingColorKey = Object.keys(sourceColors).find(
        key => sourceColors[key as keyof typeof sourceColors] === currentBaseColor
    ) as keyof typeof targetColors | undefined;

    /*if (matchingColorKey) {
        console.log(`[getCorrespondingBaseColor] Found matching color key: ${matchingColorKey}, Corresponding color: ${targetColors[matchingColorKey]}`);
    } else {
        console.log(`[getCorrespondingBaseColor] No matching color found, using default color: ${targetColors.teal_2}`);
    }*/

    // Return the corresponding color from the target color palette or a default color
    return matchingColorKey ? targetColors[matchingColorKey] : targetColors.teal_2;
};
/**
 * Checks if the screen height is at least the height of an iPhone 14.
 * This function can be used to determine if the device's screen size is
 * at least as large as that of an iPhone 14, for layout adjustments.
 *
 * @returns {boolean} - Returns true if the screen height is at least that of an iPhone 14, otherwise false.
 */
export const isScreenHeightAtLeastIphone14 = (): boolean => {
    const screenHeight = Dimensions.get("screen").height;
    const iPhoneXHeight = 844;
    return screenHeight >= iPhoneXHeight;
}