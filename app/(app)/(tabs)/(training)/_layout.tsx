import { Stack } from 'expo-router';

export default function TrainingStackLayout() {
    return <Stack
        screenOptions={{
            headerTitle: "",
            headerTransparent: true,
        }}>
        <Stack.Screen name="index"/>
    </Stack>;
}
