import React from 'react';
import { Constants } from '../../constants/constants';

import { Pressable, Text } from 'react-native';
import { Icon } from '../icon/icon.component';

import { useSettingsStore } from '../../app/settingsStore';
import { useAlert } from '../../hooks/useAlert';

import { styles } from './settings.styles';

export const SendToWidgetButton = () => {
    const { sendToWidget, activeMotivations } = useSettingsStore();

    const isDisabled = activeMotivations.length === 0;

    const alertCaller = useAlert();

    const onSendToWidgetHandler = () => {
        if (activeMotivations.length === 0) {
            alertCaller(
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
            sendToWidget();

            alertCaller(
                'Отправлено',
                'Новые данные сконфигурированы в виджете.',
                [
                    {
                        text: 'Ок',
                        onPress: () => null,
                        style: 'cancel',
                    },
                ],
                4
            );
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgba(0, 255, 255, 0.4)'
                        : 'transparent',
                },
                styles.buttonContainer,
                {
                    backgroundColor: `${isDisabled ? '#bbb' : 'transparent'}`,
                    borderColor: `${isDisabled ? 'red' : 'black'}`,
                },
            ]}
            disabled={isDisabled}
            onPress={() => onSendToWidgetHandler()}
        >
            <Icon
                type={Constants.ICON_TYPE_SOLID}
                icon="puzzle-piece"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <Text style={styles.buttonText}>Отправить виджету</Text>
        </Pressable>
    );
};