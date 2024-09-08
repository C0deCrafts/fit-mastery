import {StyleSheet, View} from 'react-native';
import HumanFront from "@/components/muscleHighlighter/HumanFront";
import HumanBack from "@/components/muscleHighlighter/HumanBack";
import React from "react";

const MuscleHighlighter = () => {
    return (
        <View style={styles.container}>
            <HumanBack height={350} width={150}/>
            <HumanFront height={350} width={200}/>
        </View>
    );
};

export default MuscleHighlighter;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
});
