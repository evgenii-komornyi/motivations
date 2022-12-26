import React from 'react';
import { View } from 'react-native';

import { NewMotivationForm } from '../components/new-motivation-form/new-motivation-form.component.jsx';
import { NewBackgroundForm } from '../components/new-background-form/new-background-form.component.jsx';
import { useOnBackPress } from '../hooks/useOnBackPress.js';

export const CreateNewScreen = () => {
    useOnBackPress();

    return (
        <View style={{ flex: 8 }}>
            <NewBackgroundForm />
            <NewMotivationForm />
        </View>
    );
};
