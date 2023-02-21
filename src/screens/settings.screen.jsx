import React from 'react';
import { useNavigate } from 'react-router-native';
import { Constants } from '../constants/constants';

import { Header } from 'react-native-elements';
import { Pressable } from 'react-native';
import { Icon } from '../components/icon/icon.component';

import { Settings } from '../components/settings/settings.component';

import { useOnBackPress } from '../hooks/common/useOnBackPress.hook';

import { styles } from '../styles/globalStyle';
import { Dictionary } from '../constants/dictionary';

export const SettingsScreen = () => {
    useOnBackPress();
    const navigate = useNavigate();

    return (
        <>
            <Header
                containerStyle={{
                    backgroundColor: 'black',
                    height: 50,
                }}
                leftComponent={
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgba(255, 165, 0, 1)'
                                    : 'transparent',
                            },
                            styles.button,
                        ]}
                        onPress={() => navigate(-1)}
                    >
                        <Icon
                            type={Constants.IONICONS_ICON}
                            icon="arrow-back"
                            size={Constants.SMALL_ICON_SIZE}
                            color="white"
                        />
                    </Pressable>
                }
                centerComponent={{
                    text: Dictionary[
                        Constants.language
                    ].strings.tabs.SETTINGS.toUpperCase(),
                    style: {
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                }}
            />
            <Settings />
        </>
    );
};
