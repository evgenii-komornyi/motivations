import React from 'react';

import { TabView } from 'react-native-tab-view';
import { useSettingsTabs } from '../../hooks/useSettingsTabs';

export const Settings = () => {
    const [index, onIndexChange, routes, renderTabBar, renderScene] =
        useSettingsTabs();

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
