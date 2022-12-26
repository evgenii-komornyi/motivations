import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { getUniqueCategories } from '../api/motivations.api';

const categoriesStore = set => ({
    categories: [],
    isLoaded: false,

    fetchCategories: async (cancelationToken, isCancel) => {
        try {
            const { data } = await getUniqueCategories(cancelationToken);
            set({ categories: data, isLoaded: true });
        } catch (error) {
            set({ isLoaded: false });
            if (isCancel(error)) return;
        }
    },
});

export const useCategoriesStore = create(devtools(categoriesStore));
