import create from 'zustand';
import { devtools } from 'zustand/middleware';

import {
    createMotivation,
    deleteMotivation,
    getMotivationsByCategory,
    updateActivation,
    updateMotivation,
} from '../api/motivations.api';
import { isDevelopment } from '../helpers/environment.helper';
import Constants from 'expo-constants';

const motivationsStore = (set, get) => ({
    motivations: [],
    isLoaded: false,
    isSending: false,
    modalVisible: false,

    setIsModalVisible: visibility => {
        set({ modalVisible: visibility });
    },
    fetchMotivations: async (cancelationToken, isCancel, category, userId) => {
        if (isDevelopment) {
            fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}/filter?category=${category}`,
                {
                    headers: {
                        userId: userId,
                    },
                }
            )
                .then(response => response.json())
                .then(data => set({ motivations: data, isLoaded: true }))
                .catch(e => {
                    console.log(e);
                    set({ isLoaded: false });
                });
        } else {
            try {
                if (get().isLoaded) {
                    set({ isLoaded: false });
                }

                const { data } = await getMotivationsByCategory(
                    cancelationToken,
                    category,
                    user
                );

                set({ motivations: data, isLoaded: true });
            } catch (error) {
                set({ isLoaded: false });
                if (isCancel(error)) return;
            }
        }
    },
    saveMotivation: async motivation => {
        if (isDevelopment) {
            set({ isSending: true });
            const response = await fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(motivation),
                }
            );
            if (response.status === 201) {
                set({ isSending: false, modalVisible: true });
            }
        } else {
            set({ isSending: true });
            try {
                const response = await createMotivation(motivation);

                if (response.status === 201) {
                    set({ isSending: false, modalVisible: true });
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    updateMotivation: async (id, newMotivation) => {
        if (isDevelopment) {
            await fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMotivation),
                }
            );
        } else {
            try {
                await updateMotivation(id, newMotivation);
            } catch (error) {
                console.log(error);
            }
        }
    },
    updateActivation: async (id, activation) => {
        if (isDevelopment) {
            await fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}/activation/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(activation),
                }
            );
        } else {
            try {
                await updateActivation(id, activation);
            } catch (error) {
                console.log(error);
            }
        }
    },
    removeMotivation: async id => {
        if (isDevelopment) {
            await fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } else {
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
        }
    },
    unLoad: () => {
        set(state => ({ ...state, isLoaded: false }));
    },
});

export const useMotivationsStore = create(devtools(motivationsStore));
