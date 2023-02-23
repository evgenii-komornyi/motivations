import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    textInput: {
        position: 'relative',
        width: 120,
        zIndex: 9999,
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 7,
    },
    buttonContainer: {
        marginLeft: 5,
        flexDirection: 'row',
        paddingLeft: 5,
    },
});
