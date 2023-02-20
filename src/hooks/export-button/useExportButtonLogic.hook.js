import * as FileSystem from 'expo-file-system';

import { useSettingsStore } from '../../app/settingsStore';

import { useAlert } from '../common/useAlert.hook';

import { generateFileName } from '../../helpers/generators.helper';

export const useExportButtonLogic = () => {
    const { motivations, categories } = useSettingsStore();

    const isDisabled = motivations.length === 0;

    const saveFile = async fileUri => {
        try {
            const objectToExport = {
                categories: [...categories],
                motivations: [...motivations],
            };

            await FileSystem.writeAsStringAsync(
                fileUri,
                JSON.stringify(objectToExport),
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
                        ].replace(/primary%3A|%2F/g, '/')}.`,
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

    return [isDisabled, exportDBToFile];
};
