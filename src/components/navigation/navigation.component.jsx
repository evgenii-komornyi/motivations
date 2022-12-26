import React from 'react';
import { Link } from 'react-router-native';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import useIndexStore from '../../app/indexStore';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { styles } from './navigation.styles';

import { menus } from '../../helpers/data.helper';

export const Navigation = () => {
    const { activeIndex, setActiveIndex } = useIndexStore();

    return (
        <LinearGradient
            colors={['#ffffff', '#fff']}
            style={styles.navigationContainer}
        >
            {menus.map(({ path, title, iconType, icon }, key) => (
                <Link
                    key={`${title}-${key}`}
                    to={path}
                    style={activeIndex === key ? styles.active : null}
                    onPress={() => setActiveIndex(key)}
                >
                    <View style={styles.navigationItemContainer}>
                        <FontAwesomeIcon
                            icon={`fa-${iconType} fa-${icon}`}
                            color={activeIndex === key ? 'white' : 'black'}
                            size={32}
                        />
                        <Text
                            style={
                                activeIndex === key ? styles.activeText : null
                            }
                        >
                            {title}
                        </Text>
                    </View>
                </Link>
            ))}
        </LinearGradient>
    );
};
