import * as React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
/**
 * FocusAwareStatusBar is a custom StatusBar component that only renders the StatusBar
 * when the current screen is focused. This allows you to have diverse status bar styles
 * for different screens in your app.
 *
 * @param {StatusBarProps} props - The properties passed to the StatusBar component, such as style, backgroundColor, etc.
 *
 * Usage Example:
 *
 * <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
 *
 * This will show a light-content StatusBar with a purple background only when the screen is focused.
 */
const FocusAwareStatusBar = (props: StatusBarProps) => {
    const isFocused = useIsFocused(); // Hook to check if the current screen is focused

    // Render the StatusBar only when the screen is focused
    return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar;