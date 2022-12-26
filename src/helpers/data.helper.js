import { CatalogScreen } from '../screens/catalog.screen';
import { CreateNewScreen } from '../screens/create.screen';
import { CategoryScreen } from '../screens/category.screen';
import { BackgroundsScreen } from '../screens/backgrounds.screen';
import { WidgetSettingsScreen } from '../screens/widget-settings.screen';

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
        path: '/create',
        screen: <CreateNewScreen />,
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
        path: '/backgrounds',
        title: 'Фоны',
        iconType: 'regular',
        icon: 'images',
    },
    {
        path: '/settings',
        title: 'Виджет',
        iconType: 'solid',
        icon: 'puzzle-piece',
    },
];
