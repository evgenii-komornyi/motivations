import React from 'react';
import { useNavigate } from 'react-router-native';
import Tabbar from '@mindinventory/react-native-tab-bar-interaction';

// import { LinearGradient } from 'expo-linear-gradient';

// import { View, Text } from 'react-native';
// import { Icon } from '../icon/icon.component';

// import useIndexStore from '../../app/indexStore';

// import { menus } from '../../helpers/data.helper';

// import { styles } from './navigation.styles';
// import { Constants } from '../../constants/constants';
import { useTabs } from '../../hooks/useTabs';

export const Navigation = () => {
    // const { activeIndex, setActiveIndex } = useIndexStore();
    const navigate = useNavigate();
    const tabs = useTabs();

    const handleTabChange = e => {
        setTimeout(() => {
            navigate(e.path);
        }, 800);
    };

    return (
        // <LinearGradient
        //     colors={['#ffffff', '#fff']}
        //     style={styles.navigationContainer}
        // >
        //     {menus.map(({ path, title, iconType, icon }, key) => (
        //         <Link
        //             key={`${title}-${key}`}
        //             to={path}
        //             style={activeIndex === key ? styles.active : null}
        //             onPress={() => setActiveIndex(key)}
        //         >
        //             <View style={styles.navigationItemContainer}>
        //                 <Icon
        //                     type={iconType}
        //                     icon={icon}
        //                     color={activeIndex === key ? 'white' : 'black'}
        //                     size={Constants.BIGGER_ICON_SIZE}
        //                 />
        //                 <Text
        //                     style={
        //                         activeIndex === key ? styles.activeText : null
        //                     }
        //                 >
        //                     {title}
        //                 </Text>
        //             </View>
        //         </Link>
        //     ))}
        // </LinearGradient>
        <Tabbar
            tabs={tabs}
            tabBarContainerBackground="#000"
            tabBarBackground="#fff"
            activeTabBackground="#000"
            labelStyle={{ color: '#fff', fontWeight: '600', fontSize: 16 }}
            onTabChange={handleTabChange}
        />
    );
};
