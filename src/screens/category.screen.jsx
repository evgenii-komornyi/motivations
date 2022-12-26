import React from 'react';
import { View } from 'react-native';

import { MotivationsByCategory } from '../components/motivations-by-category/motivations-by-category.component';
import { useOnBackPress } from '../hooks/useOnBackPress';

export const CategoryScreen = () => {
    useOnBackPress();

    return (
        <View style={{ flex: 8 }}>
            <MotivationsByCategory />
        </View>
    );
};
