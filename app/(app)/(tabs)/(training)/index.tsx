import {FlatList} from 'react-native';
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import Header from "@/components/header/Header";
import {useExercises} from "@/context/ExercisesContext";
import {useEffect} from "react";
import ExerciseItem from "@/components/ExerciseItem";

export default function TrainingIndex() {
    const {exercises} = useExercises();


    useEffect(() => {
        console.log("Exercises:", exercises);
    }, [exercises]);

    return (
        <>
            <Header title="Training"/>
            <AppSymbolBackground>
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ExerciseItem item={item} />}
                    //contentContainerStyle={styles.listContent}
                />
            </AppSymbolBackground>
        </>
    );
}
