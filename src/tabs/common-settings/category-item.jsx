import React, { useState } from 'react';
import { ImageBackground, Pressable, View } from 'react-native';
import { useCategoriesStore } from '../../app/categoriesStore';
import { CustomText } from '../../components/custom-text/custom-text.component';
import { Icon } from '../../components/icon/icon.component';
import { Constants } from '../../constants/constants';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { useCreateRef } from '../../hooks/useCreateRef';

import { styles } from './common-settings.styles';
import { useToast } from '../../hooks/useToast';

export const CategoryItem = ({ data }) => {
    const [image, setImage] = useState(data.image);
    const { updateCategoryVisibility, updateImage } = useCategoriesStore();

    const toastCaller = useToast();

    const choosePicture = async () => {
        try {
            const { name, mimeType, type, uri } =
                await DocumentPicker.getDocumentAsync({});

            console.log(mimeType);
            if (type === 'cancel') {
                toastCaller('Файл не выбран!');

                return;
            }

            if (
                mimeType !== 'image/jpeg' &&
                mimeType !== 'image/png' &&
                mimeType !== 'image/x-png' &&
                mimeType !== 'image/gif'
            ) {
                toastCaller('Файл не является картинкой! Выберите картинку!');

                return;
            }

            const splitted = name.split('.');

            const extension = splitted[splitted.length - 1];

            const { exists } = await FileSystem.getInfoAsync(
                FileSystem.documentDirectory + 'categories/'
            );

            if (!exists) {
                await FileSystem.makeDirectoryAsync(
                    FileSystem.documentDirectory + 'categories/'
                );
            }

            await FileSystem.copyAsync({
                from: uri,
                to: `${FileSystem.documentDirectory}categories/${data.id}.${extension}`,
            });

            const dir = await FileSystem.readDirectoryAsync(
                FileSystem.documentDirectory + 'categories/'
            );

            const img = dir.find(file => file === `${data.id}.${extension}`);

            const imageUri = {
                uri: `${FileSystem.documentDirectory}categories/${img}`,
            };

            setImage(imageUri);
            updateImage(data.id, imageUri);
        } catch (error) {
            console.warn(error);
        }
    };

    const [isVisible, setIsVisible] = useState(data.isVisible);
    const currentIsVisible = useCreateRef(isVisible);

    const switchVisibility = () => {
        setIsVisible(prev => !prev);

        setTimeout(() => {
            updateCategoryVisibility(data.id, {
                isVisible: currentIsVisible.current,
            });
        }, 1);
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                padding: 10,
                borderRadius: 20,
                marginBottom: 5,
                borderWidth: 1,
                borderColor: data.isVisible
                    ? 'rgba(154, 205, 50, 0.8)'
                    : 'rgba(255, 165, 0, 0.8)',
                backgroundColor: data.isVisible
                    ? 'rgba(154, 205, 50, 0.8)'
                    : 'rgba(255, 165, 0, 0.4)',
            }}
        >
            <View style={{ width: 100, height: 100 }}>
                <ImageBackground
                    source={image}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.image}
                    resizeMode="cover"
                >
                    <Pressable onPress={choosePicture}>
                        <Icon
                            icon="image-search-outline"
                            type={Constants.MATERIALCOMMUNITYICONS_ICON}
                            size={Constants.BIGGER_ICON_SIZE}
                            color="white"
                        />
                    </Pressable>
                </ImageBackground>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <CustomText style={styles.text} text={data.category} />
                <View
                    style={{
                        flex: 0.8,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Pressable onPress={switchVisibility}>
                        <Icon
                            icon={`${isVisible ? 'eye-off' : 'eye'}-outline`}
                            type={Constants.MATERIALCOMMUNITYICONS_ICON}
                            size={Constants.BIG_ICON_SIZE}
                            color="black"
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
