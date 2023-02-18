import React, { useState, useEffect } from 'react';
import { Constants } from '../../constants/constants';

import { Pressable, TextInput, View } from 'react-native';
import { Icon } from '../icon/icon.component';

import { useCategoriesStore } from '../../app/categoriesStore';

import { styles } from './edit-category-form.styles';

export const EditCategoryForm = ({ item, closeForm }) => {
    const [categoryName, setCategoryName] = useState('');

    const { updateCategory } = useCategoriesStore();

    useEffect(() => {
        setCategoryName(item.category);

        return () => {
            setCategoryName('');
        };
    }, []);

    const [isTooLong, setIsTooLong] = useState(false);

    const checkValueLength = value => {
        if (value.length >= 20) {
            setIsTooLong(true);
        } else {
            setIsTooLong(false);
        }
    };

    const handleChange = value => {
        setCategoryName(value);
        checkValueLength(value);
    };

    const isButtonDisabled = categoryName === '';

    const handleEdit = () => {
        updateCategory(item.id, { category: categoryName });
        closeForm(false);
    };

    return (
        <View style={styles.formContainer}>
            <TextInput
                value={categoryName}
                multiline
                editable
                maxLength={20}
                placeholder="Категория"
                style={[
                    styles.textInput,
                    { borderColor: !isTooLong ? 'black' : 'red' },
                ]}
                onChangeText={item => handleChange(item)}
            />
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgba(0, 139, 0, .3)'
                                : 'transparent',
                            backgroundColor: isButtonDisabled
                                ? 'rgba(0,0,0,0.1)'
                                : 'transparent',
                            borderColor: isButtonDisabled ? 'red' : 'black',
                        },
                    ]}
                    onPress={handleEdit}
                    disabled={isButtonDisabled}
                >
                    <Icon
                        type={Constants.MATERIALCOMMUNITYICONS_ICON}
                        icon="checkbox-marked-circle-outline"
                        size={Constants.BIGGEST_ICON_SIZE}
                        color={`${isButtonDisabled ? 'red' : 'green'}`}
                    />
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? 'rgba(0, 139, 0, .3)'
                                : 'transparent',
                            marginLeft: 5,
                        },
                    ]}
                    onPress={() => closeForm(false)}
                >
                    <Icon
                        type={Constants.ENTYPO_ICON}
                        icon="circle-with-cross"
                        size={Constants.BIGGEST_ICON_SIZE}
                        color="red"
                    />
                </Pressable>
            </View>
        </View>
    );
};
