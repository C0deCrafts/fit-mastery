import {View, Text, StatusBar} from "react-native";
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import {useAppStyle} from "@/context/AppStyleContext";

export default function HomeIndex() {
    const {colorScheme} = useAppStyle();
    const statusBarStyle = colorScheme === "light" ? "dark-content" : "light-content";

    return (
        <>
            <AppSymbolBackground>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Welcome to the Home Stack</Text>
                </View>
                <StatusBar barStyle={statusBarStyle}/>
            </AppSymbolBackground>

        </>
    );
}
