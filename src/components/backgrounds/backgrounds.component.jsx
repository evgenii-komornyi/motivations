import React from 'react';

import { Text, View, ImageBackground } from 'react-native';

import { styles } from './backgrounds.styles';

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
