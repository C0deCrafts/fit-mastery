import {StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {useAuth} from "@/context/AuthContext";
import TitleCardContainer from "@/components/TitleCardContainer";
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts, ThemeSizes} from "@/constants";
import {router} from "expo-router";
import {appStyles} from "@/constants/Styles";
import Spacing from "@/components/spacing/Spacing";
import {Loading} from "@/components/Loading";
import {useEffect} from "react";

const DeleteUserModal = () => {
    const {colors, fontSizes} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);
    const defaultStyles = appStyles(fontSizes, colors);
    const {user, deleteUserData, isLoading} = useAuth();

    useEffect(() => {
        console.log("User: ", user);
        console.log("User: ", user?.email);
    }, []);

    // Handle user deletion
    const handleDeleteUser = async () => {
        Alert.prompt(
            "Authentifizieren",
            "Bitte gib dein Passwort ein, um das Löschen deines Kontos zu bestätigen.",
            [
                {
                    text: "Abbrechen",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async (password: string | undefined) => {
                        if(user?.email && password){
                            await deleteUserData(user?.email, password).then(() => {
                                Alert.alert("Hinweis", "Dein Konto wurde erfolgreich gelöscht.");
                            }).catch((error) => {
                                Alert.alert("Fehler", "Beim Löschen des Kontos ist ein Fehler aufgetreten.");
                                console.error("Error deleting user: ", error);
                            });
                        } else {
                            Alert.alert("Hinweis", "Bitte gib dein Passwort ein, um fortzufahren.");
                        }
                    },
                },
            ],
            'secure-text' // This will render the input as a password field on iOS
        );
    };

    return (
        <View style={[defaultStyles.container, {backgroundColor: colors.primary}]}>
            <View style={styles.topBar}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                //style={{marginBottom: ThemeSizes.Spacing.fromBottomTabs}}
            >
                <TitleCardContainer
                    title="Bist du dir sicher, dass du dein Benutzerkonto wirklich löschen möchtest?"
                >
                    {/* Description of the consequences of account deletion */}
                    <View style={defaultStyles.descriptionContainer}>
                        <Text style={defaultStyles.description}>
                            Bitte beachte, dass <Text style={defaultStyles.titleDescription}>alle deine Daten
                            unwiderruflich gelöscht werden</Text>,
                            sobald du diesen Schritt bestätigst. Dazu gehören deine Fortschritte, Trainingspläne,
                            Ernährungsprotokolle und alle anderen persönlichen Informationen, die du in unserer App
                            gespeichert hast. Einmal gelöscht, gibt es <Text style={defaultStyles.titleDescription}>keine
                            Möglichkeit</Text>,
                            diese Daten wiederherzustellen.
                        </Text>
                    </View>
                    <View style={defaultStyles.descriptionContainer}>
                        <Text style={defaultStyles.description}>
                            Außerdem bedeutet dies, dass du dich <Text style={defaultStyles.titleDescription}>nicht
                            mehr mit deinem aktuellen Konto anmelden</Text> kannst und keinen Zugang mehr zu den
                            Funktionen und Vorteilen unserer App haben wirst, die dir bisher geholfen haben, deine
                            Fitnessziele zu erreichen.
                        </Text>
                    </View>
                    <View style={defaultStyles.descriptionContainer}>
                        <Text style={defaultStyles.description}>
                            Wir würden es wirklich bedauern, dich als wertvolles Mitglied unserer Community zu
                            verlieren. Hast du vielleicht noch Fragen oder Anliegen, die wir klären können?
                            Vielleicht gibt es eine andere Lösung, die besser für dich ist, als dein Konto zu
                            löschen. Unser Support-Team steht dir jederzeit zur Verfügung, um dir zu helfen.
                        </Text>
                    </View>
                    <Text style={defaultStyles.titleDescription}>Bist du sicher, dass du dein Konto
                        unwiderruflich löschen möchtest?</Text>
                    <Spacing bottom={ThemeSizes.Spacing.titleSpacingBottom}/>
                    <Text style={defaultStyles.description}>Wenn ja, dann klicke auf „Bestätigen“.
                        Wenn nicht, klicke auf „Abbrechen“ und lass uns gemeinsam nach einer besseren Lösung
                        suchen.
                    </Text>
                </TitleCardContainer>
                {/* Buttons for cancel and delete actions */}
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => router.dismissAll()}
                    >
                        <Text style={styles.link}>Abbrechen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteUser}>
                        <Text style={styles.link}>Bestätigen</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {isLoading && <Loading/>}
        </View>
    );
};

export default DeleteUserModal;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        topBar: {
            height: 5,
            backgroundColor: colors.baseColor,
            borderRadius: 2,
            width: "20%",
            marginVertical: ThemeSizes.Spacing.verticalSmall,
            alignSelf: "center",
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: ThemeSizes.Spacing.extraLarge,
        },
        link: {
            fontSize: fontSizes.title3,
            fontFamily: Fonts.semiBold,
            color: colors.baseColor,
        },
    });
};
