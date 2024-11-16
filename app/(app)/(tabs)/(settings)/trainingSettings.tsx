import {View, Text, StyleSheet} from 'react-native'
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import Header from "@/components/header/Header";
import {Icons, ThemeSizes} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import Card from "@/components/Card";
import {useState} from "react";
import Spacing from "@/components/spacing/Spacing";
import {appStyles} from "@/constants/Styles";

const TrainingSettings = () => {
    const {colors, fontSizes} = useAppStyle();
    const defaultStyles = appStyles(fontSizes, colors);
    const [switchValue, setSwitchValue] = useState(false)

    const toggleSwitch = async () => {
        console.log("Toggle Switch");
        setSwitchValue(previousState => !previousState);
    }

    return (
        <>
            <Header headerTitle="Trainingsdaten" backButtonVisible/>
            <AppSymbolBackground>
                <View style={defaultStyles.container}>
                    <Spacing bottom={ThemeSizes.Spacing.fromHeader}/>
                    <Card style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>
                        <View style={styles.row}>
                            <Text style={defaultStyles.titleDescription}>Körpergröße: </Text>
                            <Text style={defaultStyles.description}>173cm</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={defaultStyles.titleDescription}>Körpergewicht: </Text>
                            <Text style={defaultStyles.description}>kein Gewicht festgelegt</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={defaultStyles.titleDescription}>Körperfettanteil: </Text>
                            <Text style={defaultStyles.description}>30%</Text>
                        </View>
                    </Card>
                </View>
            </AppSymbolBackground>
        </>
    )
}

export default TrainingSettings

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
});