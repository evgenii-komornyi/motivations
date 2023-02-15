import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';

import { styles } from './common-settings.styles';

export const CategoryItem = ({ data }) => {
    return (
        <View style={styles.categoriesContainer}>
            <CustomText style={{}} text={data.category} />
        </View>
    );
};
