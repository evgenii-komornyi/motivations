export const getCategoryTitleByName = category => {
    const categories = new Map();
    categories.set('loneliness', 'Одиночество');
    categories.set('love', 'Любовь');
    categories.set('quotes', 'Цитаты');
    categories.set('affirmation', 'Аффирмация');
    categories.set('motivation', 'Мотивация');

    return categories.get(category);
};
