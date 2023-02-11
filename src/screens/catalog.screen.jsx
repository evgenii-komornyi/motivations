import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { Categories } from '../components/categories/categories.component';
import { useOnBackPress } from '../hooks/useOnBackPress';

export const CatalogScreen = () => {
    useOnBackPress();

    return (
        <View style={{ flex: 8 }}>
            <Header
                containerStyle={{ backgroundColor: 'black', height: 50 }}
                centerComponent={{
                    text: 'КАТАЛОГ',
                    style: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
                }}
            />
            <Categories />
        </View>
    );
};
