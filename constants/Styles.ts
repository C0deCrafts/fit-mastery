import { StyleSheet } from 'react-native';
import { ThemeSizes } from "@/constants/Sizes";
import { Fonts } from "@/constants/Fonts";
import { Colors, FontSize } from "@/constants/types/styleTypes";

export const appStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: ThemeSizes.Spacing.horizontalDefault,
        },
        descriptionContainer: {
            marginBottom: ThemeSizes.Spacing.titleSpacingBottom
        },
        description: {
            fontSize: fontSizes.subhead,
            fontFamily: Fonts.regular,
            color: colors.label,
        },
        titleDescription: {
            fontSize: fontSizes.subhead,
            fontFamily: Fonts.semiBold,
            color: colors.baseColor,
        },
        separator: {
            //height: StyleSheet.hairlineWidth,
        },
    });
};
