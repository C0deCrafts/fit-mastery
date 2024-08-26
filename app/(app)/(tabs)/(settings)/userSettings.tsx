import {StyleSheet, View, Text} from 'react-native'
import Header from "@/components/header/Header";
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import TitleCardContainer from "@/components/TitleCardContainer";
import {Icons} from "@/constants";
import {useAppStyle} from "@/context/AppStyleContext";
import Card from "@/components/Card";
import {router, } from "expo-router";
import {appStyles} from "@/constants/Styles";
import {useAuth} from "@/context/AuthContext";

const UserSettings = () => {
    const {colors, fontSizes} = useAppStyle();
    const defaultStyles = appStyles(fontSizes, colors);
    const {user} = useAuth();

    const handleDelete = () => {
        router.push("/(tabs)/deleteUserModal")
    }

    return (
    <>
        <Header title="Benutzerdaten" backButtonVisible/>
        <AppSymbolBackground>
            <View style={defaultStyles.container}>
                <TitleCardContainer title={"Benutzerdaten"}>
                    <View style={styles.row}>
                        <Text style={defaultStyles.titleDescription}>E-Mail: </Text>
                        <Text style={defaultStyles.description}>{user?.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={defaultStyles.titleDescription}>Benutzername: </Text>
                        <Text style={defaultStyles.description}>{user?.displayName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={defaultStyles.titleDescription}>Geschlecht: </Text>
                        <Text style={defaultStyles.description}>weiblich</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={defaultStyles.titleDescription}>Geburtsdatum: </Text>
                        <Text style={defaultStyles.description}>23.04.1989</Text>
                    </View>
                </TitleCardContainer>
                <TitleCardContainer title="Einstellungen ändern">
                    <View style={defaultStyles.descriptionContainer}>
                        <Text style={defaultStyles.description}><Text style={defaultStyles.titleDescription}>Hinweis: </Text>
                            Aktuell sind die unten angeführten Funktionen noch nicht freigeschaltet.
                            Du wirst informiert, sobald diese Funktionen zur Verfügung stehen.</Text>
                    </View>
                    <Card image={Icons.text} label="Benutzername ändern"/>
                    <Card image={Icons.camera} label="Profilfoto löschen"/>
                    <Card image={Icons.weight} label="Aktuelles Gewicht ändern"/>
                    <Card image={Icons.trash} label="Benutzerkonto löschen" onPress={handleDelete} clickable/>
                </TitleCardContainer>
            </View>
        </AppSymbolBackground>
    </>
  )
}

export default UserSettings

const styles = StyleSheet.create({
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
        }
});