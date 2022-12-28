import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { getUniqueCategories } from '../api/motivations.api';
import { isDevelopment } from '../helpers/environment.helper';
import Constants from 'expo-constants';

const categoriesStore = set => ({
    categories: [],
    isLoaded: false,

    fetchCategories: async (cancelationToken, isCancel) => {
        if (isDevelopment) {
            fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}/categories`
            )
                .then(response => response.json())
                .then(data => set({ categories: data, isLoaded: true }))
                .catch(e => set({ isLoaded: false }));
        } else {
            try {
                const { data } = await getUniqueCategories(cancelationToken);
                set({ categories: data, isLoaded: true });
            } catch (error) {
                set({ isLoaded: false });
                if (isCancel(error)) return;
            }
        }
    },
});

export const useCategoriesStore = create(devtools(categoriesStore));
