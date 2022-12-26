import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import './src/icons/library.icon';

import { View } from 'react-native';

import { RoutesMap } from './src/routes/routes';

import { Navigation } from './src/components/navigation/navigation.component.jsx';

const App = () => {
    return (
        <NativeRouter>
            <View style={{ flex: 1 }}>
                <RoutesMap />
                <Navigation />
                <StatusBar hidden={true} />
            </View>
        </NativeRouter>
    );
};

export default App;
