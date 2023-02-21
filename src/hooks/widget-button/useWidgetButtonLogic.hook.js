import { useSettingsStore } from '../../app/settingsStore';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';
import { useAlert } from '../common/useAlert.hook';

export const useWidgetButtonLogic = () => {
    const { sendToWidget, activeMotivations } = useSettingsStore();

    const isDisabled = activeMotivations.length === 0;

    const alertCaller = useAlert();

    const onSendToWidgetHandler = () => {
        if (activeMotivations.length === 0) {
            alertCaller(
                Dictionary[Constants.language].strings.alerts.ERROR,
                Dictionary[Constants.language].strings.alerts.ERROR_MESSAGE +
                    '.',
                [
                    {
                        text: Dictionary[Constants.language].buttons.OK,
                        onPress: () => null,
                        style: 'cancel',
                    },
                ]
            );
        } else {
            sendToWidget();

            alertCaller(
                Dictionary[Constants.language].strings.alerts.SENT,
                Dictionary[Constants.language].strings.alerts
                    .SUCCESS_WIDGET_CONFIG + '.',
                [
                    {
                        text: Dictionary[Constants.language].buttons.OK,
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
