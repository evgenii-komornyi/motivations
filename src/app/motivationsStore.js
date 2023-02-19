import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { modifyMotivations } from '../helpers/motivations.helper';

import {
    createMotivation,
    getMotivationsByCategory,
    updateMotivation,
    updateActivation,
    deleteMotivation,
    getAllMotivations,
    propagateVisibility,
} from '../storage/motivation.storage';

const motivationsStore = (set, get) => ({
    motivations: [],
    isLoaded: false,
    isSending: false,
    modalVisible: false,

    setIsModalVisible: visibility => {
        set({ modalVisible: visibility });
    },
    fetchAllMotivations: async () => {
        const allMotivations = await getAllMotivations();

        set({ motivations: allMotivations });
    },
    fetchMotivationsByCategory: async category => {
        try {
            if (get().isLoaded) {
                set({ isLoaded: false });
            }

            const motivationsByCategory = await getMotivationsByCategory(
                category
            );

            setTimeout(() => {
                set({
                    motivations: motivationsByCategory,
                    isLoaded: true,
                });
            }, 2000);
        } catch (error) {
            set({ isLoaded: false });
        }
    },
    saveMotivation: async motivation => {
        set({ isSending: true });

        try {
            const existsMotivations = await getAllMotivations();
            const newMotivations = [...existsMotivations, motivation];

            const isSaved = await createMotivation(newMotivations);

            if (isSaved) {
                setTimeout(() => {
                    set({ motivations: newMotivations, isSending: false });
                }, 2000);
            }
        } catch (error) {
            console.warn(error);
        }
    },
    updateMotivation: async (id, newMotivation, category) => {
        set({ isSending: true });

        try {
            const modifiedMotivations = await modifyMotivations(category, id, {
                title: newMotivation.title,
            });

            const isSaved = await updateMotivation(modifiedMotivations);
            if (isSaved) {
                set({
                    motivations: modifiedMotivations.filter(
                        item => item.category === category
                    ),
                });
                setTimeout(() => {
                    set({ isSending: false });
                }, 1000);
            }
        } catch (error) {
            console.warn(error);
        }
    },
    updateActivation: async (id, activation, category) => {
        set({ isSending: true });

        try {
            const modifiedMotivations = await modifyMotivations(category, id, {
                isActive: activation.isActive,
            });

            const isSaved = await updateActivation(modifiedMotivations);
            if (isSaved) {
                set({
                    motivations: modifiedMotivations.filter(
                        item => item.category === category
                    ),
                });
                setTimeout(() => {
                    set({ isSending: false });
                }, 1000);
            }
        } catch (error) {
            console.warn(error);
        }
    },
    propagateVisibility: async (categoryName, visibility) => {
        try {
            const allMotivations = await getAllMotivations();

            const motivationsByCategory = allMotivations.filter(
                motivation => motivation.category === categoryName
            );

            if (motivationsByCategory.length !== 0) {
                const modifiedMotivations = motivationsByCategory.map(
                    motivation => ({ ...motivation, isActive: visibility })
                );

                const removedExistsMotivations = allMotivations.filter(
                    motivation => motivation.category !== categoryName
                );

                const newMotivations = [
                    ...removedExistsMotivations,
                    ...modifiedMotivations,
                ];

                const isSaved = await propagateVisibility(newMotivations);

                if (isSaved) {
                    set({ motivations: newMotivations });
                }
            }
        } catch (error) {
            console.warn(error);
        }
    },
    removeMotivation: async (id, category) => {
        try {
            const allMotivations = await getAllMotivations();
            const modifiedMotivations = allMotivations.filter(
                motivation => motivation._id !== id
            );

            const isSaved = await deleteMotivation(modifiedMotivations);

            if (isSaved) {
                set({
                    motivations: modifiedMotivations.filter(
                        item => item.category === category
                    ),
                });
            }
        } catch (error) {
            console.warn(error);
        }
    },
    unLoad: () => {
        set(state => ({ ...state, isLoaded: false }));
    },
});

export const useMotivationsStore = create(devtools(motivationsStore));
