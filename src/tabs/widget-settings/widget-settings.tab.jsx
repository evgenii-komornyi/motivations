import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';
import { WidgetButton } from '../../components/widget-button/widget-button.component';

import { useSettingsStore } from '../../app/settingsStore';
import { useMotivationsStore } from '../../app/motivationsStore';

import { getUniqueCategories } from '../../helpers/categories.helper';

import { styles } from './widget-settings.styles';

export const WidgetSettings = () => {
    const { fetchAllActiveMotivations, activeMotivations } = useSettingsStore();

    const { motivations, fetchAllMotivations } = useMotivationsStore();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAllActiveMotivations();
        fetchAllMotivations();

        if (activeMotivations.length !== 0) {
            setCategories(getUniqueCategories(motivations));
        }
    }, [activeMotivations, motivations]);

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
                {categories.map((category, index) => (
                    <View style={styles.gridCategories} key={index}>
                        <CustomText
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
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <WidgetButton />
            </View>
        </View>
    );
};
