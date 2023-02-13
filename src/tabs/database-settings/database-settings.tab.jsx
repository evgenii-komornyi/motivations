import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSettingsStore } from '../../app/settingsStore';

import { loaders } from '../../helpers/loader.helper';
import { Loader } from '../../components/loader/loader.component';

import { ExportButton } from '../../components/export-button/export-button.component';
import { ImportButton } from '../../components/import-button/import-button.component';

import { styles } from './database-settings.styles';

export const DatabaseSettings = () => {
    const { isImported, fetchAllMotivations, isSent } = useSettingsStore();

    useEffect(() => {
        fetchAllMotivations();
    }, [fetchAllMotivations, isSent]);

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
