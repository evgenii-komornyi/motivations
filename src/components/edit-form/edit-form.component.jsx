import React from 'react';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

import { Pressable, TextInput, View } from 'react-native';
import { CustomText } from '../custom-text/custom-text.component';
import { Icon } from '../icon/icon.component';

import { useEditMotivationLogic } from '../../hooks/edit-form/useEditMotivationLogic.hook';

import { styles } from './edit-form.styles';

export const EditForm = ({ item, closeForm, category }) => {
    const [title, isTooLong, isButtonDisabled, handleChange, handleSave] =
        useEditMotivationLogic(item, closeForm, category);

    return (
        <View style={styles.formContainer}>
            <TextInput
                value={title}
                multiline
                editable
                maxLength={Constants.values.TITLE_MAX_LENGTH}
                placeholder={
                    Dictionary[Constants.language].strings.commons
                        .PLACEHOLDER_PHRASE
                }
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
                    <CustomText
                        text={Dictionary[Constants.language].buttons.SAVE}
                    />
                </View>
            </Pressable>
        </View>
    );
};
