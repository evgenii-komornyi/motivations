import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    navigationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: '#000',
    },
    navigationItemContainer: {
        flex: 1,
        width: 130,
        height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        shadowColor: '#fff',
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#fff',
    },
    activeText: {
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
});
