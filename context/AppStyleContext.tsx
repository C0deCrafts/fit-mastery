import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getCorrespondingBaseColor, isDarkColor} from "@/utils/styleContextUtils";
import {Colors, darkColors, lightColors} from "@/constants/Colors";
import {xSmall, small, medium, large_default, xLarge, xxLarge} from "@/constants/FontSizes";
import {FontSize, Theme } from "@/assets/types/styleTypes";
import {loadStyles, saveStyles} from "@/utils/asyncStorageUtils";

interface AppStyleContextType {
    colors: Colors;
    colorScheme: Theme;
    fontSizes: FontSize;
    changeBaseColor: (color: string) => void;
    changeFontSize: (size: FontSize) => void;
    toggleTheme: () => void;
}

/**
 * AppStyleProvider is a context provider component that manages the application's
 * style-related state, such as color scheme, font sizes, and base color.
 * It provides functions to toggle the theme, change the base color, and adjust the font size.
 *
 * The provider also handles loading and saving these preferences using AsyncStorage,
 * ensuring that the user's preferences are persisted across sessions.
 *
 * @param {AppStyleProviderProps} props - The properties for the AppStyleProvider.
 * @returns {JSX.Element} - The context provider component for application styles.
 */
const AppStyleContext = createContext<AppStyleContextType | undefined>(undefined);

interface AppStyleProviderProps {
    children: ReactNode;
}

export const AppStyleProvider = ({children}: AppStyleProviderProps) => {
    const [colorScheme, setColorScheme] = useState<Theme>("light");
    const [fontSizes, setFontSizes] = useState<FontSize>(large_default);
    const [colors, setColors] = useState<Colors>(
        {
            ...colorScheme === "light" ? lightColors : darkColors,
            baseColor: colorScheme === "light" ? lightColors.teal_2 : darkColors.teal_2,
            colorButtonLabel: lightColors.lightNeutral
        }
    )

    /**
     * Loads the saved style settings from AsyncStorage when the component mounts.
     * Updates the color scheme, font sizes, and colors based on the saved values.
     */
    useEffect(() => {
        const loadAppStyles = async () => {
            await loadStyles(setColorScheme, setFontSizes, setColors);
        };
        loadAppStyles().then(() => console.log('Styles geladen'));
    }, []);

    /**
     * Saves the current style settings to AsyncStorage whenever the color scheme,
     * font sizes, or base color changes.
     */
    useEffect(() => {
        const saveAppStyles = async () => {
            await saveStyles(colorScheme, fontSizes, colors.baseColor);
        };
        saveAppStyles().then(() => console.log('Styles gespeichert'));
    }, [colorScheme, fontSizes, colors.baseColor]);

    /**
     * Updates the colors based on the current color scheme whenever it changes.
     * Uses a helper function to determine the new base color and adjusts the button label color accordingly.
     */
    useEffect(() => {
        setColors(prevColors => {
            // helper function to change the base color based on the color scheme
            const newBaseColor = getCorrespondingBaseColor(prevColors.baseColor, colorScheme);

            return {
                ...colorScheme === "light" ? lightColors : darkColors,
                baseColor: newBaseColor,
                colorButtonLabel: isDarkColor(newBaseColor) ? lightColors.lightNeutral : darkColors.darkNeutral
            }
        });
    }, [colorScheme]);

    /**
     * Changes the base color of the app and updates the button label color
     * depending on whether the new base color is dark or light.
     *
     * @param {string} color - The new base color to set.
     */
    const changeBaseColor = (color: string) => {
        setColors(prevColors => ({
            ...prevColors,
            baseColor: color,
            colorButtonLabel: isDarkColor(color) ? lightColors.lightNeutral : darkColors.darkNeutral,
        }));
    };

    /**
     * Changes the font size of the app based on the provided size.
     *
     * @param {FontSize} size - The new font size to set.
     */
    const changeFontSize = (size: FontSize) => {
            let newFontSizes;
            switch (size) {
                case xSmall:
                    newFontSizes = xSmall;
                    break;
                case small:
                    newFontSizes = small;
                    break;
                case medium:
                    newFontSizes = medium;
                    break;
                case xLarge:
                    newFontSizes = xLarge;
                    break;
                case xxLarge:
                    newFontSizes = xxLarge;
                    break;
                default:
                    newFontSizes = large_default;
            }

            setFontSizes(newFontSizes);
            //saveStyles('fontSize', size);
        };

    /**
     * Toggles the theme between light and dark modes.
     */
    const toggleTheme = () => {
        const newColorScheme = colorScheme === "light" ? "dark" : "light";
        setColorScheme(newColorScheme);
    };

    return (
        <AppStyleContext.Provider value={{
            colors,
            colorScheme,
            fontSizes,
            toggleTheme,
            changeBaseColor,
            changeFontSize
        }}>
            {children}
        </AppStyleContext.Provider>
    )
}

export const useAppStyle = () => {
    const context = useContext(AppStyleContext);
    if (!context) {
        throw new Error("useAppStyle must be used within a AppStyleProvider");
    }
    return context;
}