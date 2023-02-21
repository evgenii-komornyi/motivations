import React from 'react';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

import { View } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';

import { styles } from './widget-settings.styles';

export const CategoryItem = ({ data, length }) => {
    return (
        <View style={styles.categoriesContainer}>
            <CustomText style={styles.byCategory} text={`${data.category}: `} />
            <CustomText
                style={styles.count}
                text={`${length} ${
                    Dictionary[Constants.language].strings.commons.PHRASE
                }${
                    length === 1
                        ? ''
                        : Dictionary[Constants.language].strings.commons.POSTFIX
                }`}
            />
        </View>
    );
};
