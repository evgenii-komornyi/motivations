import React from 'react';
import { Constants } from '../../constants/constants';

import { View, Switch, TextInput, Pressable } from 'react-native';
import { Icon } from '../icon/icon.component';
import { CustomText } from '../custom-text/custom-text.component';
import { Loader } from '../loader/loader.component';

import { useNewMotivationFormLogic } from '../../hooks/new-motivation-form/useNewMotivationFormLogic.hook';

import { loaders } from '../../helpers/loader.helper';

import { styles } from './new-motivation-form.styles';

export const NewMotivationForm = ({ category }) => {
    const [
        fields,
        isTooLong,
        isSending,
        toggleSwitch,
        handleChange,
        isButtonDisabled,
        handleSavePress,
    ] = useNewMotivationFormLogic(category);

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
