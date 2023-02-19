import React, { useEffect } from 'react';

import { TabView } from 'react-native-tab-view';
import { useMotivationsStore } from '../../app/motivationsStore';
import { useSettingsStore } from '../../app/settingsStore';
import { useSettingsTabs } from '../../hooks/useSettingsTabs';

export const Settings = () => {
    const [index, onIndexChange, routes, renderTabBar, renderScene] =
        useSettingsTabs();

    const { fetchAllMotivations } = useMotivationsStore();
    const { fetchAllActiveMotivations, activeMotivations } = useSettingsStore();

    useEffect(() => {
        let isLoaded = false;

        if (!isLoaded) {
            fetchAllActiveMotivations();
            fetchAllMotivations();
            isLoaded = true;
        }
    }, [activeMotivations]);

    return (
        <TabView
            lazy
            navigationState={{
                index,
                routes,
            }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={onIndexChange}
        />
    );
};
