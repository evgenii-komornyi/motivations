import React, { useState } from 'react';
import { Constants } from '../../constants/constants';

import { Pressable, View, Switch } from 'react-native';
import { EditForm } from '../edit-form/edit-form.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';
import { Loader } from '../loader/loader.component';

import { useMotivationsStore } from '../../app/motivationsStore';

import { useMotivationByCategoryItemLogic } from '../../hooks/motivation-by-category/useMotivationByCategoryItemLogic.hook';

import { loaders } from '../../helpers/loader.helper';

import { styles } from './motivations-by-category.styles';

export const Item = ({ item, category }) => {
    const { isSending } = useMotivationsStore();
    const [
        isButtonsShown,
        isEdit,
        isActive,
        setIsEdit,
        toggleSwitch,
        removeItem,
        onLongPressHandler,
    ] = useMotivationByCategoryItemLogic(item, category);

    return !isSending ? (
        <Pressable
            onLongPress={onLongPressHandler}
            style={({ pressed }) => [
                {
                    borderColor:
                        pressed && item.isActive
                            ? 'rgba(154, 205, 50, 0.8)'
                            : 'rgba(255, 165, 0, 0.8)',
                },
                {
                    backgroundColor: isActive
                        ? 'rgba(154, 205, 50, 0.8)'
                        : 'rgba(255, 165, 0, 0.4)',
                },
                styles.itemContainerButton,
            ]}
        >
            <View style={styles.wrapperContainer}>
                <View style={styles.formContainer}>
                    {!isEdit ? (
                        <CustomText style={styles.title} text={item.title} />
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
