import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { NativeModules } from 'react-native';

const { SharedStorage } = NativeModules;

import {
    importMotivationsFromDatabase,
    getAllMotivations,
} from '../storage/motivation.storage';

const settingsStore = (set, get) => ({
    motivations: [],
    isImported: true,
    isLoaded: false,
    activeMotivations: [],
    isSent: true,

    fetchAllActiveMotivations: async () => {
        try {
            const allMotivations = await getAllMotivations();
            const allActiveMotivations = allMotivations.filter(
                motivation => motivation.isActive
            );

            set(state => ({
                ...state,
                activeMotivations: allActiveMotivations,
                isLoaded: true,
            }));
        } catch (error) {
            console.warn(error);
            set({ isLoaded: false });
        }
    },
    sendToWidget: () => {
        set({ isSent: false });
        const existsState = get().activeMotivations;

        if (existsState.length !== 0) {
            SharedStorage.setItem(JSON.stringify({ motivations: existsState }));

            setTimeout(() => {
                set({
                    isSent: true,
                });
            }, 4000);
        }
    },

    fetchAllMotivations: async () => {
        try {
            const all = await getAllMotivations();

            set({ motivations: all, isLoaded: true });
        } catch (error) {
            console.warn(error);
            set({ isLoaded: false });
        }
    },
    importToStorage: async content => {
        set({ isImported: false });
        try {
            const isSaved = await importMotivationsFromDatabase(
                JSON.parse(content)
            );

            if (isSaved) {
                setTimeout(() => {
                    set({ isImported: true });
                }, 4000);

                return isSaved;
            }
        } catch (error) {
            console.warn(error);
        }
    },
});

export const useSettingsStore = create(devtools(settingsStore));
