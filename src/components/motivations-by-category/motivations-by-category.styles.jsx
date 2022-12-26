import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    itemContainerButton: {
        padding: 20,
        marginVertical: 0,
        marginHorizontal: 16,
        borderWidth: 1,
    },
    title: {
        fontSize: 14,
    },
    category: {
        alignSelf: 'center',
        paddingVertical: 20,
        fontSize: 25,
        fontWeight: 'bold',
    },
    createContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        position: 'absolute',
        top: 0,
        right: -25,
    },
    createButton: {
        width: 70,
        height: 70,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 35,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    switchContainer: {
        padding: 0,
        position: 'relative',
        top: -10,
        width: 50,
    },
    formContainer: { width: '60%' },
    wrapperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
