import React from 'react';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

import { CustomButton } from '../custom-button/custom-button.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useWidgetButtonLogic } from '../../hooks/widget-button/useWidgetButtonLogic.hook';

import { styles } from '../../styles/globalStyle';

export const WidgetButton = () => {
    const [isDisabled, onSendToWidgetHandler] = useWidgetButtonLogic();

    return (
        <CustomButton disabled={isDisabled} onPress={onSendToWidgetHandler}>
            <Icon
                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                icon="database-cog-outline"
                size={Constants.MEDIUM_ICON_SIZE}
            />
            <CustomText
                style={styles.buttonText}
                text={Dictionary[Constants.language].buttons.SEND_TO_WIDGET}
            />
        </CustomButton>
    );
};
