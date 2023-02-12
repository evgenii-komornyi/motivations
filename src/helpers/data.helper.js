import { CatalogScreen } from '../screens/catalog.screen';
import { BackgroundsScreen } from '../screens/backgrounds.screen';
import { CategoryScreen } from '../screens/category.screen';
import { SettingsScreen } from '../screens/settings.screen';

export const routes = [
    {
        path: '/',
        screen: <CatalogScreen />,
    },
    {
        path: '/backgrounds',
        screen: <BackgroundsScreen />,
    },
    {
        path: '/settings',
        screen: <SettingsScreen />,
    },
    {
        path: '/categories/:category',
        screen: <CategoryScreen />,
    },
];

export const menus = [
    {
        path: '/',
        title: 'Каталог',
        iconType: 'solid',
        icon: 'sitemap',
    },
    {
        path: '/backgrounds',
        title: 'Фоны',
        iconType: 'regular',
        icon: 'images',
    },
    {
        path: '/settings',
        title: 'Настройки',
        iconType: 'solid',
        icon: 'sliders',
    },
];
