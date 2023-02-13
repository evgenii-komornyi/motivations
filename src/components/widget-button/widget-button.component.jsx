import React from 'react';
import { Constants } from '../../constants/constants';

import { CustomButton } from '../custom-button/custom-button.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useSettingsStore } from '../../app/settingsStore';
import { useAlert } from '../../hooks/useAlert';

import { styles } from '../../styles/globalStyle';

export const WidgetButton = () => {
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
        <CustomButton
            disabled={isDisabled}
            onPress={() => onSendToWidgetHandler()}
        >
            <Icon
                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                icon="database-cog-outline"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <CustomText style={styles.buttonText} text="Отправить виджету" />
        </CustomButton>
    );
};
