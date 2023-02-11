import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export const Icon = ({ type, icon, size, color = 'black' }) => {
    return (
        <FontAwesomeIcon
            icon={`fa-${type} fa-${icon}`}
            size={size}
            color={color}
        />
    );
};
