import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native'
import {Image} from "expo-image";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import TitleCardContainer from "@/components/TitleCardContainer";
import {Fonts, Icons, ThemeSizes} from "@/constants";
import React from "react";

import WorkoutContextMenu from "@/components/WorkoutContextMenu";

import image from "@/assets/images/test/2024-F45-Brand-Library-Image-47.jpg";
import image_2 from "@/assets/images/test/cardio-training-zuhause.jpg";
import {appStyles} from "@/constants/Styles";
import Spacing from "@/components/spacing/Spacing";
import WorkoutCard from "@/components/cards/WorkoutCard";

interface Workout {
    id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    image?: string;
    isFavorite?: boolean | undefined;
}

interface Exercise {
    duration: number;
}

const dummyWorkouts: Workout[] = [
    {
        id: '1',
        name: 'Korrekturübungen',
        description: 'Übungen zur Korrektur und Stabilisierung.',
        exercises: [{duration: 300}, {duration: 600}],
        image: image
    },
    {
        id: '2',
        name: 'Ausdauerplan',
        description: 'Übungen zur Ausdauersteigerung.',
        exercises: [{duration: 450}, {duration: 900}],
        image: image_2,
    },
];

const favWorkouts: Workout[] = [
    {
        id: '2',
        name: 'Ausdauerplan',
        description: 'Übungen zur Ausdauersteigerung.',
        exercises: [{duration: 450}, {duration: 900}],
        image: image_2,
        isFavorite: true,
    },
];

const TrainingContent = () => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);
    const defaultStyles = appStyles(fontSizes, colors);

    const calculateTotalDuration = (workout: Workout): number => {
        const totalDurationInSeconds = workout.exercises.reduce((total, exercise) => {
            return total + (exercise.duration || 0);
        }, 0);
        return Math.ceil(totalDurationInSeconds / 60);
    };

    const RenderWorkout = ({item, index}: { item: Workout; index: number }) => {
        const totalDuration = calculateTotalDuration(item);
        const imageUrl = item.image;

        return (
            <WorkoutContextMenu
                isFavorite={item.isFavorite}  // Setze dies basierend darauf, ob das Workout in Favoriten ist
                onRemoveFromFavorites={() => console.log('Von Favoriten entfernen')}
                onAddToFavorites={() => console.log('Zu Favoriten hinzufügen')}
                onDeleteWorkout={() => console.log('Workout löschen')}
                onShareWorkout={() => console.log('Workout teilen')}
            >
                {/* <Animated.View entering={FadeInDown.delay(100).duration(index * 500)}>*/}
                <View style={styles.customCard}>
                    {imageUrl && (
                        <Image
                            source={imageUrl}
                            style={styles.customCardImage}
                            contentFit={"cover"}
                        />
                    )}
                    <View style={styles.customCardContent}>
                        <Text style={styles.customCardTitle} numberOfLines={1} ellipsizeMode="tail">
                            {item.name}
                        </Text>
                        <Text style={styles.customCardDescription} numberOfLines={2} ellipsizeMode="tail">
                            {item.description}
                        </Text>
                        <View style={styles.customCardFooter}>
                            <Image source={Icons.time} style={styles.customSmallIcon}/>
                            <Text style={styles.customCardDescription}>{totalDuration} Min</Text>
                            <Text style={styles.customCardDescription}> ● {item.exercises.length} Übungen</Text>
                        </View>
                    </View>
                </View>
                {/*  </Animated.View>*/}
            </WorkoutContextMenu>
        );
    };

    // Diese Funktion rendert die "+"-Card, um neue Fitnesspläne hinzuzufügen
    const RenderAddNewCard = () => {
        return (
            <TouchableOpacity style={styles.addCard} onPress={() => console.log("Neuen Fitnessplan hinzufügen")}>
                <Text style={styles.addCardText}>+</Text>
            </TouchableOpacity>
        );
    };

    // Separator zwischen den Cards für den Abstand (anstelle von marginRight)
    const Separator = () => <View style={{ width: 10 }} />;

    return (
      <>
          <Spacing top={ThemeSizes.Spacing.fromHeader - ThemeSizes.Spacing.verticalSmall}/>
          <TitleCardContainer title="Dein nächstes Workout wartet!">
              <View style={defaultStyles.descriptionContainer}>
                  <Text style={defaultStyles.description}><Text style={defaultStyles.titleDescription}>Wähle deinen Plan: </Text>
                      Finde deinen perfekten Fitnessplan oder erstelle deinen eigenen und starte sofort durch.</Text>
              </View>
          </TitleCardContainer>

          <Spacing top={0 - ThemeSizes.Spacing.verticalSmall}/>

          {/* Favoriten */}
          <TitleCardContainer title={"Favoriten"}  iconLeft={Icons.favorite_filled}>
              {/*<RenderWorkout item={item} index={index}/>*/}
              <FlatList
                  data={favWorkouts} // Favorisierte Workouts
                  renderItem={({item}) =>
                      <WorkoutCard
                          workout={item}
                          onAddToFavorites={() => console.log('Zu Favoriten hinzufügen')}
                          onRemoveFromFavorites={() => console.log('Von Favoriten entfernen')}
                          onDeleteWorkout={() => console.log('Workout löschen')}
                          onShareWorkout={() => console.log('Workout teilen')}
                          //isSmall={true}
                      />
                  }
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={Separator}
              />
          </TitleCardContainer>

          {/* Eigene Pläne */}
          <TitleCardContainer title="Meine Pläne">
              <FlatList
                  data={[...dummyWorkouts, { id: 'add-new' }]} // Workouts + "add-new"-Item
                  renderItem={({item}) =>
                      item.id !== 'add-new' ? (
                          <WorkoutCard
                              workout={item}
                              erasable={true}
                              onAddToFavorites={() => console.log('Zu Favoriten hinzufügen')}
                              onRemoveFromFavorites={() => console.log('Von Favoriten entfernen')}
                              onDeleteWorkout={() => console.log('Workout löschen')}
                              onShareWorkout={() => console.log('Workout teilen')}
                          />
                      ) : (
                          <RenderAddNewCard />
                      )
                  }
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={Separator}
              />
          </TitleCardContainer>

          {/* Alle Fitnesspläne */}
          <TitleCardContainer title={"Fitnesspläne"}>
              <FlatList
                  data={dummyWorkouts}
                  renderItem={({item}) =>
                      <WorkoutCard
                          workout={item}
                          showFavoriteIcon={false}
                          onAddToFavorites={() => console.log('Zu Favoriten hinzufügen')}
                          onRemoveFromFavorites={() => console.log('Von Favoriten entfernen')}
                          onDeleteWorkout={() => console.log('Workout löschen')}
                          onShareWorkout={() => console.log('Workout teilen')}
                      />
                  }
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={Separator}
              />
          </TitleCardContainer>
      </>
    )
}

export default TrainingContent;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        customCard: {
            backgroundColor: colors.secondary,
            //marginRight: 10,
            padding: 0,
            borderRadius: ThemeSizes.Radius.card,
            width: 200,
            elevation: 2,
        },
        customCardImage: {
            //width: '100%',
            height: 100,
            borderTopLeftRadius: ThemeSizes.Radius.card,
            borderTopRightRadius: ThemeSizes.Radius.card,
        },
        customCardContent: {
            padding: 10,
        },
        customCardTitle: {
            fontFamily: Fonts.semiBold,
            color: colors.label,
            fontSize: fontSizes.subhead,
            marginBottom: 5,
        },
        customCardDescription: {
            fontFamily: Fonts.regular,
            color: colors.secondaryLabel,
            fontSize: fontSizes.footnote,
            marginBottom: 5,
        },
        customCardFooter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        customSmallIcon: {
            width: 15,
            height: 15,
            tintColor: colors.baseColor,
            marginRight: 5,
        },
        addCard: {
            width: 200,
            //height: "100%",
            backgroundColor: colors.gray_4, // Setzt eine graue Hintergrundfarbe für die "+"-Card
            borderRadius: ThemeSizes.Radius.card,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        addCardText: {
            fontSize: 50,
            fontFamily: Fonts.semiBold,
            color: colors.label,
        },
    });
}
