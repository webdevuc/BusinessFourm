import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {globalColors} from '../../../theme/globalColors';
import Icons from 'react-native-vector-icons/MaterialIcons';
import EstimateIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RNToasty} from 'react-native-toasty';
import Toast from 'react-native-simple-toast';

const LeadsDetails = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount_closed, setAmountClosed] = useState('');

  const [errorTitle, setErrorTitle] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const toggleModalClose = () => {
    setModalVisible(!modalVisible);
  };

  const leadData = route.params?.leadsData;

  reactotron.log('lead data ========>', leadData);

  reactotron.log(
    'leadData.who_closed === userRes ========>',
    leadData.who_closed,
  );

  const token = useSelector(state => state?.user?.data?.data?.token);

  const userRes = useSelector(state => state?.user?.data?.data?.user?.id);

  reactotron.log(
    'leadData.who_closed === userRes ========>',
    leadData.who_closed == userRes,
  );
  reactotron.log('userRes ========>', userRes);

  const GetLeads = async () => {
    const resposone = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/leads/index',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  useEffect(() => {
    GetLeads();
  }, []);

  const handleFollowing = async () => {
    await axios.post(
      `https://ibf.instantbusinesslistings.com/api/leads/following/${leadData.id}/${userRes}`,
      {},
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      },
    );
    GetLeads();
    navigation.navigate('Lead list');
  };

  // const dataAmount = {
  //   amount_closed: amount_closed,
  // };

  // reactotron.log("Valiewwwwww",dataAmount)

  const handleConvert = async () => {
    if (amount_closed) {
      RNToasty.Success({
        title: 'Deal close successfully..',
        position: 'top',
      });
    } else {
      Toast.show('Please Enter Amount', Toast.LONG);
    }

    if (amount_closed == '') {
      setModalVisible(true);
      return;
    }
    const result = await axios.post(
      `https://ibf.instantbusinesslistings.com/api/leads/convert/${leadData.id}`,
      amount_closed,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      },
    );
    navigation.navigate('Lead list');
    GetLeads();
    setModalVisible(false);
  };

  const handleChangeAmount = text => {
    setAmountClosed(text);
    if (text === '') {
      setErrorTitle(true);
      // setModalVisible(true)
    } else {
      setErrorTitle(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <EstimateIcon
                style={{alignSelf: 'flex-end'}}
                name="close"
                size={20}
                color="red"
                onPress={toggleModalClose}
              />
              <View style={styles.inputView}>
                <EstimateIcon
                  style={{marginBottom: 8}}
                  name="rupee"
                  size={22}
                  color={globalColors.card}
                />
                <TextInput
                  style={styles.modalText}
                  placeholder="Enter Amount"
                  value={amount_closed}
                  keyboardType="number-pad"
                  onChangeText={handleChangeAmount}
                />
                <Text style={{color: 'red'}}>
                  {errorTitle ? <Text>Amount is required</Text> : ''}
                </Text>
              </View>
              <Pressable onPress={handleConvert}>
                <View
                  style={{
                    backgroundColor: globalColors.card,
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                    Deal Close
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.detailsContainer}>
          <View style={{flexDirection: 'row'}}>
            <Icons
              name="edit"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Title</Text>
          </View>
          <Text style={styles.title}>{leadData.business_title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Icons
              name="location-pin"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Address</Text>
          </View>
          <Text style={styles.title}>{leadData.address}</Text>
          <View style={{flexDirection: 'row'}}>
            <Icons
              name="local-phone"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Mobile Number </Text>
          </View>
          <Text style={styles.title}>{leadData.mobile_no}</Text>

          <View style={{flexDirection: 'row'}}>
            <Icons
              name="category"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Business Category</Text>
          </View>
          <Text style={styles.title}>{leadData.business_category_name}</Text>

          <View style={{flexDirection: 'row'}}>
            <EstimateIcon
              name="rupee"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Estimate</Text>
          </View>
          <Text style={styles.title}>{leadData.estimate}</Text>

          <View style={{flexDirection: 'row'}}>
            <MaterialIcons
              name="date-range"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Expected Date</Text>
          </View>
          <Text style={styles.title}>{leadData.expected_date}</Text>

          <View style={{flexDirection: 'row'}}>
            <Icons
              name="description"
              size={20}
              color="#264596"
              onPress={() => handleEditLeads(item)}
            />
            <Text style={{marginLeft: 10}}>Description</Text>
          </View>
          <Text style={styles.title}>{leadData.description}</Text>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: RFValue(30),
          }}>
          {leadData.followers.includes(userRes) ? (
            <TouchableOpacity
              // onPress={handleConvert}
              onPress={toggleModal}
              style={[styles.button, {backgroundColor: '#008080'}]}>
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
          ) :  (
            <TouchableOpacity
              onPress={handleFollowing}
              style={[styles.button, {backgroundColor: '#006600'}]}>
              <Text style={styles.buttonText}>Follow up</Text>
            </TouchableOpacity>
          )}
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '90%',
            marginTop: RFValue(30),
          }}>
          {leadData.who_closed == userRes ? (
            <View style={{backgroundColor: '#ebeffa'}}>
              <Text style={{color: globalColors.card, fontSize: 20}}>
                This deal has been closed
              </Text>
            </View>
          ) : leadData.followers.includes(userRes) ? (
            <TouchableOpacity
              onPress={toggleModal}
              style={[
                styles.button,
                {
                  backgroundColor: globalColors.card,
                  width: 299,
                },
              ]}>
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleFollowing}
              style={[
                styles.button,
                {width: 299, backgroundColor: globalColors.card},
              ]}>
              <Text style={styles.buttonText}>Follow up</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: 200, // Set the desired height for the image
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    marginBottom: 20,
    color: '#333',
    textTransform: 'capitalize',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 8,
    textAlign: 'justify',
    color: '#333',
  },
  infoContainer: {},
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
  },
  button: {
    borderRadius: 10,
    paddingVertical: RFValue(13),
    marginLeft: RFValue(30),
    // backgroundColor: '#006666',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: RFValue(15),
    color: globalColors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputView: {
    backgroundColor: globalColors.white,

    // height: 50,
    justifyContent: 'center',
    borderWidth: 0,
    border: 'none',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LeadsDetails;
