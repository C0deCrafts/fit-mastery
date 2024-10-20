import React, {useRef, useState} from 'react';
import {Animated as RNAnimated} from 'react-native';
import PagerView from 'react-native-pager-view';
import SegmentedControl from "@/components/navigation/SegmentedControl";
import FocusAwareStatusBar from "@/components/header/FocusAwareStatusBar";
import Animated, {interpolate, runOnJS, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Stack} from 'expo-router';
import {ThemeSizes} from "@/constants";
import Header, {HeaderBaseProps} from "@/components/header/Header";
import AppSymbolBackground from "@/components/background/AppSymbolBackground";
import {useAppStyle} from "@/context/AppStyleContext";

interface CustomTabScreenProps extends HeaderBaseProps {
    tabs: string[]; // tab options, e.g. ["Übersicht", "Training"]
    renderContent: (tab: string) => React.ReactNode; // content for each tab, e.g. <OverviewContent /> or <TrainingContent />
}

const CustomTabScreen = (props: CustomTabScreenProps) => {
    const {colorScheme} = useAppStyle();
    const insets = useSafeAreaInsets();

    const [selectedOption, setSelectedOption] = useState(props.tabs[0]); // state for the selected tab
    const [headerIsVisible, setHeaderIsVisible] = useState(true);  // state to hide the header when scrolling

    const pagerRef = useRef<PagerView>(null); // refs for the pager view - used to switch between tabs
    const slideAnim = useRef(new RNAnimated.Value(0)).current;  // animation value to slide the segmented control and show the content of the selected tab

    const scrollRefs = props.tabs.map(() => useAnimatedRef<Animated.ScrollView>());
    const scrollHandlers = scrollRefs.map(ref => useScrollViewOffset(ref));

    /**
     * Animation for the header (show and hide the header when scrolling)
     */
    const headerAnimatedStyle = useAnimatedStyle(() => {
        // find the current index of the selected tab
        const currentIndex = props.tabs.indexOf(selectedOption);
        const currentScrollHandler = scrollHandlers[currentIndex];
        // header opacity based on the scroll offset
        const opacity = interpolate(currentScrollHandler.value, [0, 50], [1, 0]);

        // if the scroll offset is greater than 50 and the header is visible, hide the header
        if (currentScrollHandler.value > 50 && headerIsVisible) {
            runOnJS(setHeaderIsVisible)(false);
        }
        //if the scroll offset is less than or equal to 50 and the header is not visible, show the header
        else if (currentScrollHandler.value <= 50 && !headerIsVisible) {
            runOnJS(setHeaderIsVisible)(true);
        }
        return { opacity };
    }, [headerIsVisible, selectedOption]); // dependencies from the visible header and the selected tab

    /**
     * Function to handle the tab change when pressing the segmented control
     * @param option - the selected tab
     * @param index - the index of the selected tab
     */
    const handleOptionPress = (option: string, index: number) => {
        setSelectedOption(option);  // set the current tab
        pagerRef.current?.setPage(index);  // switch to the corresponding content (page/segmentscreens) in the pager view

        // start the animation to slide the segmented control
        RNAnimated.timing(slideAnim, {
            toValue: index,
            duration: 300,
            useNativeDriver: true,  // disable native driver for the animation
        }).start();
    };

    // function to handle the page change when swiping between tabs
    const handlePageChange = (e: any) => {
        const pageIndex = e.nativeEvent.position;
        setSelectedOption(props.tabs[pageIndex]); // set the current tab
    };

    // function to update the tab menu when swiping between tabs
    const handlePageScroll = (e: any) => {
        const {position, offset} = e.nativeEvent;
        slideAnim.setValue(position + offset);  // set the current tab after swiping
    };

    return (
        <>
            {/* Hide the status bar when the header is hidden */}
            {!headerIsVisible && (
                <FocusAwareStatusBar barStyle={colorScheme === "light" ? "dark-content" : "light-content"} />
            )}

            {/* Expo Stack-Navigation: Header und SegmentedControl */}
            <Stack.Screen options={{
                header: () => (
                    <Animated.View style={headerAnimatedStyle}>
                        <Header headerTitle={props.headerTitle}
                                customDropdownMenuVisible={props.customDropdownMenuVisible}
                                dropdownMenuItems={props.dropdownMenuItems}
                                onSelectItem={props.onSelectItem}
                        />
                        {/* SegmentedControl for tabs */}
                        <SegmentedControl
                            options={props.tabs}
                            selectedOption={selectedOption} // selected tab
                            onOptionPress={handleOptionPress} // tab option press handler to switch between tabs by pressing a tab (not swiping)
                            slideAnim={slideAnim}  // animation
                        />
                    </Animated.View>
                ),
            }} />

            <AppSymbolBackground>
                {/* PagerView for swiping between tabs (not tapping)*/}
                <PagerView
                    ref={pagerRef}
                    style={{ flex: 1 }} // Flex 1, for showing the content under the segmented control
                    initialPage={0}
                    onPageSelected={handlePageChange}  // update the tab menu when swiping between tabs
                    onPageScroll={handlePageScroll}  // animation
                >
                    {/* map through the tabs and show the content for each tab */}
                    {props.tabs.map((tab, index) => (
                        <Animated.ScrollView
                            ref={scrollRefs[index]} // ref for the scroll view for the current tab
                            key={tab}
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
                            {/* show the content for the current tab */}
                            {props.renderContent(tab)}
                        </Animated.ScrollView>
                    ))}
                </PagerView>
            </AppSymbolBackground>
        </>
    );
};

export default CustomTabScreen;
