import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Dictionary } from '../../constants/dictionary';
import { Constants } from '../../constants/constants';
import { ToastAndroid } from 'react-native';

import { useSettingsStore } from '../../app/settingsStore';

import { useAlert } from '../common/useAlert.hook';
import { useToast } from '../common/useToast.hook';
import { useNavigate } from 'react-router-native';

export const useImport = () => {
    const { motivations, importToStorage, categories } = useSettingsStore();
    const alertCaller = useAlert();
    const toastCaller = useToast();
    const navigate = useNavigate();

    const pickDocument = async () => {
        try {
            const { uri, mimeType, type } =
                await DocumentPicker.getDocumentAsync({});

            if (type === 'cancel') {
                toastCaller(
                    Dictionary[Constants.language].strings.toasts
                        .NO_FILE_SELECTED + '!'
                );

                return;
            }

            const content = await FileSystem.readAsStringAsync(uri);

            if (mimeType !== 'application/json') {
                toastCaller(
                    `${
                        Dictionary[Constants.language].strings.toasts
                            .IMPOSSIBLE_IMPORT
                    } ${mimeType}! ${
                        Dictionary[Constants.language].strings.toasts
                            .ONLY_JSON_FILES
                    }!`
                );

                return;
            }

            if (motivations.length !== 0 && categories.length !== 0) {
                alertCaller(
                    Dictionary[Constants.language].strings.alerts.IMPORTANT +
                        '!',
                    `${
                        Dictionary[Constants.language].strings.alerts
                            .DATABASE_NOT_EMPTY
                    }! $${
                        Dictionary[Constants.language].strings.alerts
                            .IF_CONTINUE_THEN_LOST
                    }!`,
                    [
                        {
                            text: Dictionary[Constants.language].buttons
                                .CONTINUE,
                            onPress: () => importToDB(content),
                            style: 'default',
                        },
                        {
                            text: Dictionary[Constants.language].buttons.CANCEL,
                            onPress: () => null,
                            style: 'cancel',
                        },
                    ]
                );
            } else {
                importToDB(content);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const importToDB = async content => {
        const isSaved = await importToStorage(content);
        if (isSaved) {
            setTimeout(() => {
                ToastAndroid.showWithGravityAndOffset(
                    Dictionary[Constants.language].strings.toasts
                        .SUCCESS_IMPORTED + '!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                navigate('/');
            }, 4000);
        } else {
            ToastAndroid.showWithGravityAndOffset(
                Dictionary[Constants.language].strings.toasts.FAILED_IMPORTED +
                    '!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    };

    return [pickDocument];
};
