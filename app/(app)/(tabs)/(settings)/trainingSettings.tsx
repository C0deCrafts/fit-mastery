import {View, Text} from 'react-native'
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
            <Header title="Trainingsdaten" backButtonVisible/>
            <AppSymbolBackground>
                <View style={defaultStyles.container}>
                    <Spacing bottom={ThemeSizes.Spacing.fromHeader}/>
                    <View style={defaultStyles.descriptionContainer}>
                        <Text style={defaultStyles.description}><Text style={defaultStyles.titleDescription}>Hinweis: </Text>
                            Der Schrittzähler verwendet Daten von Apple Health.
                            Um diese Funktion zu nutzen, stelle sicher, dass Apple Health auf deinem iPhone aktiviert und
                            richtig eingestellt ist.</Text>
                    </View>
                    <Spacing bottom={ThemeSizes.Spacing.verticalSmall}/>
                    <Card image={Icons.steps}
                          hasSwitch
                          onSwitchValueChange={toggleSwitch}
                          switchValue={switchValue}
                          thumbColor={switchValue}
                          label="Schrittzähler aktivieren"
                    />
                </View>
            </AppSymbolBackground>
        </>
    )
}

export default TrainingSettings