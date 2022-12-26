import React from 'react';
import { View } from 'react-native';

import { WidgetSettings } from '../components/widget-settings/widget-settings.component';

import { useOnBackPress } from '../hooks/useOnBackPress';

export const WidgetSettingsScreen = () => {
    useOnBackPress();

    return (
        <View style={{ flex: 8 }}>
            <WidgetSettings />
        </View>
    );
};
