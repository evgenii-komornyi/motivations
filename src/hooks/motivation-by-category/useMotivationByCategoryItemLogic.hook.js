import { useState } from 'react';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';
import { useMotivationsStore } from '../../app/motivationsStore';
import { useAlert } from '../common/useAlert.hook';
import { useCreateRef } from '../common/useCreateRef.hook';

export const useMotivationByCategoryItemLogic = (item, category) => {
    const [isButtonsShown, setIsButtonsShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [isActive, setIsActive] = useState(item.isActive);

    const currentIsActive = useCreateRef(isActive);

    const { removeMotivation, updateActivation } = useMotivationsStore();

    const toggleSwitch = () => {
        setIsActive(prev => !prev);
        setTimeout(() => {
            updateActivation(
                item._id,
                { isActive: currentIsActive.current },
                category
            );
        }, 1);
    };

    const alertCaller = useAlert();

    const removeItem = id => {
        alertCaller(
            Dictionary[Constants.language].strings.alerts.DELETE + '?',
            Dictionary[Constants.language].strings.alerts.DELETE_QUESTION + '?',
            [
                {
                    text: Dictionary[Constants.language].buttons.NO,
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: Dictionary[Constants.language].buttons.YES,
                    onPress: () => removeMotivation(id, category),
                },
            ]
        );
    };

    const onLongPressHandler = () => {
        setIsButtonsShown(prev => !prev);
    };

    return [
        isButtonsShown,
        isEdit,
        isActive,
        setIsEdit,
        toggleSwitch,
        removeItem,
        onLongPressHandler,
    ];
};
