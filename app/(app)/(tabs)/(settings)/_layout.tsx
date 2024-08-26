import {Stack} from 'expo-router';

export default function SettingsStackLayout() {
    return <Stack
        screenOptions={{
            headerTitle: "",
            headerTransparent: true,
        }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="trainingSettings" options={{headerShown: false}}/>
        <Stack.Screen name="appleHealth" options={{headerShown: false}}/>
        <Stack.Screen name="userSettings" options={{headerShown: false}}/>
        <Stack.Screen name="deleteUserModal" options={{
            presentation: "modal",
        }}/>
    </Stack>;
}
