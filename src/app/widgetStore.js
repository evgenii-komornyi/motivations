import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { NativeModules } from 'react-native';

import { getMotivations } from '../api/motivations.api';

const { SharedStorage } = NativeModules;

const widgetStore = (set, get) => ({
    activeMotivations: [],
    isLoaded: false,

    fetchAllActiveMotivations: async (cancelToken, isCancel) => {
        try {
            const { data } = await getMotivations(cancelToken);

            set(state => ({
                ...state,
                activeMotivations: data,
                isLoaded: true,
            }));
        } catch (error) {
            set({ isLoaded: false });
            if (isCancel(error)) return;
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
