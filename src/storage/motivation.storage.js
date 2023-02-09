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

export const getUniqueCategories = async () => {
    try {
        const categories = await readFromStorage(
            Constants.CATEGORIES_STORAGE_KEY
        );

        if (categories === null) {
            await saveToStorage(Constants.CATEGORIES_STORAGE_KEY, [
                { category: Constants.AFFIRMATION },
                { category: Constants.LONELINESS },
                { category: Constants.LOVE },
                { category: Constants.MOTIVATION },
                { category: Constants.QUOTES },
            ]);
        }
        return categories;
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
