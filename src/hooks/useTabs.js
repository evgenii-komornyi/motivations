import {
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    FontAwesome5,
} from '@expo/vector-icons';

export const useTabs = () => {
    return [
        {
            path: '/',
            name: 'Catalog',
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
        //     name: 'New item',
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
            name: 'Settings',
            activeIcon: <FontAwesome5 name="cogs" size={24} color="white" />,
            inactiveIcon: (
                <Ionicons name="ios-settings-outline" size={24} color="white" />
            ),
        },
    ];
};
