import React from 'react';

import { Text } from 'react-native';

export const CustomText = ({ text, style = {} }) => {
    return <Text style={style}>{text}</Text>;
};
