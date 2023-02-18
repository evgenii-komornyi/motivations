import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { modifyCategories } from '../helpers/categories.helper';

import {
    getCategories,
    updateCategory,
    updateCategoryImage,
    updateCategoryVisibility,
} from '../storage/motivation.storage';

const categoriesStore = set => ({
    categories: [],
    isLoaded: false,

    fetchCategories: async () => {
        try {
            const categories = await getCategories();

            set({ categories: categories ? categories : [], isLoaded: true });
        } catch (error) {
            set({ isLoaded: false });
        }
    },
    updateImage: async (id, imageUri) => {
        try {
            const modifiedCategories = await modifyCategories(id, {
                image: imageUri,
            });

            const isSaved = await updateCategoryImage(modifiedCategories);

            if (isSaved) {
                set({ categories: modifiedCategories });
            }
        } catch (error) {
            console.warn(error);
        }
    },
    updateCategory: async (id, newCategory) => {
        try {
            const modifiedCategories = await modifyCategories(id, {
                category: newCategory.category,
            });

            const isSaved = await updateCategory(modifiedCategories);

            if (isSaved) {
                set({ categories: modifiedCategories });
            }
        } catch (error) {
            console.warn(error);
        }
    },
    updateCategoryVisibility: async (id, visibility) => {
        try {
            const modifiedCategories = await modifyCategories(id, {
                isVisible: visibility.isVisible,
            });

            const isSaved = await updateCategoryVisibility(modifiedCategories);

            if (isSaved) {
                set({ categories: modifiedCategories });
            }
        } catch (error) {
            console.warn(error);
        }
    },
});

export const useCategoriesStore = create(devtools(categoriesStore));
