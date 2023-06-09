import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  ScrollView,
  Linking,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalColors} from '../../../theme/globalColors';
import profile from '../../../assets/Dummy/profile.jpg';
import Location from 'react-native-vector-icons/MaterialIcons';
import Edit from 'react-native-vector-icons/MaterialIcons';
import Save from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UpdateIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import googleMap from '../../../assets/user.png';
import {RNToasty} from 'react-native-toasty';
// import Geocoder from 'react-native-geocoding';
import {avatar, imageLink} from '../../../utils/constan';

// Geocoder.init('AIzaSyAgwrhO1Dx7gAI-o8KFn3BQHma89-7AUjg');

const Profile = () => {
  // const [profileData, setProfileData] = useState('')

  // https://ibf.instantbusinesslistings.com/api/update-user/1

  const userRes = useSelector(state => state?.user?.data?.data);
  const token = useSelector(state => state?.user?.data?.data?.token);
  const userId = useSelector(state => state?.user?.data?.data?.user?.id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [mobile, setMobile] = useState('');
  const [gst, setGst] = useState('');
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [pic, setPic] = useState(null);
  const [imgUri, setImgUri] = useState(null);
  const [photo, setPhoto] = useState(null);

  const locations = userRes?.user?.location;

  const data = {
    location: locations,
  };
  const cleanedString = data?.location?.replace(/[{} ]/g, '');
  const keyValuePairs = cleanedString?.split(',');
  const extractedData = {};
  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split(':');
    const cleanedKey = key.trim();
    const cleanedValue = value.trim();
    extractedData[cleanedKey] = cleanedValue;
  });
  const latitude = extractedData.lat;
  const longitude = extractedData.long;

  const handleEditProfile = () => {
    setIsEditing(true);
    setName(userData?.name);
    setRole(userData?.role);
    setEmail(userData?.email);
    setMobile(userData?.mobile_no);
    setAddress(userData?.address);
    setGst(userData?.gst);
  };

  const getProfile = async () => {
    const resposone = await axios.get(
      `https://ibf.instantbusinesslistings.com/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setUserData(resposone?.data?.user);
    setAddress(resposone?.data?.user?.address);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setName(userData?.name);
    setRole(userData?.role);
    setEmail(userData?.email);
    setMobile(userData?.mobile_no);
    setAddress(userData?.address);
    setGst(userData?.gst);
    setImgUri(userData?.img);
  }, [userData]);

  // useEffect(() => {
  //   const convertAddressToLatLng = async address => {
  //     try {
  //       const response = await Geocoder.from(address);
  //       const {results} = response;
  //       if (results.length > 0) {
  //         const {geometry} = results[0];
  //         const {lat, lng} = geometry.location;

  //         // reactotron.log('Lat---', lat);
  //         // reactotron.log('Lng---', lng);
  //         setLat(lat);
  //         setLong(lng);
  //       }
  //     } catch (error) {
  //       console.log('Error converting address to latlng:', error);
  //     }
  //   };
  //   setTimeout(() => {
  //     convertAddressToLatLng(address);
  //   }, 5000);

  // }, [address]);

  const handleSaveProfile = async () => {
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile_no', mobile);
      formData.append('gst', gst);
      formData.append('address', address);
      formData.append('image', {
        uri: pic && pic.assets && pic.assets[0] && pic.assets[0].uri,
        name: pic && pic.assets && pic.assets[0] && pic.assets[0].fileName,
        type: pic && pic.assets && pic.assets[0] && pic.assets[0].type,
      });

      const response = await fetch(
        `https://ibf.instantbusinesslistings.com/api/update-user/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      setName(response?.name);
      setRole(response?.role);
      setEmail(response?.email);
      setMobile(response?.mobile_no);
      setAddress(response?.address);
      setGst(response?.gst);
      setImgUri(response?.gst);
      // const payload = {
      //   name: name,
      //   email: email,
      //   mobile_no: mobile,
      //   gst: gst,
      //   address: address,
      //   image: fileName,

      // };

      // await axios.post(
      //   `https://ibf.instantbusinesslistings.com/api/update-user/${userId}`,
      //   payload,
      //   {
      //     headers: {
      //       'Content-type': 'multipart/form-data',
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );

      RNToasty.Success({
        title: 'Profile updated successfully..',
        position: 'bottom',
      });

      getProfile();
      // navigateToOtherPage();

      setIsEditing(false);
    } catch (error) {
      // Handle the error here
      console.error('Error saving profile:', error);
      RNToasty.Error({
        title: 'Error saving profile. Please try again.',
        position: 'bottom',
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = () => {
    const options = {quality: 0.1};
    launchImageLibrary(options, res => {
      // let formData = new FormData();
      // reactotron.log('Image---', res);

      setPic(res);

      setPhoto(res && res.assets && res.assets[0] && res.assets[0].uri);

      // formData.append('profileImage', {
      //   uri: res && res.assets && res.assets[0] && res.assets[0].uri,
      //   name: res && res.assets && res.assets[0] && res.assets[0].fileName,
      //   type: res && res.assets && res.assets[0] && res.assets[0].type,
      // });

      // dispatch(uploadProfileImage(formData));
    });
  };

  // const handleSelectImage = () => {
  //   const options = {quality: 0.5};
  //   launchImageLibrary(options, res => {
  //     reactotron.log('HAndled profileee---', res);

  //     setPic(res && res.assets && res.assets[0] && res.assets[0].uri);
  //   });
  // };

  const editProfile = () => {
    // Alert.alert("Clicked.....")
  };
  const googleMaps = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.container, {backgroundColor: '#ebeffa'}]}>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {isEditing ? (
              <TouchableOpacity>
                <Icon
                  onPress={handleSaveProfile}
                  style={{margin: 13}}
                  name="save"
                  size={22}
                  color={globalColors.card}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon
                  // onPress={editProfile}
                  onPress={handleEditProfile}
                  style={{margin: 13}}
                  name="edit"
                  size={22}
                  color={globalColors.card}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.header}>
            <View style={styles.container1}>
              {/* <Image
                style={styles.image}
                source={{
                  // uri: imgUri ? `${imageLink}${imgUri}` : avatar,
                  uri: photo?.length > 1 ? photo : `${imageLink}${imgUri}`,
                }}
                resizeMode={'contain'}
              /> */}

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
                <Image style={styles.image} source={{uri: avatar}} />
              )}

              {isEditing && (
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
                    <MaterialIcons name="edit" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {isEditing ? (
              <TextInput
                style={styles.name}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.name}>{userData?.name}</Text>
            )}

            <View style={{paddingBottom: 10}}>
              <View style={styles.locationIcon}>
                <Location
                  style={styles.searchIcon}
                  name="verified-user"
                  size={22}
                  color={globalColors.card}
                />
                <Text style={styles.location}>{userData?.role}</Text>
              </View>
            </View>
            <View style={{paddingBottom: 10}}>
              <View style={styles.locationIcon}>
                <Text style={[styles.location, {fontWeight: 'bold'}]}>
                  {userData?.ibf_id}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.info}>
            <View>
              <Location name="email" size={22} color={globalColors.card} />
            </View>
            <View>
              <Text style={styles.infoHeading}>Email</Text>
              {isEditing ? (
                <TextInput value={email} onChangeText={setEmail} />
              ) : (
                <View>
                  <Text>{userData?.email}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.info}>
            <View>
              <Location name="phone" size={22} color={globalColors.card} />
            </View>
            <View>
              <Text style={styles.infoHeading}>Phone</Text>
              {isEditing ? (
                <TextInput
                  value={mobile}
                  maxLength={10}
                  keyboardType="number-pad"
                  onChangeText={setMobile}
                />
              ) : (
                <Text>{userData?.mobile_no}</Text>
              )}
            </View>
          </View>
          <View style={styles.info}>
            <View>
              <Location
                name="volunteer-activism"
                size={22}
                color={globalColors.card}
              />
            </View>
            <View>
              {/* <Text style={styles.infoHeading}>GST Number</Text>
          <Text>{userData?.gst}</Text> */}

              <Text style={styles.infoHeading}>GST Number</Text>
              {isEditing ? (
                <TextInput value={gst} onChangeText={setGst} />
              ) : (
                <Text>{userData?.gst}</Text>
              )}
            </View>
          </View>
          <View style={styles.info}>
            <View>
              <Location
                name="location-pin"
                size={22}
                color={globalColors.card}
              />
            </View>
            <View>
              <Text style={styles.infoHeading}>Address</Text>

              {isEditing ? (
                <TextInput value={address} onChangeText={setAddress} />
              ) : (
                <>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.infoSubHeading,
                      {lineHeight: 20, marginTop: 2},
                    ]}>
                    {userData?.address}
                  </Text>
                  <TouchableOpacity onPress={googleMaps}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 20,
                      }}>
                      <Text style={{marginTop: 10, fontWeight: 'bold'}}>
                        Open with google map:
                      </Text>
                      {/* <Image source={googleMap} style={styles.mapIcon} /> */}
                      <Location
                        name="location-pin"
                        size={35}
                        color={globalColors.darkGreen}
                      />
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container1: {
    elevation: 2,
    height: 80,
    width: 80,
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 10,
    bottom: 5,
    // zIndex: 1000,
    // backgroundColor: 'lightgrey',
    // width: '100%',
    // height: '25%',
    // padding: 2,
    // backgroundColor: 'red',
    // borderWidth: 0,
    // borderRadius: 50,
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // flex: 1,
    height: '100%',
    backgroundColor: '#ebeffa',
  },
  header: {
    // flex: 0.35,
    backgroundColor: '#ebeffa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 1.3,
    // borderColor: globalColors.card,
  },

  name: {
    marginVertical: 10,
    color: globalColors.grey,
    fontSize: 18,
  },
  locationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  location: {
    color: globalColors.grey,
    fontSize: 15,
  },

  info: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.grey,
  },
  infoHeading: {fontSize: 16, fontWeight: '500', color: '#000'},
  infoSubHeading: {
    fontSize: 14,
    fontWeight: '400',
    color: globalColors.grey,
    lineHeight: 25,
  },
});
