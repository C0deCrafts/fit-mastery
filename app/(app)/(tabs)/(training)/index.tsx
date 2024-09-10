import React, {useEffect, useRef, useState} from 'react';
import {Text, View, Animated as RNAnimated, ScrollView, StyleSheet} from 'react-native';
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import Header from "@/components/header/Header";
import {useExercises} from "@/context/ExercisesContext";
import SegmentedControl from "@/components/navigation/SegmentedControl";
import PagerView from 'react-native-pager-view';
import OverviewContent from "@/components/navigation/segmentscreens/training/OverviewContent";
import TrainingContent from "@/components/navigation/segmentscreens/training/TrainingContent";
import FocusAwareStatusBar from "@/components/header/FocusAwareStatusBar";
import {Stack} from 'expo-router';
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    withTiming
} from "react-native-reanimated";
import {useAppStyle} from "@/context/AppStyleContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Icons, ThemeSizes} from "@/constants";

/**
 * TrainingIndex Component
 * Displays a two-tabbed page with 'Übersicht' (Overview) and 'Training' content.
 * Includes a header that fades when scrolling, and a SegmentedControl for switching between tabs.
 */
const options = ["Übersicht", "Training"];

export default function TrainingIndex() {
    const {exercises} = useExercises();  // Retrieve exercises from context
    const {fontSizes, colors, colorScheme} = useAppStyle();  // Access font sizes, colors, and theme
    const styles = dynamicStyles(fontSizes, colors);

    // State to track selected tab
    const [selectedOption, setSelectedOption] = useState(options[0]);

    // Refs for PagerView and Animation
    const pagerRef = useRef<PagerView>(null);
    const slideAnim = useRef(new RNAnimated.Value(0)).current;  // Animation value for SegmentedControl

    // ScrollView Refs for both 'Übersicht' and 'Training'
    const overviewScrollRef = useAnimatedRef<Animated.ScrollView>();
    const trainingScrollRef = useAnimatedRef<Animated.ScrollView>();

    // Dynamically determine which ScrollView to use based on the current tab
    const currentScrollRef = selectedOption === options[0] ? overviewScrollRef : trainingScrollRef;
    const scrollHandler = useScrollViewOffset(currentScrollRef);

    const [headerIsVisible, setHeaderIsVisible] = useState(true);  // State to track header visibility
    const insets = useSafeAreaInsets();  // Retrieve safe area insets
    const statusBarStyle = colorScheme === "light" ? "dark-content" : "light-content";  // Dynamic status bar style

    useEffect(() => {
        console.log("Exercises:", exercises);
    }, [exercises]);

    /**
     * Handles when an option is pressed in SegmentedControl.
     * @param option - The selected option (tab)
     * @param index - The index of the selected option
     */
    const handleOptionPress = (option: string, index: number) => {
        setSelectedOption(option);
        pagerRef.current?.setPage(index);  // Switch to the corresponding page in PagerView

        // Update slide animation based on selected index
        RNAnimated.timing(slideAnim, {
            toValue: index,
            duration: 300,
            useNativeDriver: false,  // Disable native driver for layout-based animations
        }).start();
    };

    /**
     * Handles when the page is changed by swiping.
     * Updates the selected option accordingly.
     */
    const handlePageChange = (e: any) => {
        const pageIndex = e.nativeEvent.position;
        setSelectedOption(options[pageIndex]);
    };

    /**
     * Handles continuous page scroll events to animate the slide indicator.
     */
    const handlePageScroll = (e: any) => {
        const {position, offset} = e.nativeEvent;
        slideAnim.setValue(position + offset);  // Update slide animation value
    };

    // Header animation style - hides the header as the user scrolls down
    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollHandler.value, [0, 50], [1, 0]);

        // Hide the header when scrolling down
        if (scrollHandler.value > 50 && headerIsVisible) {
            runOnJS(setHeaderIsVisible)(false);
        } else if (scrollHandler.value <= 50 && !headerIsVisible) {
            runOnJS(setHeaderIsVisible)(true);
        }

        return { opacity };
    }, [headerIsVisible]);

    const handleDropdownMenuSelect = (key: string) => {
        console.log("Dropdown Menu selected:", key);
    };

    return (
        <>
            {/* Hide the status bar when the header is hidden */}
                {!headerIsVisible && <FocusAwareStatusBar barStyle={statusBarStyle} />}

                <Stack.Screen options={{
                    header: () => (
                        <Animated.View style={headerAnimatedStyle}>
                            <Header title="Training"
                                    customDropdownMenuVisible={true}
                                    customIcon={Icons.more_simple}
                                    handleCustomButtonClick={handleDropdownMenuSelect}
                            />
                            {/* SegmentedControl for switching between tabs */}
                            <SegmentedControl
                                options={options}
                                selectedOption={selectedOption}
                                onOptionPress={handleOptionPress}
                                slideAnim={slideAnim}  // Pass animation value for the slide indicator
                            />
                        </Animated.View>
                    ),
                }} />

                <AppSymbolBackground>
                    {/* PagerView to handle swipe between tabs */}
                    <PagerView
                        ref={pagerRef}
                        style={{ flex: 1 }}
                        initialPage={0}
                        onPageSelected={handlePageChange}  // Update selected option on swipe
                        onPageScroll={handlePageScroll}  // Continuously update animation on scroll
                    >
                        {/* Scrollable content for 'Übersicht' */}
                        <ScrollView
                            ref={overviewScrollRef}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            contentContainerStyle={{
                                paddingBottom: ThemeSizes.Spacing.fromBottomTabs - 20,
                                paddingHorizontal: ThemeSizes.Spacing.horizontalDefault
                            }}
                            style={{
                                marginBottom: ThemeSizes.Spacing.fromBottomTabs,
                                marginTop: insets.top,
                                paddingTop: ThemeSizes.Sizes.header - insets.top + ThemeSizes.Spacing.fromHeader + 35 + 6
                            }}
                        >
                            <OverviewContent key="1" />
                        </ScrollView>

                        {/* Scrollable content for 'Training' */}
                        <ScrollView
                            ref={trainingScrollRef}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            contentContainerStyle={{
                                paddingBottom: ThemeSizes.Spacing.fromBottomTabs - 20,
                                paddingHorizontal: ThemeSizes.Spacing.horizontalDefault
                            }}
                            style={{
                                marginBottom: ThemeSizes.Spacing.fromBottomTabs,
                                marginTop: insets.top,
                                paddingTop: ThemeSizes.Sizes.header - insets.top + ThemeSizes.Spacing.fromHeader + 35 + 6
                            }}
                        >
                            <TrainingContent key="2" />
                        </ScrollView>
                    </PagerView>
                </AppSymbolBackground>
        </>
    );
}

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.pink,
        },
        text: {
            fontSize: fontSizes.body,
            color: colors.label,
        },
    });
};
