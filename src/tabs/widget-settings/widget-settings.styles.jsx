import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 100,
    },
    countActiveMotivationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    gridCategories: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    byCategory: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    count: {
        fontSize: 15,
        paddingBottom: 20,
        fontStyle: 'italic',
    },
});
