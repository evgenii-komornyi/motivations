import { getAllMotivations } from '../storage/motivation.storage';

export const modifyMotivations = async (category, id, modifiedField) => {
    const allMotivations = await getAllMotivations();

    const motivationById = allMotivations
        .filter(item => item.category === category)
        .find(item => item._id === id);

    const modifiedObject = { ...motivationById, ...modifiedField };

    const removedExistsMotivation = allMotivations.filter(
        item => item._id !== id
    );

    return [...removedExistsMotivation, modifiedObject];
};
