import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import './src/icons/library.icon';

import { View, NativeModules } from 'react-native';

import { useUserIdStore } from './src/app/userIdStore';
import { RoutesMap } from './src/routes/routes';

import { Navigation } from './src/components/navigation/navigation.component.jsx';

const DeviceInfo = NativeModules.DeviceInfoOwn;

const App = () => {
    const { setUserId } = useUserIdStore();

    useEffect(() => {
        DeviceInfo.getPhoneID()
            .then(id => setUserId(id))
            .catch(e => console.log(e));
    }, []);

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
