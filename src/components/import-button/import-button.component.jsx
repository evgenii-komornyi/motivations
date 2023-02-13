import React from 'react';
import { Constants } from '../../constants/constants';

import { CustomButton } from '../custom-button/custom-button.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useImport } from '../../hooks/useImport';

import { styles } from '../../styles/globalStyle';

export const ImportButton = () => {
    const [pickDocument] = useImport();

    return (
        <CustomButton onPress={pickDocument}>
            <Icon
                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                icon="database-import-outline"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <CustomText style={styles.buttonText} text="Импорт" />
        </CustomButton>
    );
};
