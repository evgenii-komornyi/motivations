import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { getCategories } from '../storage/motivation.storage';

const categoriesStore = set => ({
    categories: [],
    isLoaded: false,

    fetchCategories: async () => {
        try {
            const categories = await getCategories();
            set({ categories: categories, isLoaded: true });
        } catch (error) {
            set({ isLoaded: false });
        }
    },
});

export const useCategoriesStore = create(devtools(categoriesStore));
