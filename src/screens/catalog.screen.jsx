import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

import { Categories } from '../components/categories/categories.component';
import { Constants } from '../constants/constants';
import { Dictionary } from '../constants/dictionary';

import { useOnBackPress } from '../hooks/common/useOnBackPress.hook';

export const CatalogScreen = () => {
    useOnBackPress();

    return (
        <View style={{ flex: 8 }}>
            <Header
                containerStyle={{ backgroundColor: 'black', height: 50 }}
                centerComponent={{
                    text: Dictionary[
                        Constants.language
                    ].strings.tabs.CATALOG.toUpperCase(),
                    style: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
                }}
            />
            <Categories />
        </View>
    );
};
