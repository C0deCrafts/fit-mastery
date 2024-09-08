import {StyleSheet, View, Text} from 'react-native'
import Card from "@/components/Card";
import {Image} from "expo-image";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts, ThemeSizes} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import {ExerciseProps} from "@/context/ExercisesContext";

interface ExerciseItemProps {
    item: ExerciseProps;
}

/**
 * ExerciseItem is a reusable component that displays exercise details in a card.
 * It shows the name of the exercise and an image associated with it.
 * The styles for the component are dynamically generated based on the current theme's
 * font sizes and colors provided by the useAppStyle context.
 *
 * @param {ExerciseItemProps} props - The properties for configuring the ExerciseItem component.
 * @param {ExerciseProps} props.item - The exercise data including name, gifUrl, etc.
 *
 * @example
 * <ExerciseItem item={exerciseData} />
 */
const ExerciseItem = ({item}: ExerciseItemProps) => {
    const {colors, fontSizes} = useAppStyle();
    const styles = dynamicStyles(colors, fontSizes);
    return (
        <Card style={styles.exercisesContainer}>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode={"tail"}>{item.name}</Text>
            <Image style={styles.image} source={item.gifUrl} contentFit={"contain"}/>
        </Card>
    )
}

export default ExerciseItem


const dynamicStyles = (colors: Colors, fontSizes: FontSize) => {
    return StyleSheet.create({
        exercisesContainer: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
        },
        image: {
            width: 80,
            height: 80,
            borderRadius: ThemeSizes.Radius.image
        },
        name: {
            fontFamily: Fonts.semiBold,
            color: colors.label,
            textAlign: "left",
            fontSize: fontSizes.subhead,
            width: "70%",
        },
    });
}