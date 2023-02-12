import React from 'react';

import { View, ImageBackground } from 'react-native';
import { CustomText } from '../custom-text/custom-text.component';

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
                <CustomText style={styles.text} text="Soon" />
            </ImageBackground>
        </View>
    );
};
