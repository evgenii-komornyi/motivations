import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Pressable } from 'react-native';

import { useWidgetStore } from '../../app/widgetStore';
import { useUserIdStore } from '../../app/userIdStore';
import { useCancelToken } from '../../hooks/useCancelToken';

import { Loader } from '../loader/loader.component';
import { loaders } from '../../helpers/loader.helper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { styles } from './widget-settings.styles';

let timeout;

export const WidgetSettings = () => {
    const [isSending, setIsSending] = useState(false);
    const { userId } = useUserIdStore();
    const {
        sendToWidget,
        fetchAllActiveMotivations,
        isLoaded,
        activeMotivations,
    } = useWidgetStore();
    const { newCancelToken, isCancel } = useCancelToken();

    useEffect(() => {
        fetchAllActiveMotivations(newCancelToken(), isCancel, userId);

        return () => clearTimeout(timeout);
    }, [newCancelToken, isCancel, fetchAllActiveMotivations]);

    const onSendToWidgetHandler = () => {
        if (activeMotivations.length === 0) {
            Alert.alert(
                'Ошибка',
                'Вы пытаетесь сконфигурировать виджет данными, которых у вас нет. Добавьте фразы и попробуйте снова.',
                [
                    {
                        text: 'Ок',
                        onPress: () => null,
                        style: 'cancel',
                    },
                ]
            );
        } else {
            setIsSending(true);
            sendToWidget();

            timeout = setTimeout(() => {
                !isSending &&
                    Alert.alert(
                        'Отправлено',
                        'Новые данные сконфигурированы в виджете.',
                        [
                            {
                                text: 'Ок',
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                setIsSending(false);
            }, 2000);
        }
    };

    return isLoaded ? (
        <View style={styles.container}>
            {!isSending ? (
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgba(0, 255, 255, 0.4)'
                                : 'transparent',
                        },
                        styles.buttonContainer,
                    ]}
                    onPress={() => onSendToWidgetHandler()}
                >
                    <FontAwesomeIcon
                        icon="fa-regular fa-share-from-square"
                        size={30}
                    />
                    <Text style={styles.buttonText}>
                        Отправить данные виджету
                    </Text>
                </Pressable>
            ) : (
                <Loader sourceFile={loaders.sendDataToWidget} />
            )}
        </View>
    ) : (
        <Loader sourceFile={loaders.catHero} />
    );
};
