import { useState } from 'react';
import { SceneMap, TabBar } from 'react-native-tab-view';

import { Icon } from '../../components/icon/icon.component';
import { DatabaseSettings } from '../../tabs/database-settings/database-settings.tab';
import { WidgetSettings } from '../../tabs/widget-settings/widget-settings.tab';
import { CommonSettings } from '../../tabs/common-settings/common-settings.tab';

import { Constants } from '../../constants/constants';

import { styles } from '../../components/settings/settings.styles';

export const useSettingsTabs = () => {
    const [index, onIndexChange] = useState(0);

    const [routes] = useState([
        {
            key: 'database',
            type: Constants.MATERIALCOMMUNITYICONS_ICON,
            icon: 'database-cog-outline',
        },
        {
            key: 'widget',
            type: Constants.IONICONS_ICON,
            icon: 'md-cog-outline',
        },
        {
            key: 'common',
            type: Constants.MATERIALCOMMUNITYICONS_ICON,
            icon: 'cellphone-cog',
        },
    ]);

    const renderIcon = ({ route, color }) => (
        <Icon
            type={route.type}
            icon={route.icon}
            size={Constants.MEDIUM_ICON_SIZE}
            color={color}
        />
    );

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            renderIcon={renderIcon}
            style={styles.tabbar}
        />
    );

    const renderScene = SceneMap({
        database: DatabaseSettings,
        widget: WidgetSettings,
        common: CommonSettings,
    });

    return [index, onIndexChange, routes, renderTabBar, renderScene];
};
