import React from 'react';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

import { CustomButton } from '../custom-button/custom-button.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useExportButtonLogic } from '../../hooks/export-button/useExportButtonLogic.hook';

import { styles } from '../../styles/globalStyle';

export const ExportButton = () => {
    const [isDisabled, exportDBToFile] = useExportButtonLogic();

    return (
        <CustomButton isDisabled={isDisabled} onPress={exportDBToFile}>
            <Icon
                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                icon="database-export-outline"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <CustomText
                style={styles.buttonText}
                text={Dictionary[Constants.language].buttons.EXPORT}
            />
        </CustomButton>
    );
};
