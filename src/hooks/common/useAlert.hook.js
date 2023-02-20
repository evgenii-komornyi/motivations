import { Alert } from 'react-native';

export const useAlert = () => {
    const callAlert = (title, text, buttons, timeoutInterval = 0) => {
        setTimeout(() => {
            Alert.alert(title, text, buttons);
        }, timeoutInterval * 1000);
    };

    return callAlert;
};
