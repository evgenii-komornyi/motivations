import React, { useState } from 'react';
import { Constants } from '../../constants/constants';
import { useNavigate } from 'react-router-native';

import { View, Switch, TextInput, Pressable } from 'react-native';
import { Icon } from '../icon/icon.component';
import { CustomText } from '../custom-text/custom-text.component';

import { Loader } from '../loader/loader.component';

import { useMotivationsStore } from '../../app/motivationsStore';
import { useAlert } from '../../hooks/useAlert';

import { generateID } from '../../helpers/generators.helper';
import { loaders } from '../../helpers/loader.helper';

import { styles } from './new-motivation-form.styles';

export const NewMotivationForm = ({ category }) => {
    const [fields, setFields] = useState({
        _id: generateID(),
        title: '',
        category: category,
        isActive: true,
    });

    const [isTooLong, setIsTooLong] = useState(false);

    const checkValueLength = (name, value) => {
        if (name === 'title' && value.length === 200) {
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

    return (
        <View style={styles.mainContainer}>
            {isSending ? (
                <Loader sourceFile={loaders.loadingSend} />
            ) : (
                <>
                    <TextInput
                        multiline
                        editable
                        maxLength={200}
                        value={fields.title}
                        placeholder="Фраза"
                        style={[
                            styles.textInput,
                            { borderColor: !isTooLong ? 'black' : 'red' },
                        ]}
                        onChangeText={item => handleChange(item, 'title')}
                    />
                    <View style={styles.visibilityContainer}>
                        <View style={styles.visibilityTitle}>
                            <CustomText text="Видимость: " />
                        </View>
                        <View style={styles.visibilitySwitcherContainer}>
                            <Switch
                                trackColor={{
                                    false: '#999952',
                                    true: '#000000',
                                }}
                                thumbColor={
                                    fields.isActive ? '#ffffff' : '#000000'
                                }
                                onValueChange={toggleSwitch}
                                value={fields.isActive}
                            />
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgba(0, 139, 0, .3)'
                                    : 'white',
                            },
                            styles.saveButtonContainer,
                            {
                                backgroundColor: isButtonDisabled
                                    ? 'rgba(0,0,0,0.1)'
                                    : 'white',
                                borderColor: isButtonDisabled ? 'red' : 'black',
                            },
                        ]}
                        onPress={handleSavePress}
                        disabled={isButtonDisabled}
                    >
                        <View style={styles.iconContainer}>
                            <Icon
                                type={Constants.MATERIALCOMMUNITYICONS_ICON}
                                icon="content-save-edit-outline"
                                size={Constants.SMALL_ICON_SIZE}
                            />
                        </View>
                        <View style={styles.saveTitleContainer}>
                            <CustomText text="Сохранить" />
                        </View>
                    </Pressable>
                </>
            )}
        </View>
    );
};
