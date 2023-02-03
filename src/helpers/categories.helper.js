export const getCategoryTitleByName = category => {
    const categories = new Map();
    categories.set('loneliness', {
        text: 'Одиночество',
        image: require('../../assets/backgrounds/loneliness.jpg'),
    });
    categories.set('love', {
        text: 'Любовь',
        image: require('../../assets/backgrounds/love.jpg'),
    });
    categories.set('quotes', {
        text: 'Цитаты',
        image: require('../../assets/backgrounds/quotes.jpg'),
    });
    categories.set('affirmation', {
        text: 'Аффирмация',
        image: require('../../assets/backgrounds/affirmation.jpg'),
    });
    categories.set('motivation', {
        text: 'Мотивация',
        image: require('../../assets/backgrounds/motivation.jpg'),
    });

    return categories.get(category);
};
