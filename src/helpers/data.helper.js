import { CatalogScreen } from '../screens/catalog.screen';
import { CategoryScreen } from '../screens/category.screen';
import { SettingsScreen } from '../screens/settings.screen';
import { WidgetSettingsScreen } from '../screens/widget-settings.screen';

export const routes = [
    {
        path: '/',
        screen: <CatalogScreen />,
    },
    {
        path: '/main-settings',
        screen: <SettingsScreen />,
    },
    {
        path: '/categories/:category',
        screen: <CategoryScreen />,
    },
    {
        path: '/settings',
        screen: <WidgetSettingsScreen />,
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
        path: '/main-settings',
        title: 'Настройки',
        iconType: 'solid',
        icon: 'sliders',
    },
    {
        path: '/settings',
        title: 'Виджет',
        iconType: 'solid',
        icon: 'puzzle-piece',
    },
];
