import React, { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Button,
    PermissionsAndroid,
} from 'react-native';

const image = require('../../../assets/backgrounds/0.jpg');

export const Backgrounds = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={image}
                style={styles.image}
                resizeMode="cover"
            >
                <Text style={styles.text}>Soon</Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 8,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});
