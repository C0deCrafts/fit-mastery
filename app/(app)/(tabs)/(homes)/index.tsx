import {View, Text, StatusBar} from "react-native";
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import {useAppStyle} from "@/context/AppStyleContext";
import {updateGifUrls, uploadExercisesToFirebase} from "@/utils/scripts/adminExerciseUtils";

export default function HomeIndex() {
    const {colorScheme} = useAppStyle();
    const statusBarStyle = colorScheme === "light" ? "dark-content" : "light-content";

    // Diese Funktionen müssen in eine onPress-Handler-Funktion eingebettet werden
    const handleUploadExercises = () => {
        uploadExercisesToFirebase().catch(error => console.error("Error uploading exercises:", error));
    };

    const handleUpdateGifUrls = () => {
        updateGifUrls("Brust").catch(error => console.error("Error updating GIF URLs:", error));
    };

    return (
        <>
            <AppSymbolBackground>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Welcome to the Home Stack</Text>
                    <Text onPress={handleUploadExercises}>Upload DATA</Text>
                    <Text onPress={handleUpdateGifUrls}>Update GIF URL</Text>
                </View>
                <StatusBar barStyle={statusBarStyle}/>
            </AppSymbolBackground>

        </>
    );
}
