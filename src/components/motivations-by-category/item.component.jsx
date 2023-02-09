import React, { useState } from 'react';
import { Pressable, Text, View, Switch, Alert } from 'react-native';
import { useMotivationsStore } from '../../app/motivationsStore';

import { EditForm } from '../edit-form/edit-form.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useCreateRef } from '../../hooks/useCreateRef';

import { styles } from './motivations-by-category.styles';
import { Loader } from '../loader/loader.component';
import { loaders } from '../../helpers/loader.helper';

export const Item = ({ item, category }) => {
    const [isButtonsShown, setIsButtonsShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [isActive, setIsActive] = useState(item.isActive);

    const currentIsActive = useCreateRef(isActive);

    const { removeMotivation, updateActivation, isSending } =
        useMotivationsStore();

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

    const removeItem = id => {
        Alert.alert('Удалить?', 'Вы точно хотите удалить эту фразу из базы?', [
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

    return !isSending ? (
        <Pressable
            onLongPress={onLongPressHandler}
            style={({ pressed }) => [
                {
                    borderColor:
                        pressed && item.isActive
                            ? 'rgba(120, 220, 120, 0.8)'
                            : 'rgba(220, 120, 120, 0.8)',
                },
                {
                    backgroundColor: isActive
                        ? 'rgba(120, 220, 120, 0.4)'
                        : 'rgba(220, 120, 120, 0.4)',
                },
                styles.itemContainerButton,
            ]}
        >
            <View style={styles.wrapperContainer}>
                <View style={styles.formContainer}>
                    {!isEdit ? (
                        <Text style={styles.title}>{item.title}</Text>
                    ) : (
                        <EditForm
                            item={item}
                            closeForm={setIsEdit}
                            category={category}
                        />
                    )}
                </View>
                <View style={styles.switchContainer}>
                    <Switch
                        trackColor={{
                            false: '#999952',
                            true: '#000000',
                        }}
                        thumbColor={isActive ? '#ffffff' : '#000000'}
                        onValueChange={toggleSwitch}
                        value={isActive}
                    />
                </View>
            </View>
            {isButtonsShown && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'transparent',
                            },
                            styles.buttonContainer,
                        ]}
                        onPress={() => setIsEdit(prev => !prev)}
                    >
                        <FontAwesomeIcon
                            icon="fa-regular fa-pen-to-square"
                            size={30}
                        />
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'transparent',
                            },
                            styles.buttonContainer,
                        ]}
                        onPress={() => removeItem(item._id)}
                    >
                        <FontAwesomeIcon
                            icon="fa-regular fa-trash-can"
                            size={30}
                        />
                    </Pressable>
                </View>
            )}
        </Pressable>
    ) : (
        <Loader sourceFile={loaders.loadingSend} />
    );
};
