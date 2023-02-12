import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    formContainer: { flex: 2, justifyContent: 'center', alignItems: 'center' },
    textInput: {
        position: 'relative',
        width: 200,
        zIndex: 9999,
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
    },
    saveButtonContainer: {
        width: 130,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    iconContainer: { padding: 5 },
    saveTitleContainer: { padding: 5 },
    pickerSelectStyles: {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30,
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
            width: '70%',
            marginRight: 'auto',
            marginLeft: 'auto',
        },
    },
});
