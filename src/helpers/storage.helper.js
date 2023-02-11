import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));

        return true;
    } catch (error) {
        console.warn(error.message);

        return false;
    }
};

export const readFromStorage = async key => {
    try {
        const items = await AsyncStorage.getItem(key);

        return items != null ? JSON.parse(items) : null;
    } catch (error) {
        console.log(error);

        return null;
    }
};
