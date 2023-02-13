import React from 'react';
import { Constants } from '../../constants/constants';

import * as FileSystem from 'expo-file-system';

import { CustomButton } from '../custom-button/custom-button.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useSettingsStore } from '../../app/settingsStore';
import { useAlert } from '../../hooks/useAlert';

import { generateFileName } from '../../helpers/generators.helper';

import { styles } from '../../styles/globalStyle';

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

    const alertCaller = useAlert();

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

                    alertCaller(
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
                    alertCaller(
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
                alertCaller(
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
        <CustomButton isDisabled={isDisabled} onPress={exportDBToFile}>
            <Icon
                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                icon="database-export-outline"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <CustomText style={styles.buttonText} text="Экспорт" />
        </CustomButton>
    );
};