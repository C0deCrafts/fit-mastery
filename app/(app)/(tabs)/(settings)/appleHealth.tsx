import {View, Text, StyleSheet} from 'react-native'
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import Header from "@/components/header/Header";
import {Icons, ThemeSizes} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import Card from "@/components/Card";
import {useState} from "react";
import Spacing from "@/components/spacing/Spacing";
import {appStyles} from "@/constants/Styles";
import {router} from "expo-router";
import TitleCardContainer from "@/components/TitleCardContainer";

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
            <Header title="Apple Health" backButtonVisible/>
            <AppSymbolBackground>
                <View style={defaultStyles.container}>
                    <Spacing bottom={ThemeSizes.Spacing.fromHeader}/>
                    <TitleCardContainer title="Synchronisiere FitMastery">
                        <View style={defaultStyles.descriptionContainer}>
                            <Text style={defaultStyles.description}><Text
                                style={defaultStyles.titleDescription}>Hinweis: </Text>
                                Hier kannst du die Daten auswählen, welche aus Apple Health übertragen oder dort gespeichert werden.</Text>
                        </View>
                        <Spacing bottom={ThemeSizes.Spacing.verticalSmall}/>
                        <Card image={Icons.steps}
                              hasSwitch
                              onSwitchValueChange={toggleSwitch}
                              switchValue={switchValue}
                              thumbColor={switchValue}
                              label="Schrittzähler aktivieren"
                        />
                    </TitleCardContainer>
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