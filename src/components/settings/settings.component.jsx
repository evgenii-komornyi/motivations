import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSettingsStore } from '../../app/settingsStore';

import { loaders } from '../../helpers/loader.helper';
import { Loader } from '../loader/loader.component';
import { ExportButton } from './export-button.component';
import { ImportButton } from './import-button.component';

import { styles } from './settings.styles';

export const Settings = () => {
    const { isImported, fetchAllMotivations } = useSettingsStore();

    useEffect(() => {
        fetchAllMotivations();
    }, []);

    return (
        <View style={styles.container}>
            {isImported ? (
                <>
                    <ImportButton />
                    <ExportButton />
                </>
            ) : (
                <Loader sourceFile={loaders.importExport} />
            )}
        </View>
    );
};
