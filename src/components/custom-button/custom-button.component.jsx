import React from 'react';

import { Pressable } from 'react-native';

import { styles } from './custom-button.styles';

export const CustomButton = ({ children, isDisabled = false, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'rgba(0, 255, 255, 0.4)'
                        : 'transparent',
                },
                styles.buttonContainer,
                {
                    backgroundColor: `${isDisabled ? '#bbb' : 'transparent'}`,
                    borderColor: `${isDisabled ? 'red' : 'black'}`,
                },
            ]}
            disabled={isDisabled}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
};
