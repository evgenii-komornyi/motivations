import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSettingsStore } from '../../app/settingsStore';

import { loaders } from '../../helpers/loader.helper';
import { Loader } from '../../components/loader/loader.component';

import { ExportButton } from '../../components/export-button/export-button.component';
import { ImportButton } from '../../components/import-button/import-button.component';

import { styles } from './database-settings.styles';
import { useAlert } from '../../hooks/useAlert';
import { useCategoriesStore } from '../../app/categoriesStore';

export const DatabaseSettings = () => {
    const { isImported, motivations, fetchAllMotivations, isSent } =
        useSettingsStore();

    const { categories } = useCategoriesStore();

    const alertCaller = useAlert();

    useEffect(() => {
        fetchAllMotivations();
    }, [fetchAllMotivations, isSent]);

    // useEffect(() => {
    //     if (motivations.length !== 0 && categories.length !== 0) {
    //         alertCaller(
    //             'Внимание!',
    //             'Обнаружен старый формат записей! Он будет преобразован в новый.',
    //             [
    //                 {
    //                     text: 'Ok',
    //                     onPress: () => null,
    //                     style: 'cancel',
    //                 },
    //             ]
    //         );
    //     }
    // }, []);

    return (
        <View style={styles.container}>
            {isImported && isSent ? (
                <View style={styles.buttonsContainer}>
                    <ImportButton />
                    <ExportButton />
                </View>
            ) : (
                <Loader sourceFile={loaders.importExport} />
            )}
        </View>
    );
};
