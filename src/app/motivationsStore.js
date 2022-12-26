import create from 'zustand';
import { devtools } from 'zustand/middleware';

import {
    createMotivation,
    deleteMotivation,
    getMotivations,
    getMotivationsByCategory,
    updateActivation,
    updateMotivation,
} from '../api/motivations.api';

const motivationsStore = (set, get) => ({
    motivations: [],
    isLoaded: false,
    isSending: false,
    modalVisible: false,

    setIsModalVisible: visibility => {
        set({ modalVisible: visibility });
    },
    fetchMotivations: async (cancelationToken, isCancel, category) => {
        try {
            if (get().isLoaded) {
                set({ isLoaded: false });
            }

            const { data } = await getMotivationsByCategory(
                cancelationToken,
                category
            );

            set({ motivations: data, isLoaded: true });
        } catch (error) {
            set({ isLoaded: false });
            if (isCancel(error)) return;
        }
    },
    saveMotivation: async motivation => {
        set({ isSending: true });

        try {
            const response = await createMotivation(motivation);

            if (response.status === 201) {
                set({ isSending: false, modalVisible: true });
            }
        } catch (error) {
            console.log(error);
        }
    },
    updateMotivation: async (id, newMotivation) => {
        try {
            await updateMotivation(id, newMotivation);
        } catch (error) {
            console.log(error);
        }
    },
    updateActivation: async (id, activation) => {
        try {
            await updateActivation(id, activation);
        } catch (error) {
            console.log(error);
        }
    },
    removeMotivation: async id => {
        try {
            await deleteMotivation(id);

            set(state => ({
                ...state,
                motivations: state.motivations.filter(
                    motivation => motivation._id !== id
                ),
            }));
        } catch (error) {
            console.log(error);
        }
    },
    unLoad: () => {
        set(state => ({ ...state, isLoaded: false }));
    },
});

export const useMotivationsStore = create(devtools(motivationsStore));
