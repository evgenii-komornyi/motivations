import { useSettingsStore } from '../../app/settingsStore';
import { useAlert } from '../common/useAlert.hook';

export const useWidgetButtonLogic = () => {
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

    return [isDisabled, onSendToWidgetHandler];
};
