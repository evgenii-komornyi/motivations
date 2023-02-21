import { useEffect, useState } from 'react';
import { Constants } from '../../constants/constants';

import { useMotivationsStore } from '../../app/motivationsStore';

export const useEditMotivationLogic = (item, closeForm, category) => {
    const [title, setTitle] = useState('');

    const { updateMotivation } = useMotivationsStore();

    useEffect(() => {
        setTitle(item.title);

        return () => {
            setTitle('');
        };
    }, []);

    const [isTooLong, setIsTooLong] = useState(false);

    const checkValueLength = value => {
        if (value.length >= Constants.values.TITLE_MAX_LENGTH) {
            setIsTooLong(true);
        } else {
            setIsTooLong(false);
        }
    };

    const handleChange = value => {
        setTitle(value);
        checkValueLength(value);
    };

    const isButtonDisabled = title === '';

    const handleSave = () => {
        updateMotivation(item._id, { title: title }, category);
        closeForm(false);
    };

    return [title, isTooLong, isButtonDisabled, handleChange, handleSave];
};
