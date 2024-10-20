import { Stack } from 'expo-router';

export default function ChatStackLayout() {
    return <Stack
        screenOptions={{
            headerTitle: "",
            headerTransparent: true,
        }}>
        <Stack.Screen name="index"/>
    </Stack>;
}
