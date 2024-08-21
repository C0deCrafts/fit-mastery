import { large_default, small, medium, xLarge, xxLarge } from "@/constants/FontSizes";

/**
 * Defines the available themes for the application.
 *
 * @type {Theme}
 *
 * @property {"light"} light - Represents the light theme.
 * @property {"dark"} dark - Represents the dark theme.
 */
export type Theme = "light" | "dark";

/**
 * Defines the available font sizes based on predefined constants.
 *
 * @type {FontSize}
 *
 * FontSize can be one of the following:
 * - large_default: Default large font sizes.
 * - small: Font sizes for small screens.
 * - medium: Font sizes for medium screens.
 * - xLarge: Font sizes for extra large screens.
 * - xxLarge: Font sizes for double extra large screens.
 */
export type FontSize = typeof large_default | typeof small | typeof medium | typeof xLarge | typeof xxLarge;

/**
 * A list of keys representing the available colors in the application.
 *
 * @type {ColorKeys}
 *
 * This type includes common colors as well as theme-specific and neutral colors:
 *
 * - "red" | "orange" | "yellow" | "green" | "mint" | "mint_2" | "teal" | "teal_2" | "cyan" | "cyan_2"
 * - "blue" | "indigo" | "indigo_2" | "purple" | "purple_2" | "pink" | "pink_2" | "brown"
 * - "gray" | "gray_2" | "gray_3" | "gray_4" | "gray_5" | "gray_6" | "black" | "white"
 * - "primary" | "secondary" | "secondaryTransparent" | "label" | "secondaryLabel" | "tertiaryLabel" | "quaternaryLabel"
 * - "placeholderText" | "separator" | "opaqueSeparator" | "link" | "darkNeutral" | "lightNeutral"
 */
type ColorKeys = "red" | "orange" | "yellow" | "green" | "mint" | "mint_2" | "teal" | "teal_2" | "cyan" | "cyan_2" | "blue" | "indigo" | "indigo_2" | "purple" | "purple_2" | "pink" | "pink_2" | "brown" | "gray" | "gray_2" | "gray_3" | "gray_4" | "gray_5" | "gray_6" | "black" | "white" | "primary" | "secondary" | "secondaryTransparent" | "label" | "secondaryLabel" | "tertiaryLabel" | "quaternaryLabel" | "placeholderText" | "separator" | "opaqueSeparator" | "link" | "darkNeutral" | "lightNeutral";

/**
 * Represents a collection of color values used in the application.
 *
 * @type {Colors}
 *
 * This type allows for a mapping of color keys to their respective string values,
 * representing color codes (e.g., hex values, RGB, etc.).
 *
 * The color keys can be any of the predefined keys in ColorKeys or any custom string key.
 * This flexibility allows for both strict typing with known colors and the ability to add custom colors as needed.
 *
 * @example
 * const myColors: Colors = {
 *   primary: "#ff0000", // Red color for primary elements
 *   customColor: "#123456", // Custom color
 * };
 */
export type Colors = {
    [key in ColorKeys | string]: string ; // Erlaubt beliebige Schlüssel mit einem Wert vom Typ string
}