import React from 'react';
import { Backgrounds } from '../components/backgrounds/backgrounds.component';

import { useOnBackPress } from '../hooks/common/useOnBackPress.hook';

export const BackgroundsScreen = () => {
    useOnBackPress();

    return <Backgrounds />;
};
