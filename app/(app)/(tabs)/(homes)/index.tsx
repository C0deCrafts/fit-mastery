import { View, Text, StatusBar } from 'react-native';
import CustomButton from "@/components/CustomButton";
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";
import {router} from "expo-router";
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import {useAppStyle} from "@/context/AppStyleContext";

export default function HomeIndex() {
    const {signOut} = useAuth();
    const {colorScheme} = useAppStyle();
    const statusBarStyle = colorScheme === "light" ? "dark-content" : "light-content";

    useEffect(() => {
        console.log("HOME: cangoback? ", router.canGoBack())
    }, []);


    const handleLogout = async () => {
        await signOut();
    }

    return (
        <>
            <AppSymbolBackground>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Welcome to the Chat Stack</Text>
                    <CustomButton title="Logout" onPress={handleLogout}/>
                </View>
                <StatusBar barStyle={statusBarStyle}/>
            </AppSymbolBackground>

        </>
    );
}
