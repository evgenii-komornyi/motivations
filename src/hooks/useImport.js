import { useSettingsStore } from '../app/settingsStore';
import { useAlert } from './useAlert';
import { useToast } from './useToast';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';

export const useImport = () => {
    const { motivations, importToStorage } = useSettingsStore();
    const alertCaller = useAlert();
    const toastCaller = useToast();

    const pickDocument = async () => {
        try {
            const { uri, mimeType, type } =
                await DocumentPicker.getDocumentAsync({});

            if (type === 'cancel') {
                toastCaller('Для импорта нужно выбрать файл!');

                return;
            }

            const content = await FileSystem.readAsStringAsync(uri);

            if (mimeType !== 'application/json') {
                toastCaller(
                    `Невозможно импортировать ${mimeType}! Только json файлы!!!`
                );

                return;
            }

            if (motivations.length !== 0) {
                alertCaller(
                    'Важно!',
                    'Ваша база не пуста! Если вы выберите Дополнить, то данные добавятся в существующую базу, если Переписать, то данные перепишутся.',
                    [
                        {
                            text: 'Дополнить',
                            onPress: () => null,
                            style: 'default',
                        },
                        {
                            text: 'Переписать',
                            onPress: () => importToDB(content),
                            style: 'default',
                        },
                        {
                            text: 'Отменить',
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
                    'Данные успешно импортированы!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }, 4000);
        } else {
            ToastAndroid.showWithGravityAndOffset(
                'Something went wrong!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    };

    return [pickDocument];
};
