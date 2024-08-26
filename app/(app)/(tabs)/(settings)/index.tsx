import {StyleSheet, View, Text} from 'react-native'
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
import RadioButton from "@/components/buttons/RadioButton";
import ColorPicker from "@/components/buttons/ColorPicker";
import CustomModal from "@/components/modal/CustomModal";
import {Stack, router} from "expo-router";
import {appStyles} from "@/constants/Styles";
import Animated, {
    interpolate, runOnJS,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    withTiming,
} from "react-native-reanimated";
import ScrollToTopButton from "@/components/buttons/ScrollToTopButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import FocusAwareStatusBar from "@/components/header/FocusAwareStatusBar";

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
    const {
        colors,
        colorScheme,
        fontSizes,
        currentFontSize,
        toggleTheme,
        changeBaseColor,
        changeFontSize
    } = useAppStyle();
    const {user} = useAuth();

    const [selectedFontsize, setSelectedFontsize] = useState("large_default");

    let selectedId = colorScheme === "dark" ? "1" : "2";
    const [isModalVisible, setModalVisible] = useState(false);

    const selectedColors = userColors(colors);

    useEffect(() => {
        setSelectedFontsize(currentFontSize);
    }, [currentFontSize]);

    const styles = dynamicStyles(fontSizes, colors);
    const defaultStyles = appStyles(fontSizes, colors);

    const handleFontSizeChange = (itemValue: string) => {
        setSelectedFontsize(itemValue);
        changeFontSize(itemValue);
        toggleModal();
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

    const insets = useSafeAreaInsets();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollHandler = useScrollViewOffset(scrollRef);

    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: scrollHandler.value > 100 ? withTiming(1) : withTiming(0),
        };
    });

    const scrollTop = () => {
        scrollRef.current?.scrollTo({x: 0, y: 0, animated: true})
    }

    const [headerIsVisible, setHeaderIsVisible] = useState(true);
    const statusBarStyle = colorScheme === "light" ? "dark-content" : "light-content";

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollHandler.value, [0, 50], [1, 0]);

        if (scrollHandler.value > 50 && headerIsVisible) {
            runOnJS(setHeaderIsVisible)(false);
        } else if (scrollHandler.value <= 50 && !headerIsVisible) {
            runOnJS(setHeaderIsVisible)(true);
        }

        return {
            opacity,
        };
    }, [headerIsVisible]);


    return (
        <>
            {!headerIsVisible &&<FocusAwareStatusBar barStyle={statusBarStyle}/>}
            <Stack.Screen options={{
                header: () => (
                    <Animated.View style={headerAnimatedStyle}>
                        <Header title="Einstellungen" logOutButtonVisible/>
                    </Animated.View>
                ),
            }}
            />
            <AppSymbolBackground>
                <View style={defaultStyles.container}>
                    <ScrollView ref={scrollRef}
                                showsVerticalScrollIndicator={false}
                                bounces={true}
                                contentContainerStyle={{
                                    paddingBottom: ThemeSizes.Spacing.fromBottomTabs - 20,
                                }}
                                style={{
                                    marginBottom: ThemeSizes.Spacing.fromBottomTabs,
                                    marginTop: insets.top,
                                    paddingTop: insets.top,
                    }}
                    >
                        <Card style={styles.userCard}>
                            <Avatar pressableDisabled={false}
                                    isCameraVisible={false}
                                    imageRadius={80}
                            />
                            <View>
                                <Text style={styles.userName} numberOfLines={1}
                                      ellipsizeMode={"tail"}>{user?.displayName}</Text>
                                <Text style={styles.email} numberOfLines={1}
                                      ellipsizeMode={"tail"}>{user?.email?.toLowerCase()}</Text>
                            </View>
                        </Card>
                        <TitleCardContainer title="Persönliche Einstellungen">
                            <Card image={Icons.camera} label="Profilbild ändern"/>
                            <Card image={Icons.profile} label="Kontodetails"
                                  onPress={() => router.push("/(tabs)/userSettings")} clickable/>
                        </TitleCardContainer>
                        <TitleCardContainer title="Trainings-Einstellungen">
                            <Card image={Icons.apple} label="Apple Health"
                                  onPress={() => router.push("/(tabs)/appleHealth")} clickable/>
                            <Card image={Icons.heartbeat} label="Trainingsdaten ändern"
                                  onPress={() => router.push("/(tabs)/trainingSettings")} clickable/>
                        </TitleCardContainer>
                        <TitleCardContainer title="App-Erscheinungsbild">
                            <View style={defaultStyles.descriptionContainer}>
                                <Text style={defaultStyles.description}><Text style={defaultStyles.titleDescription}>Dark
                                    Mode / Light
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
                                <Text style={defaultStyles.description}><Text
                                    style={defaultStyles.titleDescription}>Appfarbe: </Text>
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
                                    onValueChange={(itemValue) => {
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
                    <ScrollToTopButton buttonStyle={buttonStyle} onPress={scrollTop}/>
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
            //backgroundColor: "yellow",
            backgroundColor: "transparent",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
            marginTop: ThemeSizes.Spacing.fromHeader,
        },
        radioGroupContainer: {
            flexDirection: "row",
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