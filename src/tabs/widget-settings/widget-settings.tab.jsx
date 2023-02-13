import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSettingsStore } from '../../app/settingsStore';
import { CustomText } from '../../components/custom-text/custom-text.component';

import { WidgetButton } from '../../components/widget-button/widget-button.component';
import { getUniqueCategories } from '../../helpers/categories.helper';

import { styles } from './widget-settings.styles';

export const WidgetSettings = () => {
    const { fetchAllActiveMotivations, activeMotivations, motivations } =
        useSettingsStore();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAllActiveMotivations();

        if (activeMotivations.length !== 0) {
            setCategories(getUniqueCategories(motivations));
        }
    }, [activeMotivations]);

    const filterActivePhrasesByCategory = (array, category) =>
        array.filter(motivation => motivation.category === category);

    return (
        <View style={styles.container}>
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
                <View style={styles.gridCategories}>
                    {categories.map((category, index) => (
                        <>
                            <CustomText
                                key={index}
                                style={styles.byCategory}
                                text={`${category}`}
                            />
                            <CustomText
                                style={styles.count}
                                text={`${
                                    filterActivePhrasesByCategory(
                                        activeMotivations,
                                        category
                                    ).length
                                } phrase${
                                    filterActivePhrasesByCategory(
                                        activeMotivations,
                                        category
                                    ).length === 1
                                        ? ''
                                        : 's'
                                }`}
                            />
                        </>
                    ))}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <WidgetButton />
            </View>
        </View>
    );
};
