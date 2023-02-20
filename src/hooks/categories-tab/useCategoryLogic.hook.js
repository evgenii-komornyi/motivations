import { useState } from 'react';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { useCategoriesStore } from '../../app/categoriesStore';
import { useMotivationsStore } from '../../app/motivationsStore';

import { useToast } from '../common/useToast.hook';
import { useCreateRef } from '../common/useCreateRef.hook';

export const useCategoryLogic = data => {
    const [image, setImage] = useState(data.image);
    const [isEdit, setIsEdit] = useState(false);
    const { updateCategoryVisibility, updateImage } = useCategoriesStore();
    const { propagateVisibility } = useMotivationsStore();

    const toastCaller = useToast();

    const choosePicture = async () => {
        try {
            const { name, uri } = await pickDocument();

            const splitted = name.split('.');

            const extension = splitted[splitted.length - 1];

            const categoriesDirectory = `${FileSystem.documentDirectory}categories/`;

            const { exists: isDirectoryExists } = await FileSystem.getInfoAsync(
                categoriesDirectory
            );

            if (!isDirectoryExists) {
                await FileSystem.makeDirectoryAsync(categoriesDirectory, {
                    intermediates: true,
                });
            }

            await copyFile(
                uri,
                `${categoriesDirectory}${data.id}.${extension}`
            );

            const dir = await FileSystem.readDirectoryAsync(
                FileSystem.documentDirectory + 'categories/'
            );

            const img = dir.find(file => file === `${data.id}.${extension}`);

            const imageUri = {
                uri: `${FileSystem.documentDirectory}categories/${img}`,
            };

            setImage(imageUri);
            updateImage(data.id, imageUri);

            await FileSystem.deleteAsync(
                FileSystem.cacheDirectory + 'DocumentPicker/'
            );
        } catch (error) {
            console.warn(error);
        }
    };

    const pickDocument = async () => {
        const { name, mimeType, type, uri } =
            await DocumentPicker.getDocumentAsync({});

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

        return { name, uri };
    };

    const copyFile = async (from, to) => {
        await FileSystem.copyAsync({
            from: from,
            to: to,
        });
    };

    const [isVisible, setIsVisible] = useState(data.isVisible);
    const currentIsVisible = useCreateRef(isVisible);

    const switchVisibility = () => {
        setIsVisible(prev => !prev);

        setTimeout(() => {
            updateCategoryVisibility(data.id, {
                isVisible: currentIsVisible.current,
            });
            propagateVisibility(data.id, currentIsVisible.current);
        }, 1);
    };

    const onLongPressHandler = () => {
        setIsEdit(true);
    };

    return [
        image,
        isEdit,
        isVisible,
        choosePicture,
        switchVisibility,
        onLongPressHandler,
        setIsEdit,
    ];
};
