import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { getUniqueCategories } from '../storage/motivation.storage';

const categoriesStore = set => ({
    categories: [],
    isLoaded: false,

    fetchCategories: async () => {
        try {
            const categories = await getUniqueCategories();
            set({ categories: categories, isLoaded: true });
        } catch (error) {
            set({ isLoaded: false });
        }
    },
});

export const useCategoriesStore = create(devtools(categoriesStore));
