import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Pressable, Text, ToastAndroid, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useSettingsStore } from '../../app/settingsStore';

import { styles } from './settings.styles';

export const ImportButton = () => {
    const { motivations, importToStorage } = useSettingsStore();

    const pickDocument = async () => {
        try {
            const { uri, mimeType, type } =
                await DocumentPicker.getDocumentAsync({});

            if (type === 'cancel') {
                ToastAndroid.showWithGravityAndOffset(
                    'Для импорта нужно выбрать файл!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );

                return;
            }

            const content = await FileSystem.readAsStringAsync(uri);

            if (mimeType !== 'application/json') {
                ToastAndroid.showWithGravityAndOffset(
                    `Невозможно импортировать ${mimeType}! Только json файлы!!!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                return;
            }

            if (motivations.length !== 0) {
                Alert.alert(
                    'Важно!',
                    'Ваша база не пуста! Если вы хотите продолжить, то данные перепишутся',
                    [
                        {
                            text: 'Продолжить',
                            onPress: () => importToDB(content),
                            style: 'cancel',
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
            <FontAwesomeIcon icon="fa-solid fa-file-import" size={25} />
            <Text style={styles.buttonText}>Импорт</Text>
        </Pressable>
    );
};
