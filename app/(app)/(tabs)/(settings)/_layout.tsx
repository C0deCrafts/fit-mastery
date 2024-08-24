import { Stack } from 'expo-router';

export default function SettingsStackLayout() {
    return <Stack screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="trainingSettings"/>
        <Stack.Screen name="userSettings"/>
        <Stack.Screen name="deleteUserModal" options={{
            presentation: "modal",
        }}/>
    </Stack>;
}
