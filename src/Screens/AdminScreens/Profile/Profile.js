// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Profile = () => {
//   return (
//     <View style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>

//       <Text>Profile goes here</Text>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})

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
} from 'react-native';
import React, {useState} from 'react';
import {globalColors} from '../../../theme/globalColors';
import profile from '../../../assets/Dummy/profile.jpg';
import Location from 'react-native-vector-icons/MaterialIcons';
import Edit from 'react-native-vector-icons/MaterialIcons';
import Save from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import reactotron from 'reactotron-react-native';
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

  reactotron.log('JJJJJJJJJJJJJJJJJJJJJJ', pic);
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={{backgroundColor: '#c2d6d6', alignItems: 'flex-end'}}>
        {isEditing ? (
          <TouchableOpacity>
            <Save
              onPress={handleSaveProfile}
              style={{padding: 10}}
              name="save"
              size={22}
              color={globalColors.card}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Edit
              // onPress={editProfile}
              onPress={handleEditProfile}
              style={{padding: 10}}
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
        {/* <TouchableOpacity onPress={handleSelectImage}>
          <Image
            style={styles.image}
            source={{
              uri: pic
                ? pic
                : 'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg',
            }}
            resizeMode={'contain'}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              padding: 5,
            }}>
            <Edit name="edit" size={16} color={globalColors.white} />
            <Text>edit</Text>
          </View>
          {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={{width: 200, height: 200}}
            />
          )}
        </TouchableOpacity> */}

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
              <MaterialIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {isEditing ? (
          <TextInput style={styles.name} value={name} onChangeText={setName} />
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        <View style={{paddingBottom:10}}>
        <View style={styles.locationIcon}>
          <Location
            style={styles.searchIcon}
            name="location-pin"
            size={22}
            color={globalColors.card}
          />
          <Text style={styles.location}>108 Planet Industrial Estate</Text>
        </View>
        </View>
      </View>
  
        <View style={styles.info}>
          <View>
            <Location name="email" size={22} color={globalColors.card} />
          </View>
          <View >
            <Text style={styles.infoHeading}>Email</Text>
            {isEditing ? (
              <TextInput value={email}  onChangeText={setEmail} />
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
              <Text
                style={[styles.infoSubHeading, {lineHeight: 20, marginTop: 2}]}>
                108 Planet Industrial Estate, Subhash Road, {'\n'} Vile Parle
                (east), Mumbai Maharashtra 400057
              </Text>
            )}
          </View>
        </View>
 
    </View>
    </ScrollView>
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
    right: 0,
    bottom: 0,
    // backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    flex: 0.35,
    backgroundColor: '#c2d6d6',
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
});
