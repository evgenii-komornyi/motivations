import React from 'react';
import { useNavigate } from 'react-router-native';

import { Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { CustomText } from '../custom-text/custom-text.component';

import { styles } from './categories.styles';

const screenHeight = Dimensions.get('window').height;

const math = {
    margin: {
        marginBottom: (Math.round(screenHeight) - 80 - 50 - 3 - 3 * 190) / 3,
    },
};

export const GridView = ({ data: { id, category, image } }) => {
    const navigate = useNavigate();

    return (
        <TouchableOpacity
            style={[styles.gridbox, math.margin]}
            onPress={() => navigate(`categories/${id}`)}
        >
            <ImageBackground
                source={image}
                imageStyle={{ borderRadius: 10 }}
                style={styles.image}
                resizeMode="cover"
            >
                <CustomText style={styles.text} text={category} />
            </ImageBackground>
        </TouchableOpacity>
    );
};
