import { Constants } from '../constants/constants';
import { readFromStorage, saveToStorage } from '../helpers/storage.helper';

export const createMotivation = async motivations => {
    try {
        await saveToStorage(Constants.MOTIVATIONS_STORAGE_KEY, motivations);

        return true;
    } catch (error) {
        console.warn(error.message);

        return false;
    }
};

export const getCategories = async () => {
    try {
        const categories = await readFromStorage(
            Constants.CATEGORIES_STORAGE_KEY
        );

        if (categories === null) {
            await saveToStorage(Constants.CATEGORIES_STORAGE_KEY, [
                Constants.CATEGORY_1,
                Constants.CATEGORY_2,
                Constants.CATEGORY_3,
                Constants.CATEGORY_4,
                Constants.CATEGORY_5,
                Constants.CATEGORY_6,
            ]);
        }

        return categories && categories.filter(category => category.isVisible);
    } catch (error) {
        console.warn(error);
    }
};

export const getAllMotivations = async () => {
    try {
        const items = await readFromStorage(Constants.MOTIVATIONS_STORAGE_KEY);

        return items !== null ? items : [];
    } catch (error) {
        console.warn(error);
    }
};

export const getMotivationsByCategory = async category => {
    try {
        const items = await readFromStorage(Constants.MOTIVATIONS_STORAGE_KEY);

        return items !== null
            ? items.filter(item => item.category === category)
            : [];
    } catch (error) {
        console.warn(error);
    }
};

export const updateMotivation = async modifiedMotivations => {
    try {
        const isSaved = await saveToStorage(
            Constants.MOTIVATIONS_STORAGE_KEY,
            modifiedMotivations
        );
        return isSaved;
    } catch (error) {
        console.warn(error);
    }
};

export const updateActivation = async modifiedMotivations => {
    try {
        const isSaved = await saveToStorage(
            Constants.MOTIVATIONS_STORAGE_KEY,
            modifiedMotivations
        );
        return isSaved;
    } catch (error) {
        console.warn(error);
    }
};

export const deleteMotivation = async modifiedMotivations => {
    try {
        const isSaved = await saveToStorage(
            Constants.MOTIVATIONS_STORAGE_KEY,
            modifiedMotivations
        );
        return isSaved;
    } catch (error) {
        console.warn(error);
    }
};

export const importMotivationsFromDatabase = async database => {
    try {
        const isSaved = await saveToStorage(
            Constants.MOTIVATIONS_STORAGE_KEY,
            database
        );

        return isSaved;
    } catch (error) {
        console.warn(error);

        return false;
    }
};
