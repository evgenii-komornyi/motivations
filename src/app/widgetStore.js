import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { NativeModules } from 'react-native';

import { getAllMotivations } from '../storage/motivation.storage';

const { SharedStorage } = NativeModules;

const widgetStore = (set, get) => ({
    activeMotivations: [],
    isLoaded: false,

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
            set({ isLoaded: false });
        }
    },
    sendToWidget: () => {
        const existsState = get().activeMotivations;

        if (existsState.length !== 0) {
            SharedStorage.setItem(JSON.stringify({ motivations: existsState }));

            set(state => ({ ...state, activeMotivations: [] }));
        }
    },
});

export const useWidgetStore = create(devtools(widgetStore));
