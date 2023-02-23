import { useEffect } from 'react';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { useNavigate, useLocation } from 'react-router-native';

export const useOnBackPress = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const backPressHandler = () => {
        if (location.key !== 'default') {
            navigate(-1);
        } else {
            Alert.alert(
                Dictionary[Constants.language].strings.alerts.EXIT,
                Dictionary[Constants.language].strings.alerts.EXIT_QUESTION +
                    '?',
                [
                    {
                        text: Dictionary[Constants.language].buttons.NO,
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: Dictionary[Constants.language].buttons.YES,
                        onPress: () => BackHandler.exitApp(),
                    },
                ]
            );
        }

        return true;
    };

    useEffect(() => {
        const backHander = BackHandler.addEventListener(
            'hardwareBackPress',
            backPressHandler
        );
        return () => {
            backHander.remove();
        };
    }, []);
};
