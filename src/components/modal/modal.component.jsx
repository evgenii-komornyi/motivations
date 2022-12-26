import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Alert, Modal, Pressable, View } from 'react-native';

import { styles } from './modal.styles';

export const ModalWindow = ({ children, modalVisible, setModalVisible }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(false)}
                    >
                        <FontAwesomeIcon
                            icon="fa-regular fa-circle-xmark"
                            size={30}
                        />
                    </Pressable>
                    <View style={styles.modalView}>{children}</View>
                </View>
            </Modal>
        </View>
    );
};
