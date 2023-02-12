import React, { useEffect } from 'react';
import { Constants } from '../../constants/constants';
import { useNavigate, useParams } from 'react-router-native';

import { View, SafeAreaView, FlatList, Pressable } from 'react-native';
import { Header } from 'react-native-elements';
import { ModalWindow } from '../modal/modal.component';
import { NewMotivationForm } from '../new-motivation-form/new-motivation-form.component';
import { Loader } from '../loader/loader.component';
import { Item } from './item.component';
import { Icon } from '../icon/icon.component';
import { CustomText } from '../custom-text/custom-text.component';

import { useMotivationsStore } from '../../app/motivationsStore';
import { getCategoryTitleByName } from '../../helpers/categories.helper';

import { loaders } from '../../helpers/loader.helper';

import { styles } from './motivations-by-category.styles';
import { styles as globalStyles } from '../../styles/globalStyle';

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

    const navigate = useNavigate();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoaded ? (
                <>
                    <Header
                        containerStyle={{
                            backgroundColor: 'black',
                            height: 50,
                        }}
                        leftComponent={
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? 'rgba(255, 165, 0, 1)'
                                            : 'transparent',
                                    },
                                    globalStyles.button,
                                ]}
                                onPress={() => navigate(-1)}
                            >
                                <Icon
                                    type={Constants.IONICONS_ICON}
                                    icon="arrow-back"
                                    size={Constants.SMALL_ICON_SIZE}
                                    color="white"
                                />
                            </Pressable>
                        }
                        centerComponent={{
                            text: getCategoryTitleByName(params.category).text,
                            style: {
                                color: '#fff',
                                fontSize: 20,
                                fontWeight: 'bold',
                            },
                        }}
                        rightComponent={
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                            ? 'rgba(255, 165, 0, 1)'
                                            : 'transparent',
                                    },
                                    globalStyles.button,
                                ]}
                                onPress={() => setIsModalVisible(true)}
                            >
                                <Icon
                                    type={Constants.MATERIALCOMMUNITYICONS_ICON}
                                    icon="notebook-plus-outline"
                                    size={Constants.SMALL_ICON_SIZE}
                                    color="white"
                                />
                            </Pressable>
                        }
                    />
                    {motivations.length !== 0 ? (
                        <FlatList
                            data={motivations}
                            renderItem={({ item }) => (
                                <Item item={item} category={params.category} />
                            )}
                            keyExtractor={item => item._id}
                            style={{ marginTop: 10 }}
                        />
                    ) : (
                        <View>
                            <CustomText
                                style={styles.category}
                                text="Вы - новый пользователь! Добавьте свои фразы в
                                базу!"
                            />
                        </View>
                    )}
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
