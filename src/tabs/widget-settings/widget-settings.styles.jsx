import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    wrapper: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 50,
    },
    countActiveMotivationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    categoriesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    byCategory: {
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
    },
    count: {
        fontSize: 15,
        fontStyle: 'italic',
    },
});
