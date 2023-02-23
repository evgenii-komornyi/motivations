import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 60,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
        borderRadius: 20,
        marginBottom: 5,
        borderWidth: 1,
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
        lineHeight: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chooseButtonContainer: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
    },
    visibilityIconContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});
