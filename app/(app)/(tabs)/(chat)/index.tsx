import { View, Text } from 'react-native';
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import Header from "@/components/header/Header";

export default function ChatIndex() {
    return (
        <>
            <Header title="Chat"/>
            <AppSymbolBackground>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Welcome to the Chat Stack</Text>
                </View>
            </AppSymbolBackground></>
    );
}
