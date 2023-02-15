import React, { useState } from 'react';

import { FlatList, SafeAreaView, View } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';
import { WidgetButton } from '../../components/widget-button/widget-button.component';

import { useSettingsStore } from '../../app/settingsStore';

import { styles } from './widget-settings.styles';
import { CategoryItem } from './category-item';
import { useCategoriesStore } from '../../app/categoriesStore';

export const WidgetSettings = () => {
    const { activeMotivations } = useSettingsStore();

    const { categories } = useCategoriesStore();

    const filterActivePhrasesByCategory = (array, category) =>
        array.filter(motivation => motivation.category === category);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CustomText
                    style={styles.countActiveMotivationsTitle}
                    text="Количество активных фраз в каждой категории"
                />
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <CategoryItem
                            data={item}
                            length={
                                filterActivePhrasesByCategory(
                                    activeMotivations,
                                    item.id
                                ).length
                            }
                        />
                    )}
                    keyExtractor={(_, index) => index}
                    contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <WidgetButton />
            </View>
        </SafeAreaView>
    );
};
