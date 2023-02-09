import React from 'react';
import * as FileSystem from 'expo-file-system';
import { Pressable, Text, ToastAndroid, Alert } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { styles } from './settings.styles';
import { useSettingsStore } from '../../app/settingsStore';
import { generateFileName } from '../../helpers/generators.helper';

export const ExportButton = () => {
    const { motivations } = useSettingsStore();

    const isDisabled = motivations.length === 0;

    const saveFile = async fileUri => {
        try {
            await FileSystem.writeAsStringAsync(
                fileUri,
                JSON.stringify(motivations),
                {
                    encoding: FileSystem.EncodingType.UTF8,
                }
            );

            return true;
        } catch (error) {
            console.warn(error);

            return false;
        }
    };

    const exportDBToFile = async () => {
        try {
            const permissions =
                await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (permissions.granted) {
                let directoryUri = permissions.directoryUri;

                const fileName = generateFileName('motivations');

                const fileUri =
                    await FileSystem.StorageAccessFramework.createFileAsync(
                        directoryUri,
                        fileName,
                        'application/json'
                    );

                const isSaved = await saveFile(fileUri);

                if (isSaved) {
                    const directory = directoryUri.split('/');

                    Alert.alert(
                        'Сохранено!',
                        `Бэкап ${fileName} сохранён в папку ${directory[
                            directory.length - 1
                        ].replace('primary%3A', '/')}.`,
                        [
                            {
                                text: 'Ok',
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                } else {
                    Alert.alert(
                        'Не сохранено!',
                        'Данные, которые вы сохраняете сломаны!',
                        [
                            {
                                text: 'Ok',
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                }
            } else {
                Alert.alert(
                    'Важно!',
                    'Вы должны разрешить доступ к папке загрузки!',
                    [
                        {
                            text: 'Ok',
                            onPress: () => null,
                            style: 'cancel',
                        },
                    ]
                );
            }
        } catch (error) {
            console.warn(error);
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
            onPress={exportDBToFile}
        >
            <FontAwesomeIcon icon="fa-solid fa-file-export" size={30} />
            <Text style={styles.buttonText}>Экспорт</Text>
        </Pressable>
    );
};
