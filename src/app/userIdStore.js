import create from 'zustand';
import { devtools } from 'zustand/middleware';

const userIdStore = set => ({
    userId: '',

    setUserId: userId => {
        set({ userId: userId });
    },
});

export const useUserIdStore = create(devtools(userIdStore));
