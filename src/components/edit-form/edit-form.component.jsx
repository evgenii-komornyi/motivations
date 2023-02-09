import React, { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { styles } from './edit-form.styles';
import { useMotivationsStore } from '../../app/motivationsStore';

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
        if (value.length === 200) {
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
                    <FontAwesomeIcon
                        icon="fa-regular fa-floppy-disk"
                        color="black"
                        size={20}
                    />
                </View>
                <View style={styles.saveTitleContainer}>
                    <Text>Сохранить</Text>
                </View>
            </Pressable>
        </View>
    );
};
