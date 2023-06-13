import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {globalColors} from '../../../theme/globalColors';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {RNToasty} from 'react-native-toasty';
import {avatar, imageLink} from '../../../utils/constan';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UpdateEvents = ({props, route}) => {
  const editEvent = route.params?.editEventData;
  const editEventID = route.params?.editEventData?.id;

  const navigation = useNavigation();
  const [title, setTitle] = useState(editEvent ? editEvent.title : '');
  const [description, setDescription] = useState(
    editEvent ? editEvent.description : '',
  );
  const [expectedDate, setExpectedDate] = useState(
    editEvent ? editEvent.date : '',
  );
  const [address, setAddress] = useState(editEvent ? editEvent.address : '');
  const [location, setLocation] = useState(editEvent ? editEvent.location : '');

  const [loader, setLoader] = useState(false);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorExpectedDate, setErrorExpectedDate] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [imgUri, setImgUri] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [pic, setPic] = useState(null);

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      const selectedDate = moment(date).format('YYYY-MM-DD');

      setExpectedDate(selectedDate);
    }
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const userRes = useSelector(state => state?.user?.data?.data?.token);

  const handleChangeTitle = text => {
    setTitle(text);
    if (text === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }
  };

  const handleChangeDescription = text => {
    setDescription(text);
    if (text === '') {
      setErrorDescription(true);
    } else {
      setErrorDescription(false);
    }
  };

  const onChangeExpectedDAte = text => {
    setExpectedDate(text);
    if (text === '') {
      setErrorExpectedDate(true);
    } else {
      setErrorExpectedDate(false);
    }
  };

  const handleChange = text => {
    setAddress(text);
    if (text === '') {
      setErrorAddress(true);
    } else {
      setErrorAddress(false);
    }
  };

  const handleChangeLocation = text => {
    setLocation(text);
    if (text === '') {
      setErrorLocation(true);
    } else {
      setErrorLocation(false);
    }
  };

  const addEventsApi = async () => {
    const payload = {
      title: title,
      description: description,
      date: expectedDate,
      address: address,
      location: location,
      img: pic,
    };

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', expectedDate);
    formData.append('address', address);
    formData.append('location', location);
    formData.append('img', {
      uri: pic && pic.assets && pic.assets[0] && pic.assets[0].uri,
      name: pic && pic.assets && pic.assets[0] && pic.assets[0].fileName,
      type: pic && pic.assets && pic.assets[0] && pic.assets[0].type,
    });

    const response = await fetch(
      `https://ibf.instantbusinesslistings.com/api/event/store`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userRes}`,
        },
        body: formData,
      },
    );

    setTitle(response?.name);
    setDescription(response?.description);
    setExpectedDate(response?.expectedDate);
    setAddress(response?.address);
    setLocation(response?.location);
    setImgUri(response?.imgUri);

    navigateToOtherPage();
  };

  const navigateToOtherPage = () => {
    navigation.navigate('Events list');
  };

  const createEvents = () => {
    if (title && description && expectedDate && address && location) {
      setTitle('');
      setDescription('');
      setExpectedDate('');
      setAddress('');
      setLocation('');

      addEventsApi();

      Toast.show('Events added successfully', Toast.LONG);
    } else {
      Toast.show('All Fields are required', Toast.LONG);
    }
  };

  const updateEvents = async () => {
    const data = {
      title: title,
      description: description,
      date: expectedDate,
      address: address,
      location: location,
    };

    setLoader(true);

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', expectedDate);
    formData.append('address', address);
    formData.append('location', location);
    formData.append('img', {
      uri: pic && pic.assets && pic.assets[0] && pic.assets[0].uri,
      name: pic && pic.assets && pic.assets[0] && pic.assets[0].fileName,
      type: pic && pic.assets && pic.assets[0] && pic.assets[0].type,
    });

    const response = await fetch(
      `https://ibf.instantbusinesslistings.com/api/event/update/${editEventID}`,
      // data,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userRes}`,
        },
        body: formData,
      },
    );

    RNToasty.Success({
      title: 'Events updated successfully..',
      position: 'top',
    });

    setTitle('');
    setDescription('');
    setExpectedDate('');
    setAddress('');
    setLocation('');

    navigation.navigate('Events list');
    setLoader(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = () => {
    const options = {quality: 0.5};
    launchImageLibrary(options, res => {
      setPic(res);
      setPhoto(res && res.assets && res.assets[0] && res.assets[0].uri);
    });
  };

  return (
    <>
      <ScrollView style={{backgroundColor: globalColors.white}}>
        <View style={styles.container}>
          <StatusBar style="auto" />

          {loader && (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#008080" />
            </View>
          )}

          <View style={[styles.inputView, {marginTop: 18}]}>
            <TextInput
              style={[styles.TextInput, errorTitle && styles.redTextInput]}
              placeholder="Event Title"
              value={title}
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeTitle}
            />
            <Text style={{color: 'red'}}>
              {errorTitle ? <Text>Name is required</Text> : ''}
            </Text>
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              style={[
                styles.TextInput,
                errorDescription && styles.redTextInput,
              ]}
              placeholder="Event Description"
              value={description}
              placeholderTextColor={globalColors.grey}
              multiline={true}
              numberOfLines={3}
              onChangeText={handleChangeDescription}
            />
            <Text style={{color: 'red'}}>
              {errorDescription ? <Text>Description is required</Text> : ''}
            </Text>
          </View>

          <View style={styles.inputView}>
            <TouchableOpacity onPress={showDateTimePicker}>
              <TextInput
                // style={styles.input}
                style={[
                  styles.TextInput,
                  {color: globalColors.grey},
                  errorExpectedDate && styles.redTextInput,
                ]}
                value={expectedDate}
                placeholder="Select Event Date"
                editable={false}
                placeholderTextColor={globalColors.grey}
                onChangeText={onChangeExpectedDAte}
              />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            <Text style={{color: 'red'}}>
              {errorExpectedDate ? <Text>Date is required</Text> : ''}
            </Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, errorAddress && styles.redTextInput]}
              placeholder="Address"
              value={address}
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChange}
            />
            <Text style={{color: 'red'}}>
              {errorAddress ? <Text>Address is required</Text> : ''}
            </Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, errorLocation && styles.redTextInput]}
              placeholder="Landmark"
              value={location}
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeLocation}
            />
            <Text style={{color: 'red'}}>
              {errorLocation ? <Text>Landmark is required</Text> : ''}
            </Text>
          </View>

          {photo?.length > 1 && (
            <Image style={styles.image} source={{uri: photo}} />
          )}
          {imgUri?.length > 1 && (
            <Image
              style={styles.image}
              source={{uri: `${imageLink}${imgUri}`}}
            />
          )}
          {!photo && !imgUri && (
            // <Image style={styles.image} source={{uri: avatar}} />
            <MaterialIcons
              name="image"
              size={50}
              color="gray"
              source={{uri: avatar}}
            />
          )}

          {/* {photo?.length > 1 ? (
            <Image style={styles.image} source={{uri: photo}} />
          ) : imgUri?.length > 1 ? (
            <Image
              style={styles.image}
              source={{uri: `${imageLink}${imgUri}`}}
            />
          ) : (
            <Image style={styles.image} source={{uri: avatar}} />
          )} */}

          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity
              onPress={handleSelectImage}
              style={styles.uploadBtn}>
              {selectedImage && (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 200, height: 200}}
                />
              )}
              {/* <MaterialIcons name="edit" size={20} color="black" /> */}
              <View>
                <Text>Select Image</Text>
              </View>
            </TouchableOpacity>
          </View>

          {editEvent ? (
            <TouchableOpacity
              onPress={updateEvents}
              style={styles.registerButton}>
              <Text style={styles.registerText}>Update Events</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={createEvents}
              style={styles.registerButton}>
              <Text style={styles.registerText}>Create Events</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    width: 150,
    height: 150,
  },
  inputView: {
    borderRadius: 8,
    width: '90%',
    // marginBottom: 10,
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: '#505050',
    // marginVertical: 5,
  },

  inputViewDropdown: {
    borderRadius: 8,
    width: '90%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#505050',
    marginVertical: 5,
  },

  TextInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  redTextInput: {
    borderColor: 'red',
  },
  registerButton: {
    width: '90%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.card,
  },
  registerText: {
    color: globalColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    borderBottomColor: globalColors.black,
    paddingLeft: 5,
  },

  uploadBtnContainer: {
    width: '100%',
    bottom: 10,
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UpdateEvents;
