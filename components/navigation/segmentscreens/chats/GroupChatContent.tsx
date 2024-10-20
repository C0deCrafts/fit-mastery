import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";

const GroupChatContent = () => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    return (
        <View style={styles.container}>
            <Text>Group Chats</Text>
        </View>
    );
};

export default GroupChatContent;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        }
    });
};
