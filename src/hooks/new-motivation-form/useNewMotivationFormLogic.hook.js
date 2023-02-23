import { useState } from 'react';
import { Constants } from '../../constants/constants';
import { useNavigate } from 'react-router-native';
import { useMotivationsStore } from '../../app/motivationsStore';
import { generateID } from '../../helpers/generators.helper';
import { useAlert } from '../common/useAlert.hook';
import { Dictionary } from '../../constants/dictionary';

export const useNewMotivationFormLogic = category => {
    const [fields, setFields] = useState({
        _id: generateID(),
        title: '',
        category: category,
        isActive: true,
    });

    const [isTooLong, setIsTooLong] = useState(false);

    const checkValueLength = (name, value) => {
        if (
            name === 'title' &&
            value.length >= Constants.values.TITLE_MAX_LENGTH
        ) {
            setIsTooLong(true);
        } else {
            setIsTooLong(false);
        }
    };

    const toggleSwitch = () =>
        setFields({ ...fields, isActive: !fields.isActive });

    const handleChange = (value, name) => {
        setFields({ ...fields, [name]: value });
        checkValueLength(name, value);
    };

    const isButtonDisabled = fields.title === '';

    const { isSending, setIsModalVisible, saveMotivation } =
        useMotivationsStore();

    const navigate = useNavigate();

    const alertCaller = useAlert();

    const handleSavePress = () => {
        saveMotivation(fields);

        !isSending &&
            alertCaller(
                Dictionary[Constants.language].strings.alerts.SAVED + '!',
                Dictionary[Constants.language].strings.alerts.DATA_WAS_SAVED +
                    '.',
                [
                    {
                        text: Dictionary[Constants.language].buttons
                            .BACK_TO_CATALOGUE,
                        onPress: () => {
                            navigate('/');
                            setIsModalVisible(false);
                        },
                        style: 'cancel',
                    },
                    {
                        text: Dictionary[Constants.language].buttons.ADD_MORE,
                        onPress: () => null,
                        style: 'cancel',
                    },
                ],
                1
            );

        setFields({
            _id: generateID(),
            title: '',
            category: category,
            isActive: true,
        });
    };

    return [
        fields,
        isTooLong,
        isSending,
        toggleSwitch,
        handleChange,
        isButtonDisabled,
        handleSavePress,
    ];
};
