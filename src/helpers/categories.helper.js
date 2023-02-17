import { getCategories } from '../storage/motivation.storage';

export const getUniqueCategories = motivations => {
    const uniqueCategories = new Set();

    motivations.map(motivation => uniqueCategories.add(motivation.category));

    return [...uniqueCategories];
};

export const sortCategories = array =>
    array.sort((a, b) => {
        const catA = a.id.toUpperCase();
        const catB = b.id.toUpperCase();

        if (catA < catB) {
            return -1;
        }
        if (catA > catB) {
            return 1;
        }

        return 0;
    });

export const modifyCategories = async (id, modifiedField) => {
    const allCategories = await getCategories();

    const categoryById = allCategories.find(category => category.id === id);

    const modifiedObject = { ...categoryById, ...modifiedField };

    const removedExistsCategory = allCategories.filter(
        category => category.id !== id
    );

    return [...removedExistsCategory, modifiedObject];
};
