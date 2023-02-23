import * as FileSystem from 'expo-file-system';

import { useSettingsStore } from '../../app/settingsStore';

import { useAlert } from '../common/useAlert.hook';

import { generateFileName } from '../../helpers/generators.helper';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

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

                const fileName = generateFileName(
                    Constants.MOTIVATIONS_STORAGE_KEY
                );

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
                        Dictionary[Constants.language].strings.alerts.SAVED +
                            '!',
                        `${
                            Dictionary[Constants.language].strings.alerts.BACKUP
                        } ${fileName} ${
                            Dictionary[Constants.language].strings.alerts
                                .WAS_SAVED_INTO_FOLDER
                        } ${directory[directory.length - 1].replace(
                            /primary%3A|%2F/g,
                            '/'
                        )}.`,
                        [
                            {
                                text: Dictionary[Constants.language].buttons.OK,
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                } else {
                    alertCaller(
                        `${Dictionary[Constants.language].strings.alerts.NOT} ${
                            Dictionary[Constants.language].strings.alerts.SAVED
                        }!`,
                        `${
                            Dictionary[Constants.language].strings.alerts
                                .BROKEN_DATA
                        }!`,
                        [
                            {
                                text: Dictionary[Constants.language].buttons.OK,
                                onPress: () => null,
                                style: 'cancel',
                            },
                        ]
                    );
                }
            } else {
                alertCaller(
                    Dictionary[Constants.language].strings.alerts.IMPORTANT +
                        '!',
                    Dictionary[Constants.language].strings.alerts.ALLOW_ACCESS +
                        '!',
                    [
                        {
                            text: Dictionary[Constants.language].buttons.OK,
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
