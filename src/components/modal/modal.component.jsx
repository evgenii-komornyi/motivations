import React from 'react';
import { Constants } from '../../constants/constants';

import { Modal, Pressable, View } from 'react-native';
import { Icon } from '../icon/icon.component';

import { useAlert } from '../../hooks/useAlert';

import { styles } from './modal.styles';

export const ModalWindow = ({ children, modalVisible, setModalVisible }) => {
    const alertCaller = useAlert();

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alertCaller(null, 'Modal has been closed.', [
                        { text: 'Ok', onPress: () => null },
                    ]);
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Icon
                            type={Constants.ICON_TYPE_REGULAR}
                            icon="circle-xmark"
                            size={Constants.BIG_ICON_SIZE}
                        />
                    </Pressable>
                    <View style={styles.modalView}>{children}</View>
                </View>
            </Modal>
        </View>
    );
};
