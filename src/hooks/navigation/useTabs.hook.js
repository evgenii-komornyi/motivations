import {
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    FontAwesome5,
} from '@expo/vector-icons';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

export const useTabs = () => {
    return [
        {
            path: '/',
            name: Dictionary[Constants.language].strings.tabs.CATALOG,
            activeIcon: (
                <MaterialCommunityIcons
                    name="book-open-page-variant-outline"
                    size={24}
                    color="white"
                />
            ),
            inactiveIcon: <AntDesign name="book" size={24} color="white" />,
        },
        // {
        //     path: '/backgrounds',
        //     name: Dictionary[Constants.language].strings.tabs.BACKGROUNDS,
        //     activeIcon: (
        //         <MaterialCommunityIcons
        //             name="notebook-edit-outline"
        //             size={24}
        //             color="white"
        //         />
        //     ),
        //     inactiveIcon: (
        //         <MaterialCommunityIcons
        //             name="book-plus-multiple-outline"
        //             size={24}
        //             color="black"
        //         />
        //     ),
        // },
        {
            path: '/settings',
            name: Dictionary[Constants.language].strings.tabs.SETTINGS,
            activeIcon: <FontAwesome5 name="cogs" size={24} color="white" />,
            inactiveIcon: (
                <Ionicons name="ios-settings-outline" size={24} color="white" />
            ),
        },
    ];
};
