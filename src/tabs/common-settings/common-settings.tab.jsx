import React from 'react';

import { FlatList, SafeAreaView } from 'react-native';
import { useCategoriesStore } from '../../app/categoriesStore';
import { CategoryItem } from './category-item';

import { sortCategories } from '../../helpers/categories.helper';

import { styles } from './common-settings.styles';

export const CommonSettings = () => {
    const { categories } = useCategoriesStore();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sortCategories(categories)}
                renderItem={({ item }) => <CategoryItem data={item} />}
                keyExtractor={(_, index) => index}
                contentContainerStyle={{ marginTop: 2, marginBottom: 80 }}
            />
        </SafeAreaView>
    );
};
