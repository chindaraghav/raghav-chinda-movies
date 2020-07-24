import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

interface ActivityIndicatorViewProps {
    open: boolean;
}

function ActivityIndicatorView({open}: ActivityIndicatorViewProps) {
    if (!open) {
        return null;
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={open}
                color="white"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
});

export default ActivityIndicatorView;
