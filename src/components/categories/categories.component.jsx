import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { Loader } from '../loader/loader.component';
import { GridView } from './grid-view.component';

import { useCategoriesStore } from '../../app/categoriesStore';

import { loaders } from '../../helpers/loader.helper';
import { sortCategories } from '../../helpers/categories.helper';

export const Categories = () => {
    const { categories, isLoaded, fetchCategories } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories, isLoaded]);

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 3 }}>
            {isLoaded ? (
                <FlatList
                    data={sortCategories(
                        categories.filter(category => category.isVisible)
                    )}
                    renderItem={({ item }) => <GridView data={item} />}
                    keyExtractor={(_, index) => index}
                    numColumns={2}
                    key={item => item.id}
                />
            ) : (
                <Loader sourceFile={loaders.catHero} />
            )}
        </SafeAreaView>
    );
};
