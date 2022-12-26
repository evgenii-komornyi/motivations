import React from 'react';
import { View } from 'react-native';
import { Categories } from '../components/categories/categories.component';
import { useOnBackPress } from '../hooks/useOnBackPress';

export const CatalogScreen = () => {
    useOnBackPress();

    return (
        <View style={{ flex: 8 }}>
            <Categories />
        </View>
    );
};
