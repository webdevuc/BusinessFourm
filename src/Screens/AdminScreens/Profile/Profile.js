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
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalColors} from '../../../theme/globalColors';
import Location from 'react-native-vector-icons/MaterialIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {launchImageLibrary} from 'react-native-image-picker';
import reactotron from 'reactotron-react-native';
// import Geocoder from 'react-native-geocoding';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';

// import googleMap from '../../../assets/ maps.png';
// Geocoder.init('AIzaSyAgwrhO1Dx7gAI-o8KFn3BQHma89-7AUjg');
// location-pin

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const [mobile, setMobile] = useState('9876543210');
  const [address, setAddress] = useState(
    '108 Planet Industrial Estate, Subhash Road, Vile Parle (east), Mumbai Maharashtra 400057',
  );

  const [isEditing, setIsEditing] = useState(false);
  const [pic, setPic] = useState(null);

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Perform any necessary actions to save the updated profile data
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = () => {
    const options = {quality: 0.5};
    launchImageLibrary(options, res => {
      // reactotron.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",res)
      setPic(res && res.assets && res.assets[0] && res.assets[0].uri);
    });
  };

  const editProfile = () => {
    // Alert.alert("Clicked.....")
  };

  // useEffect(() => {
  //   const convertAddressToLatLng = async address => {
  //     try {
  //       const response = await Geocoder.from(address);
  //       const {results} = response;
  //       if (results.length > 0) {
  //         const {geometry} = results[0];
  //         const {lat, lng} = geometry.location;

  //         reactotron.log('Lat---', lat);
  //         reactotron.log('Lng---', lng);
  //         setLat(lat);
  //         setLong(lng);
  //       }
  //     } catch (error) {
  //       console.log('Error converting address to latlng:', error);
  //     }
  //   };

  //   convertAddressToLatLng(address);
  // }, [address]);

  const googleMaps = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${long}`;
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
        <View style={styles.container}>
          <View style={{backgroundColor: '#ebeffa', alignItems: 'flex-end'}}>
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
            {/* <Edit
            onPress={editProfile}
            style={{backgroundColor:'#3498DB'}}
            name="edit"
            size={22}
            color={globalColors.white}
          /> */}
          </View>

          <View style={styles.header}>
            <View style={styles.container1}>
              <Image
                style={styles.image}
                source={{
                  uri: pic
                    ? pic
                    : 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg',
                }}
                resizeMode={'contain'}
              />
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
              <Text style={styles.name}>{name}</Text>
            )}

            <View style={{paddingBottom: 10}}>
              <View style={styles.locationIcon}>
                <Location
                  style={styles.searchIcon}
                  name="location-pin"
                  size={22}
                  color={globalColors.card}
                />
                <Text style={styles.location}>
                  108 Planet Industrial Estate
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
                  <Text>{email}</Text>
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
                  onChangeText={setMobile}
                  maxLength={10}
                  keyboardType="number-pad"
                />
              ) : (
                // <Text style={styles.infoSubHeading}>+91 9876543210</Text>
                <Text>{mobile}</Text>
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
                    style={[
                      styles.infoSubHeading,
                      {lineHeight: 20, marginTop: 2},
                    ]}>
                    108 Planet Industrial Estate, Subhash Road, {'\n'} Vile
                    Parle (east), Mumbai Maharashtra 400057
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
    backgroundColor: 'gray',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ebeffa',
  },
  header: {
    flex: 0.35,
    backgroundColor: '#ebeffa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 1.3,
    borderColor: globalColors.white,
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

  mapIcon: {
    height: RFValue(35),
    width: RFValue(35),
    right: 0,
    tintColor: globalColors.darkGreen,
  },
});
