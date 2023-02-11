import React from 'react';
import { Backgrounds } from '../components/backgrounds/backgrounds.component';

import { useOnBackPress } from '../hooks/useOnBackPress';

export const BackgroundsScreen = () => {
    useOnBackPress();

    return <Backgrounds />;
};
