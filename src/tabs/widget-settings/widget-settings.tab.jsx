import React from 'react';
import { Dictionary } from '../../constants/dictionary';
import { Constants } from '../../constants/constants';

import { FlatList, SafeAreaView, View } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';
import { WidgetButton } from '../../components/widget-button/widget-button.component';
import { CategoryItem } from './category-item';

import { useSettingsStore } from '../../app/settingsStore';
import { useCategoriesStore } from '../../app/categoriesStore';

import { sortCategories } from '../../helpers/categories.helper';

import { styles } from './widget-settings.styles';

export const WidgetSettings = () => {
    const { activeMotivations } = useSettingsStore();

    const { categories } = useCategoriesStore();

    const filterActivePhrasesByCategory = (array, category) =>
        array.filter(motivation => motivation.category === category);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <CustomText
                    style={styles.countActiveMotivationsTitle}
                    text={
                        Dictionary[Constants.language].strings.commons
                            .COUNT_ACTIVE
                    }
                />
                <FlatList
                    data={sortCategories(categories)}
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
