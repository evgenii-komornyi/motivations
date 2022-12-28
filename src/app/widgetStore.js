import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { NativeModules } from 'react-native';

import { getMotivations } from '../api/motivations.api';
import { isDevelopment } from '../helpers/environment.helper';
import Constants from 'expo-constants';

const { SharedStorage } = NativeModules;

const widgetStore = (set, get) => ({
    activeMotivations: [],
    isLoaded: false,

    fetchAllActiveMotivations: async (cancelToken, isCancel, userId) => {
        if (isDevelopment) {
            fetch(
                `${Constants.expoConfig.extra.eas.LOCAL_HOST}${Constants.expoConfig.extra.eas.MOTIVATIONS_API}`,
                {
                    headers: {
                        userId: userId,
                    },
                }
            )
                .then(response => response.json())
                .then(data => set({ activeMotivations: data, isLoaded: true }))
                .catch(e => {
                    console.log(e);
                    set({ isLoaded: false });
                });
        } else {
            try {
                const { data } = await getMotivations(cancelToken, userId);

                set(state => ({
                    ...state,
                    activeMotivations: data,
                    isLoaded: true,
                }));
            } catch (error) {
                set({ isLoaded: false });
                if (isCancel(error)) return;
            }
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
