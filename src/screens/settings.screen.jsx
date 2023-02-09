import React from 'react';
import { Settings } from '../components/settings/settings.component';

import { useOnBackPress } from '../hooks/useOnBackPress';

export const SettingsScreen = () => {
    useOnBackPress();

    return <Settings />;
};
