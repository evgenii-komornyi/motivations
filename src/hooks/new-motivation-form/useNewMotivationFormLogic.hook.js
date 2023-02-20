import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useMotivationsStore } from '../../app/motivationsStore';
import { generateID } from '../../helpers/generators.helper';
import { useAlert } from '../common/useAlert.hook';

export const useNewMotivationFormLogic = category => {
    const [fields, setFields] = useState({
        _id: generateID(),
        title: '',
        category: category,
        isActive: true,
    });

    const [isTooLong, setIsTooLong] = useState(false);

    const checkValueLength = (name, value) => {
        if (name === 'title' && value.length >= 200) {
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
                'Сохранено',
                'Данные сохранены в базу.',
                [
                    {
                        text: 'Вернуться в каталог',
                        onPress: () => {
                            navigate('/');
                            setIsModalVisible(false);
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'Добавить ещё фразу',
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
