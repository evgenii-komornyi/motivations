import React from 'react';
import { View, Text } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';

import { styles } from './widget-settings.styles';

export const CategoryItem = ({ data, length }) => {
    return (
        <View style={styles.categoriesContainer}>
            <CustomText style={styles.byCategory} text={`${data}: `} />
            <CustomText
                style={styles.count}
                text={`${length} phrase${length === 1 ? '' : 's'}`}
            />
        </View>
    );
};
