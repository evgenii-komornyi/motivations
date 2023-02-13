import React from 'react';
import { useNavigate } from 'react-router-native';

import { Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { CustomText } from '../custom-text/custom-text.component';

import { getCategoryTitleByName } from '../../helpers/categories.helper';

import { styles } from './categories.styles';

const screenHeight = Dimensions.get('window').height;

const math = {
    margin: {
        marginBottom: (Math.round(screenHeight) - 80 - 50 - 3 - 3 * 190) / 3,
    },
};

export const GridView = ({ data: { category } }) => {
    const navigate = useNavigate();

    const { text, image } = getCategoryTitleByName(category);

    return (
        <TouchableOpacity
            style={[styles.gridbox, math.margin]}
            onPress={() => navigate(`categories/${category}`)}
        >
            <ImageBackground
                source={image}
                imageStyle={{ borderRadius: 10 }}
                style={styles.image}
                resizeMode="cover"
            >
                <CustomText style={styles.text} text={text} />
            </ImageBackground>
        </TouchableOpacity>
    );
};
