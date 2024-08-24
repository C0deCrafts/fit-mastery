import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {useAppStyle} from "@/context/AppStyleContext";

/**
 * Loading is a reusable component that renders a loading indicator.
 * The loading indicator is displayed in the center of the screen with a semi-transparent background.
 *
 * @example
 * <Loading/>
 */
export const Loading = () => {
    const {colorScheme} = useAppStyle();
    const backgroundColor = colorScheme === "light" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
    const color = colorScheme === "light" ? "#000" : "#fff";
    return (
        <View style={{
            // @ts-ignore
            ...StyleSheet.absoluteFill,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColor
        }}>
            <ActivityIndicator size="large" color={color} />
        </View>
    );
};