import { useState } from 'react';
import { Dictionary } from '../../constants/dictionary';
import { Constants } from '../../constants/constants';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { useCategoriesStore } from '../../app/categoriesStore';
import { useMotivationsStore } from '../../app/motivationsStore';

import { useToast } from '../common/useToast.hook';
import { useAlert } from '../common/useAlert.hook';
import { useCreateRef } from '../common/useCreateRef.hook';

const categoriesDirectory = `${FileSystem.documentDirectory}categories/`;

export const useCategoryLogic = data => {
    const [image, setImage] = useState(data.image);
    const [isEdit, setIsEdit] = useState(false);
    const { updateCategoryVisibility, updateImage } = useCategoriesStore();
    const { propagateVisibility } = useMotivationsStore();

    const toastCaller = useToast();
    const alertCaller = useAlert();

    const choosePicture = async () => {
        try {
            const { name, mimeType, type, uri } =
                await DocumentPicker.getDocumentAsync({});

            checkIsFileChosen(type);
            checkFileFormat(mimeType);

            const extension = getExtension(name);

            const isDirectoryExists = await checkIsExists(categoriesDirectory);

            if (!isDirectoryExists) {
                await FileSystem.makeDirectoryAsync(categoriesDirectory, {
                    intermediates: true,
                });
            }

            const existingFileExtension = data.image.uri.split('.');

            const isFileExists = await checkIsExists(
                `${categoriesDirectory}${data.id}.${
                    existingFileExtension[existingFileExtension.length - 1]
                }`
            );

            if (isFileExists) {
                await FileSystem.deleteAsync(
                    `${categoriesDirectory}${data.id}.${
                        existingFileExtension[existingFileExtension.length - 1]
                    }`
                );
            }

            copyFile(uri, `${categoriesDirectory}${data.id}.${extension}`);

            const dir = await FileSystem.readDirectoryAsync(
                categoriesDirectory
            );

            const img = dir.find(file => file === `${data.id}.${extension}`);

            const imageUri = {
                uri: `${categoriesDirectory}${img}`,
            };

            setImage(imageUri);
            updateImage(data.id, imageUri);

            alertCaller(
                Dictionary[Constants.language].strings.alerts.SAVED + '!',
                Dictionary[Constants.language].strings.alerts.RESTART_APP + '.',
                [
                    {
                        text: Dictionary[Constants.language].buttons.OK,
                        onPress: () => null,
                        style: 'cancel',
                    },
                ]
            );
        } catch (error) {
            console.warn(error);
        }
    };

    const checkIsFileChosen = type => {
        if (type === 'cancel') {
            toastCaller(
                Dictionary[Constants.language].strings.toasts.NO_FILE_SELECTED
            );

            return;
        }
    };

    const checkFileFormat = mimeType => {
        if (
            mimeType !== 'image/jpeg' &&
            mimeType !== 'image/png' &&
            mimeType !== 'image/x-png' &&
            mimeType !== 'image/gif'
        ) {
            toastCaller(
                Dictionary[Constants.language].strings.toasts.INVALID_FORMAT
            );

            return;
        }
    };

    const getExtension = name => {
        if (!name) {
            return;
        }

        const splitted = name.split('.');

        return splitted[splitted.length - 1];
    };

    const checkIsExists = async path => {
        const { exists } = await FileSystem.getInfoAsync(path);

        return exists;
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
