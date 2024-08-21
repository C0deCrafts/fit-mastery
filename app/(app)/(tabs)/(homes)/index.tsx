import { View, Text } from 'react-native';
import CustomButton from "@/components/CustomButton";
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";
import {router} from "expo-router";

export default function HomeIndex() {
    const {signOut} = useAuth();

    useEffect(() => {
        console.log("HOME: cangoback? ", router.canGoBack())
    }, []);


    const handleLogout = async () => {
        await signOut();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the Chat Stack</Text>
            <CustomButton title="Logout" onPress={handleLogout}/>
        </View>
    );
}
