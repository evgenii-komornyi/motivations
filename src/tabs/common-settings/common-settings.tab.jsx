import React from 'react';

import { FlatList, SafeAreaView, View } from 'react-native';
import { useCategoriesStore } from '../../app/categoriesStore';
import { CategoryItem } from './category-item';

import { styles } from './common-settings.styles';

export const CommonSettings = () => {
    const { categories } = useCategoriesStore();

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CategoryItem data={item} />}
                    keyExtractor={(_, index) => index}
                    contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
                />
            </View>
            {/* <View style={styles.buttonContainer}>
            </View> */}
        </SafeAreaView>
    );
};
