import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { Loader } from '../loader/loader.component';
import { GridView } from './grid-view.component';

import { useCategoriesStore } from '../../app/categoriesStore';

import { loaders } from '../../helpers/loader.helper';

export const Categories = () => {
    const { categories, isLoaded, fetchCategories } = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
    }, [categories, fetchCategories]);

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 3 }}>
            {isLoaded ? (
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <GridView data={item} />}
                    keyExtractor={(_, index) => index}
                    numColumns={2}
                    key={(item, index) => `${item.category}-${index}`}
                />
            ) : (
                <Loader sourceFile={loaders.catHero} />
            )}
        </SafeAreaView>
    );
};
