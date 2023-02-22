import { Icon } from '../../components/icon/icon.component';
import { Constants } from '../../constants/constants';
import { Dictionary } from '../../constants/dictionary';

export const useTabs = () => {
    return [
        {
            path: '/',
            name: Dictionary[Constants.language].strings.tabs.CATALOG,
            activeIcon: (
                <Icon
                    type={Constants.MATERIALCOMMUNITYICONS_ICON}
                    icon="book-open-page-variant-outline"
                    size={24}
                    color="white"
                />
            ),
            inactiveIcon: (
                <Icon
                    type={Constants.ANTDESIGN_ICON}
                    icon="book"
                    size={24}
                    color="white"
                />
            ),
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
            activeIcon: (
                <Icon
                    type={Constants.FONTAWESOME5_ICON}
                    icon="cogs"
                    size={24}
                    color="white"
                />
            ),
            inactiveIcon: (
                <Icon
                    type={Constants.IONICONS_ICON}
                    icon="ios-settings-outline"
                    size={24}
                    color="white"
                />
            ),
        },
    ];
};
