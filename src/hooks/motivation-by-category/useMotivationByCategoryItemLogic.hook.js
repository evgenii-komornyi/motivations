import { useState } from 'react';
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
        alertCaller('Удалить?', 'Вы точно хотите удалить эту фразу из базы?', [
            {
                text: 'Нет',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'Да',
                onPress: () => removeMotivation(id, category),
            },
        ]);
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
