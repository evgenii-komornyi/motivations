import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import { PermissionsAndroid, View } from 'react-native';

import { RoutesMap } from './src/routes/routes';

import { Navigation } from './src/components/navigation/navigation.component.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
    const requestPermission = async () => {
        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            ]);
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <SafeAreaProvider>
            <NativeRouter>
                <View style={{ flex: 1 }}>
                    <RoutesMap />
                    <Navigation />
                    <StatusBar hidden={true} />
                </View>
            </NativeRouter>
        </SafeAreaProvider>
    );
};

export default App;
