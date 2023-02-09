import create from 'zustand';
import { devtools } from 'zustand/middleware';

import {
    importMotivationsFromDatabase,
    getAllMotivations,
} from '../storage/motivation.storage';

const settingsStore = set => ({
    motivations: [],
    isImported: true,

    fetchAllMotivations: async () => {
        const all = await getAllMotivations();

        set({ motivations: all });
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
