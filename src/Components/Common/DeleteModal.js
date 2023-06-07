import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {globalColors} from '../../theme/globalColors';

const DeleteModal = ({visibility, title, cancel, confirm}) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={visibility}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.modalText}>Are You Sure?</Text>
              <TouchableOpacity
                onPress={() => setSignatureModal(false)}></TouchableOpacity>
            </View>
            <Text style={{color: globalColors.card}}>{title}</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity style={styles.noButton} onPress={cancel}>
                <Text style={styles.text}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirm} style={styles.yesButton}>
                <Text style={[styles.text, {color: globalColors.white}]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // height: 250,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColors.black,
    lineHeight: 40,
  },
  noButton: {
    width: '45%',
    backgroundColor: globalColors.white,
    borderWidth: 1,
    borderColor: globalColors.card,
    borderRadius: 5,
    padding: 10,
  },
  yesButton: {
    width: '45%',
    backgroundColor: globalColors.card,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.card,
  },
});
