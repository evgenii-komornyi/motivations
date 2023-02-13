import React from 'react';

import { View } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';

import { styles } from './common-settings.styles';

export const CommonSettings = () => {
    return (
        <View style={styles.container}>
            <CustomText style={{}} text="Soon" />
        </View>
    );
};
