import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import Close from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../theme/globalColors';
import reactotron from 'reactotron-react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
const ModalLeads = ({setModalVisible, modalVisible, data}) => {
  reactotron.log('DATATA FFFFFF----------->', data.followers);

  const TOKEN = useSelector(state => state?.user?.data?.data?.token);

  const userRes = useSelector(state => state?.user?.data?.data?.user?.id);

  const handleFollowing = async () => {
    setModalVisible(!modalVisible);

    await axios.post(
      `https://ibf.instantbusinesslistings.com/api/leads/following/${data.id}/${userRes}`,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${TOKEN}`, // notice the Bearer before your token
        },
      },
    );
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
              <Close name="close" size={25} style={styles.closeIcon} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View>
                <Text style={styles.title}>Business Title </Text>
                <Text style={styles.title}>Address</Text>
                <Text style={styles.title}>Mobile Number </Text>
                <Text style={styles.title}>Business Category </Text>
                <Text style={styles.title}>Estimate</Text>
                <Text style={styles.title}>Expected Date</Text>
              </View>
              <View>
                <Text>-</Text>
                <Text>-</Text>
                <Text>-</Text>
                <Text>-</Text>
                <Text>-</Text>
                <Text>-</Text>
              </View>
              <View>
                <Text style={styles.title}> {data.business_title}</Text>
                <Text style={styles.title}> {data.address}</Text>
                <Text style={styles.title}> {data.mobile_no}</Text>
                <Text style={styles.title}> {data.business_category_name}</Text>
                <Text style={styles.title}> {data.estimate}</Text>
                <Text style={styles.title} numberOfLines={1}>
                  {' '}
                  {data.expected_date}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'flex-end',
                marginTop: RFValue(30),
              }}>
              {data.followers ? (
                 <TouchableOpacity
                 // onPress={() => setModalVisible(!modalVisible)}
                //  onPress={handleFollowing}
                 style={[styles.button, {backgroundColor: '#008080'}]}>
                 <Text style={styles.buttonText}>Convert</Text>
               </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleFollowing}
                  style={[styles.button, {backgroundColor: '#006600'}]}>
                  <Text style={styles.buttonText}>Follow up</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalLeads;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0009',
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
  button: {
    elevation: 10,
    borderRadius: 5,
    width: '40%',
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#006666',
    justifyContent: 'center',
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
  },
  title: {
    fontSize: 14,
    // lineHeight: 25,
    fontWeight: '400',
  },
});
