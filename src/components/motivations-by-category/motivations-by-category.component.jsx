import React, { useEffect } from 'react';
import { Constants } from '../../constants/constants';
import { useParams } from 'react-router-native';

import { View, SafeAreaView, FlatList, Text, Pressable } from 'react-native';
import { ModalWindow } from '../modal/modal.component';
import { NewMotivationForm } from '../new-motivation-form/new-motivation-form.component';
import { Loader } from '../loader/loader.component';
import { Item } from './item.component';
import { Icon } from '../icon/icon.component';

import { useMotivationsStore } from '../../app/motivationsStore';
import { getCategoryTitleByName } from '../../helpers/categories.helper';

import { loaders } from '../../helpers/loader.helper';

import { styles } from './motivations-by-category.styles';

export const MotivationsByCategory = () => {
    const params = useParams();

    const {
        fetchMotivationsByCategory,
        isLoaded,
        motivations,
        unLoad,
        modalVisible,
        setIsModalVisible,
    } = useMotivationsStore();

    useEffect(() => {
        fetchMotivationsByCategory(params.category);

        return () => unLoad();
    }, [params.category]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoaded ? (
                <>
                    <View>
                        <Text style={styles.category}>
                            {getCategoryTitleByName(params.category).text}
                        </Text>
                    </View>
                    {motivations.length !== 0 ? (
                        <FlatList
                            data={motivations}
                            renderItem={({ item }) => (
                                <Item item={item} category={params.category} />
                            )}
                            keyExtractor={item => item._id}
                        />
                    ) : (
                        <View>
                            <Text style={styles.category}>
                                Вы - новый пользователь! Добавьте свои фразы в
                                базу!
                            </Text>
                        </View>
                    )}
                    <View style={styles.createContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'rgba(0, 0, 0, 0.2)'
                                        : 'white',
                                },
                                styles.createButton,
                            ]}
                            onPress={() => setIsModalVisible(true)}
                        >
                            <Icon
                                type={Constants.ICON_TYPE_SOLID}
                                icon="plus"
                                size={Constants.BIGGEST_ICON_SIZE}
                            />
                        </Pressable>
                    </View>
                    <ModalWindow
                        modalVisible={modalVisible}
                        setModalVisible={setIsModalVisible}
                    >
                        <NewMotivationForm category={params.category} />
                    </ModalWindow>
                </>
            ) : (
                <Loader sourceFile={loaders.catInBox} />
            )}
        </SafeAreaView>
    );
};
