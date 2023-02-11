import React from 'react';

import {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial,
} from '@expo/vector-icons';

export const Icon = ({ type, icon, size, color = 'black' }) => {
    const icons = {
        antDesign: <AntDesign name={icon} size={size} color={color} />,
        entypo: <Entypo name={icon} size={size} color={color} />,
        evilIcons: <EvilIcons name={icon} size={size} color={color} />,
        feather: <Feather name={icon} size={size} color={color} />,
        fontAwesome: <FontAwesome name={icon} size={size} color={color} />,
        fontAwesome5: <FontAwesome5 name={icon} size={size} color={color} />,
        fontisto: <Fontisto name={icon} size={size} color={color} />,
        foundation: <Foundation name={icon} size={size} color={color} />,
        ionIcons: <Ionicons name={icon} size={size} color={color} />,
        materialCommunityIcons: (
            <MaterialCommunityIcons name={icon} size={size} color={color} />
        ),
        materialIcons: <MaterialIcons name={icon} size={size} color={color} />,
        octIcons: <Octicons name={icon} size={size} color={color} />,
        simpleLineIcons: (
            <SimpleLineIcons name={icon} size={size} color={color} />
        ),
        zocial: <Zocial name={icon} size={size} color={color} />,
    };

    return icons[type];
};
