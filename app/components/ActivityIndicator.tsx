import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';


interface ActivityIndicatorViewProps {
    open: boolean;
    containerStyles: object;
}

const ActivityIndicatorView = ({ open, containerStyles = {} }: ActivityIndicatorViewProps) => {
    if (!open) return null;
    return (
        <View style={[styles.container, containerStyles]}>
            <ActivityIndicator
                animating={open}
                color="white"
                size="large"
                style={styles.activityIndicator}
            />
            <Text style={styles.textStyle}>
                Syncing
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        minHeight: 50
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    textStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default ActivityIndicatorView;
