// Icons
import { ActionIcons } from "@/constants/Icons";
import { HealthIcons } from "@/constants/Icons";
import { MultimediaIcons } from "@/constants/Icons";
import { NavigationIcons } from "@/constants/Icons";
import { ProductivityIcons } from "@/constants/Icons";
import { SecurityIcons } from "@/constants/Icons";
import { SocialIcons } from "@/constants/Icons";
import { UIIcons } from "@/constants/Icons";

// Styles
import { ThemeSizes } from "@/constants/Sizes";
import { Fonts } from "@/constants/Fonts";
import { BackgroundImages, MiscImages, ThemeImages } from "@/constants/Images";

/**
 * Combines all icon sets into a single `Icons` object for centralized access.
 *
 * The `Icons` object is created by merging various categorized icon sets
 * (`ActionIcons`, `HealthIcons`, `MultimediaIcons`, etc.) using the spread operator.
 *
 * This approach offers several benefits:
 *
 * 1. **Centralized Access**: All icons can be accessed from a single object,
 *    making it easier to use and manage icons throughout the app.
 *
 * 2. **Modularity**: By keeping the icons organized in categories, the code
 *    remains modular and well-structured. Each category can be updated
 *    independently, allowing for easier maintenance and scalability.
 *
 * 3. **Flexibility**: While `Icons` provides a central point of access,
 *    individual icon sets can still be imported and used separately if
 *    only a specific group of icons is needed in a particular context.
 *
 * 4. **Consistency**: This structure promotes consistent use of icons across
 *    the app, ensuring that all icons are managed in a single place,
 *    reducing the risk of duplication or inconsistency.
 *
 * Example Usage:
 *
 * To access any icon, simply reference it from the `Icons` object:
 *
 * ```typescript
 * import { Icons } from "@/constants/Icons";
 *
 * const addIcon = Icons.add;
 * ```
 *
 * If you only need a specific category of icons, you can import just that category:
 *
 * ```typescript
 * import { ActionIcons } from "@/constants/Icons";
 *
 * const addIcon = ActionIcons.add;
 * ```
 */
const Icons = {
    ...ActionIcons,
    ...HealthIcons,
    ...MultimediaIcons,
    ...NavigationIcons,
    ...ProductivityIcons,
    ...SecurityIcons,
    ...SocialIcons,
    ...UIIcons,
};

const Images = {
    ...BackgroundImages,
    ...ThemeImages,
    ...MiscImages,
};

export {
    Icons,
    Images,
    ThemeSizes,
    Fonts,
};



