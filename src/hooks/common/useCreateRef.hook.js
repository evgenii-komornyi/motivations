import { useRef } from 'react';

export const useCreateRef = state => {
    const ref = useRef(state);
    ref.current = state;

    return ref;
};
