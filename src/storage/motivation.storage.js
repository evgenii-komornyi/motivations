import { Constants } from '../constants/constants';
import { readFromStorage, saveToStorage } from '../helpers/storage.helper';

export const createMotivation = async motivations => {
    try {
        await save(Constants.MOTIVATIONS_STORAGE_KEY, motivations);

        return true;
    } catch (error) {
        console.warn(error.message);

        return false;
    }
};

export const propagateVisibility = async newMotivations => {
    try {
        await save(Constants.MOTIVATIONS_STORAGE_KEY, newMotivations);

        return true;
    } catch (error) {
        console.warn(error.message);

        return false;
    }
};

export const getCategories = async () => {
    try {
        const categoriesInStorage = await read(
            Constants.CATEGORIES_STORAGE_KEY
        );

        if (categoriesInStorage === null) {
            await save(Constants.CATEGORIES_STORAGE_KEY, [
                Constants.CATEGORY_1,
                Constants.CATEGORY_2,
                Constants.CATEGORY_3,
                Constants.CATEGORY_4,
                Constants.CATEGORY_5,
                Constants.CATEGORY_6,
            ]);

            const newCategories = await read(Constants.CATEGORIES_STORAGE_KEY);

            return newCategories;
        } else {
            return categoriesInStorage;
        }
    } catch (error) {
        console.warn(error);
    }
};

export const updateCategory = async modifiedCategories => {
    try {
        await save(Constants.CATEGORIES_STORAGE_KEY, modifiedCategories);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

export const updateCategoryImage = async modifiedCategories => {
    try {
        await save(Constants.CATEGORIES_STORAGE_KEY, modifiedCategories);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

export const updateCategoryVisibility = async modifiedCategories => {
    try {
        await save(Constants.CATEGORIES_STORAGE_KEY, modifiedCategories);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

export const getAllMotivations = async () => {
    try {
        const items = await read(Constants.MOTIVATIONS_STORAGE_KEY);

        return items !== null ? items : [];
    } catch (error) {
        console.warn(error);
    }
};

export const getMotivationsByCategory = async category => {
    try {
        const items = await read(Constants.MOTIVATIONS_STORAGE_KEY);

        return items !== null
            ? items.filter(item => item.category === category)
            : [];
    } catch (error) {
        console.warn(error);
    }
};

export const updateMotivation = async modifiedMotivations => {
    try {
        await save(Constants.MOTIVATIONS_STORAGE_KEY, modifiedMotivations);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

export const updateActivation = async modifiedMotivations => {
    try {
        await save(Constants.MOTIVATIONS_STORAGE_KEY, modifiedMotivations);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

export const deleteMotivation = async modifiedMotivations => {
    try {
        await save(Constants.MOTIVATIONS_STORAGE_KEY, modifiedMotivations);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

export const importDataToDatabase = async ({ categories, motivations }) => {
    try {
        await save(Constants.CATEGORIES_STORAGE_KEY, categories);
        await save(Constants.MOTIVATIONS_STORAGE_KEY, motivations);

        return true;
    } catch (error) {
        console.warn(error);

        return false;
    }
};

const save = async (key, value) => {
    try {
        await saveToStorage(key, value);
    } catch (error) {
        console.warn(error);
    }
};

const read = async key => {
    try {
        return await readFromStorage(key);
    } catch (error) {
        console.warn(error);
    }
};
