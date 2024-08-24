import {StyleSheet, View, Text, Animated} from 'react-native'
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {useAuth} from "@/context/AuthContext";
import {Fonts, Icons, Images, ThemeSizes} from "@/constants";
import ScrollView = Animated.ScrollView;
import {useEffect, useMemo, useState} from "react";
import {userColors} from "@/utils/styleContextUtils";
import {Picker} from "@react-native-picker/picker";
import Header from "@/components/header/Header";
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import TitleCardContainer from "@/components/TitleCardContainer";
import RadioButton from "@/components/RadioButton";
import ColorPicker from "@/components/ColorPicker";
import CustomModal from "@/components/modal/CustomModal";
import {router} from "expo-router";
import {appStyles} from "@/constants/Styles";
/**
 * SettingsIndex is a page that provides a user interface for adjusting various app settings.
 * It includes sections for personal settings, training settings, and app appearance customization.
 * Users can change their profile image, modify user data, switch between dark and light modes,
 * select a base color for the app, and adjust text size.
 *
 * The component handles the following:
 * - Displaying user information, including profile image and email.
 * - Navigating to user data and training settings screens.
 * - Toggling between dark mode and light mode.
 * - Selecting a base color for the app's theme.
 * - Adjusting text size via a modal picker.
 */
const SettingsIndex = () => {
    const {colors, colorScheme, fontSizes, toggleTheme, changeBaseColor, changeFontSize} = useAppStyle();
    const {user} = useAuth();

    const [selectedFontsize, setSelectedFontsize] = useState("large_default");

    let selectedId = colorScheme === "dark" ? "1" : "2";
    const [isModalVisible, setModalVisible] = useState(false);

    const selectedColors = userColors(colors);

    useEffect(() => {
        console.log("Selected FontSize: ", selectedFontsize);
    }, [selectedFontsize]);

    const styles = dynamicStyles(fontSizes, colors);
    const defaultStyles = appStyles(fontSizes, colors);

    const handleFontSizeChange = (itemValue:string) => {
        {/*<Button title="Change Text Size" onPress={() => handleFontSizeChange(xSmall)}/>*/}
        setSelectedFontsize(itemValue);
        changeFontSize(itemValue);
    }

    const toggleModal = () => {
        console.log("Toggle Modal")
        setModalVisible(!isModalVisible);
    };

    const radioButtons = useMemo(() => ([
        {
            id: "1",
            label: "Dunkel",
            value: "dark",
            image: Images.darkmode
        },
        {
            id: '2',
            label: "Hell",
            value: "light",
            image: Images.lightmode
        }
    ]), []);

    return (
        <>
            <Header title="Einstellungen" logOutButtonVisible/>
            <AppSymbolBackground>
                <View style={defaultStyles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{
                        marginBottom: ThemeSizes.Spacing.fromBottomTabs
                    }}>
                        <Card style={styles.userCard}>
                            <Avatar pressableDisabled={true}
                                    isCameraVisible={true}
                                    imageRadius={80}
                            />
                            <View>
                                <Text style={styles.userName} numberOfLines={1} ellipsizeMode={"tail"}>Username</Text>
                                <Text style={styles.email} numberOfLines={1}
                                      ellipsizeMode={"tail"}>{user?.email?.toLowerCase()}</Text>
                            </View>
                        </Card>
                        <TitleCardContainer title="Persönliche Einstellungen">
                            <Card image={Icons.camera} label="Profilbild ändern"/>
                            <Card image={Icons.profile} label="Benutzerdaten ändern" onPress={()=> router.push("/(tabs)/userSettings")} clickable/>
                        </TitleCardContainer>
                        <TitleCardContainer title="Trainings-Einstellungen">
                            <Card image={Icons.heartbeat} label="Trainingsdaten ändern" onPress={()=> router.push("/(tabs)/trainingSettings")} clickable/>
                        </TitleCardContainer>
                        <TitleCardContainer title="App-Erscheinungsbild">
                            <View style={defaultStyles.descriptionContainer}>
                                <Text style={defaultStyles.description}><Text style={defaultStyles.titleDescription}>Dark Mode / Light
                                    Mode: </Text>
                                    Wechsle zwischen dem Dark Mode und Light Mode, um das Erscheinungsbild der App
                                    anzupassen.</Text>
                            </View>
                            <Card style={{
                                justifyContent: "center",
                            }}>
                                <View style={styles.radioGroupContainer}>
                                    {radioButtons.map((button) => (
                                        <RadioButton
                                            key={button.id}
                                            button={button}
                                            isSelected={selectedId === button.id}
                                            onPress={toggleTheme}
                                        />

                                    ))}
                                </View>
                            </Card>
                            <View style={defaultStyles.descriptionContainer}>
                                <Text style={defaultStyles.description}><Text style={defaultStyles.titleDescription}>Appfarbe: </Text>
                                    Wähle eine Basisfarbe für die App. Diese Farbe wird für bestimmte Elemente in der
                                    App verwendet.</Text>
                            </View>
                            <Card>
                                <ScrollView horizontal={true}
                                            showsHorizontalScrollIndicator={false} bounces={true}>
                                    {selectedColors.map((value, index) => (
                                        <View key={index} style={{marginHorizontal: 5}}>
                                            <ColorPicker
                                                color={value} // Hier wird der Farbwert verwendet
                                                onPress={() => changeBaseColor(value)} // Aktion beim Drücken
                                            />
                                        </View>
                                    ))}
                                </ScrollView>
                            </Card>
                            <Card image={Icons.fontsize} label="Ändere Textgröße" onPress={toggleModal}
                                  clickable={true}/>
                        </TitleCardContainer>
                        <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
                            <Text style={styles.modalText}>Wähle deine gewünschte Textgröße aus:</Text>
                            <Picker selectedValue={selectedFontsize}
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(itemValue)=> {
                                        handleFontSizeChange(itemValue);
                                    }}
                            >
                                <Picker.Item label="xSmall" value="xSmall"/>
                                <Picker.Item label="Small" value="small"/>
                                <Picker.Item label="Medium" value="medium"/>
                                <Picker.Item label="Large (Default)" value="large_default"/>
                                <Picker.Item label="xLarge" value="xLarge"/>
                                <Picker.Item label="xxLarge" value="xxLarge"/>
                            </Picker>
                        </CustomModal>
                    </ScrollView>
                </View>
            </AppSymbolBackground>
        </>
    );
}

export default SettingsIndex

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        userName: {
            fontSize: fontSizes.body,
            fontFamily: Fonts.semiBold,
            color: colors.label,
            width: 300,
        },
        email: {
            fontSize: fontSizes.footnote,
            fontFamily: Fonts.regular,
            color: colors.label,
            width: 300,
        },
        userCard: {
            backgroundColor: "transparent",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
            marginTop: ThemeSizes.Spacing.fromHeader,
        },
        radioGroupContainer: {
            flexDirection: "row",
            //justifyContent: "space-evenly",
            gap: 90,
        },
        modalText: {
            fontSize: fontSizes.body,
            textAlign: "center",
            color: colors.label
        },
        pickerItem: {
            color: colors.label,
            fontSize: fontSizes.title2,
        }
    });
}