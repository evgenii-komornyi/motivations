import React from 'react';
import { useNavigate } from 'react-router-native';
import Tabbar from '@mindinventory/react-native-tab-bar-interaction';

import { useTabs } from '../../hooks/useTabs';

export const Navigation = () => {
    const navigate = useNavigate();
    const tabs = useTabs();

    const handleTabChange = e => {
        setTimeout(() => {
            navigate(e.path);
        }, 100);
    };

    return (
        <Tabbar
            tabs={tabs}
            tabBarContainerBackground="#000"
            tabBarBackground="#fff"
            activeTabBackground="#000"
            labelStyle={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
            onTabChange={handleTabChange}
            transitionSpeed={100}
        />
    );
};
