import { useEffect } from 'react';
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
            Alert.alert('Выход', 'Вы точно хотите выйти из приложения?', [
                {
                    text: 'Нет',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Да', onPress: () => BackHandler.exitApp() },
            ]);
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
