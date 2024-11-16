import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {useAppStyle} from "@/context/AppStyleContext";
import WorkoutContextMenu from "@/components/WorkoutContextMenu";
import {Image} from "expo-image";
import {Fonts, Icons, ThemeSizes} from "@/constants";

interface Exercise {
    duration: number;
}

interface Workout {
    id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    image?: string;
    isFavorite?: boolean;
    isUserPlan?: boolean;
}

interface WorkoutCardProps {
    index: number;
    workout: Workout;
    isSmall?: boolean;
    erasable?: boolean;
    showFavoriteIcon?: boolean;
    onAddToFavorites?: () => void;
    onRemoveFromFavorites?: () => void;
    onDeleteWorkout?: () => void;
    onShareWorkout?: () => void;
    //onLongPress?: () => void; // Optional: LongPress für Menüs
}

const WorkoutCard = ({
                         workout,
                         isSmall = false,
                         erasable = false,
                         onAddToFavorites,
                         onRemoveFromFavorites,
                         onDeleteWorkout,
                         onShareWorkout,
                         showFavoriteIcon = true,
                         //onLongPress
                     }: WorkoutCardProps) => {
    const { fontSizes, colors } = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors, isSmall, workout.isFavorite || false);

    const totalDuration = workout.exercises.reduce((total, exercise) => total + (exercise.duration || 0), 0);
    const durationInMinutes = Math.ceil(totalDuration / 60);

    return (
        <WorkoutContextMenu
            isFavorite={workout.isFavorite || false}  // Setze dies basierend darauf, ob das Workout in Favoriten ist
            erasable={erasable}
            onRemoveFromFavorites={onRemoveFromFavorites}
            onAddToFavorites={onAddToFavorites}
            onDeleteWorkout={workout.isUserPlan ? onDeleteWorkout : undefined} // Löschen nur, wenn es ein Benutzerplan ist
            onShareWorkout={onShareWorkout}
        >
            <View style={styles.card}>
                {/*Workout Image Top*/}
                {workout.image && (
                    <Image
                        source={workout.image}
                        style={styles.cardImage}
                        contentFit={"cover"}
                    />
                )}
                {/*Favorite Icon Top*/}
                {showFavoriteIcon &&
                    <TouchableOpacity
                        style={styles.favoriteIconContainer}
                        onPress={workout.isFavorite ? onRemoveFromFavorites : onAddToFavorites}>
                        <Image source={workout.isFavorite ? Icons.favorite_filled : Icons.favorite}
                               style={styles.favoriteIcon}
                               contentFit="contain"/>
                    </TouchableOpacity>
                }
                {/*Card Content*/}
                <View style={styles.cardContent}>
                    {/*Title*/}
                    <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                        {workout.name}
                    </Text>
                    {/*Description*/}
                    <Text style={styles.cardDescription} numberOfLines={2} ellipsizeMode="tail">
                        {workout.description}
                    </Text>
                    {/*Card footer*/}
                    <View style={styles.cardFooter}>
                        <Image source={Icons.time} style={styles.smallIcon}/>
                        <Text style={styles.cardDescription}>{durationInMinutes} Min</Text>
                        <Text style={styles.cardDescription}> ● {workout.exercises.length} Übungen</Text>
                    </View>
                </View>
            </View>
        </WorkoutContextMenu>

    )
}

export default WorkoutCard

const dynamicStyles = (fontSizes: any, colors: any, isSmall: boolean, isFavorite: boolean) => {
    return StyleSheet.create({
        card: {
            backgroundColor: colors.secondary,
            borderRadius: ThemeSizes.Radius.card,
            width: isSmall ? 120 : 200, // Kleinere Größe für kleinere Karten
            elevation: 2,
            padding: 0,
        },
        cardImage: {
            height: isSmall ? 60 : 100, // Kleinere Bildgröße für kleine Karten
            borderTopLeftRadius: ThemeSizes.Radius.card,
            borderTopRightRadius: ThemeSizes.Radius.card,
        },
        cardContent: {
            padding: isSmall ? 5 : 10, // Unterschiedliches Padding
        },
        cardTitle: {
            fontFamily: Fonts.semiBold,
            fontSize: isSmall ? fontSizes.footnote : fontSizes.subhead, // Kleinere Schriftgröße für kleine Karten
            color: colors.label,
            marginBottom: 5,
        },
        cardDescription: {
            fontFamily: Fonts.regular,
            fontSize: fontSizes.footnote,
            color: colors.secondaryLabel,
        },
        cardFooter: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
        },
        smallIcon: {
            width: 15,
            height: 15,
            tintColor: colors.baseColor,
            marginRight: 5,
        },
        favoriteIconContainer: {
            position: 'absolute',
            top: 10,
            right: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        favoriteIcon: {
            width: 20,
            height: 20,
            tintColor: isFavorite ? null : colors.black,
        },
    });
};