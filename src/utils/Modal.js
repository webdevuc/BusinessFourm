import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import Close from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../theme/globalColors';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {RNToasty} from 'react-native-toasty';
const ModalView = ({setModalVisible, modalVisible, data, setUpdateList}) => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);

  // reactotron.log("business MODAL DAta---------->"+data.id)

  const handleApproveApi = async () => {
    setModalVisible(true);

    const dataRes = await axios.post(
      `https://ibf.instantbusinesslistings.com/api/approv-user/${data.id}`,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userRes}`, // notice the Bearer before your token
        },
      },
    );
    RNToasty.Success({
      title: dataRes?.data?.message,
      position: 'bottom',
    });
    setModalVisible(false);
    setUpdateList(true);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Close
                name="close"
                size={10}
                style={styles.closeIcon}
                color={globalColors.white}
              />
            </TouchableOpacity>
            <View style={styles.modalContainer}>
              <View style={{width: '45%'}}>
                <Text style={styles.title}>Name </Text>
                <Text style={styles.title}>Mobile Number </Text>
                <Text style={styles.title}>Category </Text>
                <Text style={styles.title}>Business Name </Text>
                <Text style={styles.title}>Address</Text>
              </View>

              <View style={{width: '50%'}}>
                <Text style={styles.title} numberOfLines={1}>
                  {' '}
                  {data.name ? data.name : 'N/A'}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                  {' '}
                  {data.mobile_no ? data.mobile_no : 'N/A'}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                  {' '}
                  {data.business_category_name
                    ? data.business_category_name
                    : 'N/A'}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                  {' '}
                  {data.name_of_business ? data.name_of_business : 'N/A'}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                  {' '}
                  {data.address ? data.address : 'N/A'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: RFValue(30),
                width: '90%',
              }}>
              {/* {data.approved === false && data.rejected === false && (
                <> */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.noButton]}>
                <Text style={[styles.buttonText, {color: globalColors.card}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => setModalVisible(!modalVisible)}
                onPress={handleApproveApi}
                style={[styles.button]}>
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
              {/* </>
              )} */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0009',
    // lineHeight: 10,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flexDirection: 'row',
    paddingVertical: RFValue(20),
  },
  button: {
    borderRadius: 5,
    width: '50%',
    padding: 10,
    backgroundColor: globalColors.card,
  },
  noButton: {
    width: '50%',
    backgroundColor: globalColors.white,
    borderWidth: 1,
    borderColor: globalColors.card,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    color: globalColors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    padding: 3,
    backgroundColor: globalColors.grey,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    lineHeight: RFValue(28),
    fontWeight: '400',
    color: globalColors.black,
  },
});
