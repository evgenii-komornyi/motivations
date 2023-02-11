import React from 'react';
import { Constants } from '../../constants/constants';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { Pressable, Text, ToastAndroid } from 'react-native';
import { Icon } from '../icon/icon.component';

import { useSettingsStore } from '../../app/settingsStore';
import { useToast } from '../../hooks/useToast';
import { useAlert } from '../../hooks/useAlert';

import { styles } from './settings.styles';

export const ImportButton = () => {
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
                    'Ваша база не пуста! Если вы хотите продолжить, то данные перепишутся',
                    [
                        {
                            text: 'Продолжить',
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

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgba(0, 255, 255, 0.4)'
                        : 'transparent',
                },
                styles.buttonContainer,
            ]}
            onPress={pickDocument}
        >
            <Icon
                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                icon="database-import-outline"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <Text style={styles.buttonText}>Импорт</Text>
        </Pressable>
    );
};
