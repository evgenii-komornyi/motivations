import React, { useEffect } from 'react';
import { Constants } from '../../constants/constants';

import { ImageBackground, Pressable, View, NativeModules } from 'react-native';
import { CustomText } from '../../components/custom-text/custom-text.component';
import { Icon } from '../../components/icon/icon.component';

import { EditCategoryForm } from '../../components/edit-form/edit-category-form.component';

import { useCategoryLogic } from '../../hooks/categories-tab/useCategoryLogic.hook';

import { styles } from './common-settings.styles';
import { useCategoriesStore } from '../../app/categoriesStore';

const { CacheCleaner } = NativeModules;

export const CategoryItem = ({ data }) => {
    const [
        image,
        isEdit,
        isVisible,
        choosePicture,
        switchVisibility,
        onLongPressHandler,
        setIsEdit,
    ] = useCategoryLogic(data);

    const { isImageUpdated } = useCategoriesStore();

    useEffect(() => {
        CacheCleaner.deleteCache();
    }, [isImageUpdated]);

    return (
        <View
            style={[
                {
                    borderColor: isVisible
                        ? 'rgba(154, 205, 50, 0.8)'
                        : 'rgba(255, 165, 0, 0.8)',
                    backgroundColor: isVisible
                        ? 'rgba(154, 205, 50, 0.8)'
                        : 'rgba(255, 165, 0, 0.4)',
                },
                styles.itemContainer,
            ]}
        >
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={image}
                    imageStyle={{ borderRadius: 10 }}
                    style={styles.image}
                    resizeMode="cover"
                >
                    <Pressable
                        style={styles.chooseButtonContainer}
                        onPress={choosePicture}
                    >
                        <Icon
                            icon="image-search-outline"
                            type={Constants.MATERIALCOMMUNITYICONS_ICON}
                            size={Constants.BIGGER_ICON_SIZE}
                            color="white"
                        />
                    </Pressable>
                </ImageBackground>
            </View>
            <View style={styles.infoContainer}>
                <Pressable onLongPress={onLongPressHandler}>
                    {!isEdit ? (
                        <CustomText style={styles.text} text={data.category} />
                    ) : (
                        <EditCategoryForm item={data} closeForm={setIsEdit} />
                    )}
                </Pressable>
                <View style={styles.visibilityIconContainer}>
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
