import { ToastAndroid } from 'react-native';

export const useToast = () => {
    const callToast = text => {
        ToastAndroid.showWithGravityAndOffset(
            text,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    return callToast;
};
