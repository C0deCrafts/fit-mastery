import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAppStyle} from "@/context/AppStyleContext";
import {Colors, FontSize} from "@/constants/types/styleTypes";

const AllChatsContent = () => {
    const {fontSizes, colors} = useAppStyle();
    const styles = dynamicStyles(fontSizes, colors);

    return (
        <View style={styles.container}>
            <Text>All Chats</Text>
        </View>
    );
};

export default AllChatsContent;

const dynamicStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        }
    });
};
