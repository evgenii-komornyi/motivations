import create from 'zustand';

import { devtools } from 'zustand/middleware';

const indexStore = set => ({
    activeIndex: 0,

    setActiveIndex: index => {
        set({
            activeIndex: index,
        });
    },
});

const useIndexStore = create(devtools(indexStore));

export default useIndexStore;
