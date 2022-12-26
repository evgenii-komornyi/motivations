import React, { useEffect } from 'react';
import { useParams } from 'react-router-native';
import { View, SafeAreaView, FlatList, Text, Pressable } from 'react-native';

import { useMotivationsStore } from '../../app/motivationsStore';
import { getCategoryTitleByName } from '../../helpers/categories.helper';

import { useCancelToken } from '../../hooks/useCancelToken';

import { Loader } from '../loader/loader.component';
import { Item } from './item.component';

import { styles } from './motivations-by-category.styles';
import { loaders } from '../../helpers/loader.helper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ModalWindow } from '../modal/modal.component';
import { NewMotivationForm } from '../new-motivation-form/new-motivation-form.component';

export const MotivationsByCategory = () => {
    const params = useParams();
    const {
        isLoaded,
        motivations,
        fetchMotivations,
        unLoad,
        modalVisible,
        setIsModalVisible,
    } = useMotivationsStore();
    const { newCancelToken, isCancel } = useCancelToken();

    useEffect(() => {
        fetchMotivations(newCancelToken(), isCancel, params.category);

        return () => unLoad();
    }, [newCancelToken, isCancel, params.category]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoaded ? (
                <>
                    <View>
                        <Text style={styles.category}>
                            {getCategoryTitleByName(params.category)}
                        </Text>
                    </View>
                    <FlatList
                        data={motivations}
                        renderItem={({ item }) => (
                            <Item item={item} category={params.category} />
                        )}
                        keyExtractor={item => item._id}
                    />
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
                            <FontAwesomeIcon
                                icon="fa-solid fa-plus"
                                size={40}
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
