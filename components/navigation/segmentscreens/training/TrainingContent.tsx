import {StyleSheet, View, Text, ScrollView} from 'react-native'
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import TitleCardContainer from "@/components/TitleCardContainer";
import Card from "@/components/Card";
import {Icons} from "@/constants";

const TrainingContent = () => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    return (
        <TitleCardContainer title="Persönliche Einstellungen">
            <Card image={Icons.profile} label="Kontodetails"
                  //onPress={() => router.push("/(tabs)/userSettings")} clickable
            />
        </TitleCardContainer>
    )
}

export default TrainingContent;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
    });
}
