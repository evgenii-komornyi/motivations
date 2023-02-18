import React, { useState, useEffect } from 'react';
import { Constants } from '../../constants/constants';

import { Pressable, TextInput, View } from 'react-native';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useMotivationsStore } from '../../app/motivationsStore';

import { styles } from './edit-form.styles';

export const EditForm = ({ item, closeForm, category }) => {
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
        if (value.length >= 200) {
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

    return (
        <View style={styles.formContainer}>
            <TextInput
                value={title}
                multiline
                editable
                maxLength={200}
                placeholder="Фраза"
                style={[
                    styles.textInput,
                    { borderColor: !isTooLong ? 'black' : 'red' },
                ]}
                onChangeText={item => handleChange(item)}
            />
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
                onPress={handleSave}
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
        </View>
    );
};
