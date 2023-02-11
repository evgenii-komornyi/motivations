import React, { useState } from 'react';
import { Constants } from '../../constants/constants';

import { Pressable, Text, View, Switch } from 'react-native';
import { EditForm } from '../edit-form/edit-form.component';
import { Icon } from '../icon/icon.component';
import { Loader } from '../loader/loader.component';

import { useMotivationsStore } from '../../app/motivationsStore';

import { useCreateRef } from '../../hooks/useCreateRef';
import { useAlert } from '../../hooks/useAlert';
import { loaders } from '../../helpers/loader.helper';

import { styles } from './motivations-by-category.styles';

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
                        <Icon
                            type={Constants.MATERIALCOMMUNITYICONS_ICON}
                            icon="notebook-edit-outline"
                            size={Constants.BIG_ICON_SIZE}
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
                        <Icon
                            type={Constants.MATERIALCOMMUNITYICONS_ICON}
                            icon="notebook-remove"
                            size={Constants.BIG_ICON_SIZE}
                        />
                    </Pressable>
                </View>
            )}
        </Pressable>
    ) : (
        <Loader sourceFile={loaders.loadingSend} />
    );
};
