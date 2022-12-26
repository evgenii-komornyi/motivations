import React from 'react';
import { useNavigate } from 'react-router-native';
import { Dimensions, TouchableOpacity, Text } from 'react-native';

import { getCategoryTitleByName } from '../../helpers/categories.helper';

import { styles } from './categories.styles';

const screenHeight = Dimensions.get('window').height;

const math = {
    margin: {
        marginBottom: (Math.round(screenHeight) - 80 - 3 * 206) / 3,
    },
};

export const GridView = ({ data: { category } }) => {
    const navigate = useNavigate();

    return (
        <TouchableOpacity
            style={[styles.gridbox, math.margin]}
            onPress={() => navigate(`categories/${category}`)}
        >
            <Text>{getCategoryTitleByName(category)}</Text>
        </TouchableOpacity>
    );
};
