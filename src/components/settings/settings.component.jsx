import React, { useEffect } from 'react';

import { TabView } from 'react-native-tab-view';

import { useMotivationsStore } from '../../app/motivationsStore';
import { useSettingsStore } from '../../app/settingsStore';
import { useSettingsTabs } from '../../hooks/common/useSettingsTabs.hook';

export const Settings = () => {
    const [index, onIndexChange, routes, renderTabBar, renderScene] =
        useSettingsTabs();

    const { fetchAllMotivations } = useMotivationsStore();
    const { fetchAllActiveMotivations, fetchAllCategories } =
        useSettingsStore();

    useEffect(() => {
        fetchAllActiveMotivations();
        fetchAllMotivations();
        fetchAllCategories();
    }, [index]);

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
