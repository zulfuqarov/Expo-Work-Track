import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';

const Loading = () => {
    const rotateValue = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
        rotateValue.setValue(0);
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    useEffect(() => {
        startRotation();
    }, []); // Sadece bir kez çalışır ve refresh sonrası da sorunsuz başlar.

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <View style={styles.loaderContainer}>
                <Animated.View
                    style={[
                        styles.spinner,
                        { transform: [{ rotate }] },
                    ]}
                />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#FFA500',
        borderTopColor: 'transparent',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#FFA500',
    },
});

export default Loading;
