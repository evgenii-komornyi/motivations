export const getUniqueCategories = motivations => {
    const uniqueCategories = new Set();

    motivations.map(motivation => uniqueCategories.add(motivation.category));

    return [...uniqueCategories];
};
