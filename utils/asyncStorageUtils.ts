import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontSize, Theme} from "@/assets/types/styleTypes";
import {Colors, darkColors, lightColors} from "@/constants/Colors";
import {isDarkColor} from "@/utils/styleContextUtils";

interface AppStyles {
    colorScheme: Theme;
    fontSizes: FontSize;
    baseColor: string;
}

/**
 * Saves the current app style settings, including color scheme, font size, and base color,
 * to AsyncStorage. This allows for persistent storage of user preferences across app sessions.
 *
 * @param {Theme} colorScheme - The current color scheme ("light" or "dark").
 * @param {FontSize} fontSizes - The current font size setting.
 * @param {string} baseColor - The current base color used in the app.
 * @returns {Promise<void>} - A promise that resolves when the styles are successfully saved.
 */
export const saveStyles = async (colorScheme: Theme, fontSizes: FontSize, baseColor: string): Promise<void> => {
    try {
        const styles: AppStyles = {
            colorScheme,
            fontSizes,
            baseColor,
        };
        await AsyncStorage.setItem('appStyles', JSON.stringify(styles));
    } catch (e) {
        console.error('Fehler beim Speichern der Styles:', e);
    }
};

/**
 * Loads the saved app style settings from AsyncStorage and applies them to the app.
 * This includes restoring the color scheme, font size, and base color.
 *
 * @param {function} setColorScheme - Function to update the color scheme state.
 * @param {function} setFontSizes - Function to update the font size state.
 * @param {function} setColors - Function to update the color settings, including the base color.
 * @returns {Promise<void>} - A promise that resolves when the styles are successfully loaded and applied.
 */
export const loadStyles = async (
    setColorScheme: (theme: Theme) => void,
    setFontSizes: (size: FontSize) => void,
    setColors: (colors: Colors) => void
): Promise<void> => {
    try {
        const savedStyles = await AsyncStorage.getItem('appStyles');
        if (savedStyles) {
            const { colorScheme, fontSizes, baseColor } = JSON.parse(savedStyles) as AppStyles;

            setColorScheme(colorScheme);
            setFontSizes(fontSizes);
            setColors({
                ...colorScheme === "light" ? lightColors : darkColors,
                baseColor,
                colorButtonLabel: isDarkColor(baseColor) ? lightColors.lightNeutral : darkColors.darkNeutral,
            });
        }
    } catch (e) {
        console.error('Fehler beim Laden der Styles:', e);
    }
};
