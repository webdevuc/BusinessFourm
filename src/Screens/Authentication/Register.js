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
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {globalColors} from '../../theme/globalColors';
import {Header} from '../../Components/Common/Header';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../actions/UserActions';
import Toast from 'react-native-simple-toast';
import {isEmpty} from '../../utils/isEmpty';
import Regex from '../../utils/validation';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import {RNToasty} from 'react-native-toasty';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAgwrhO1Dx7gAI-o8KFn3BQHma89-7AUjg');

export default function Register(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [gst, setGst] = useState('27AAPFU0939F1ZV');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(null);
  const [categoryID, setCategoryId] = useState(null);

  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isErrorM, setIsErrorM] = useState(false);
  const [isErrorB, setIsErrorB] = useState(false);
  const [isErrorBC, setIsErrorBC] = useState(false);
  const [isErrorGst, setIsErrorGst] = useState(false);
  const [isErrorC, setIsErrorC] = useState(false);
  const [isErrorA, setIsErrorA] = useState(false);
  const [isErrorP, setIsErrorP] = useState(false);
  const [isErrorCP, setIsErrorCP] = useState(false);
  const [bussinessLong, setBussinessLong] = useState('');
  const [bussinessLat, setBussinessLat] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [asycData, setAsycData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      'https://ibf.instantbusinesslistings.com/api/business-category-registration',
    );

    const data = response.data.business_category.map(item => ({
      label: item.business_category_name,
      value: item.id,
    }));
    setAsycData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRegister = async () => {
    if (isEmpty(name)) {
      // Toast.show('Please enter a Name.', Toast.LONG);
      RNToasty.Error({
        title: 'Please enter a Name',
        position: 'bottom',
        duration: 1,
      });
      return;
    }

    if (!Regex.validateEmail(email)) {
      // Toast.show('Please enter a valid email.', Toast.LONG);
      RNToasty.Error({
        title: 'Please enter a valid email.',
        position: 'bottom',
        duration: 1,
      });
      return;
    }

    if (!Regex.validateMobile(mobile)) {
      RNToasty.Error({
        title: 'Please enter a valid mobile number.',
        position: 'bottom',
        duration: 1,
      });
      return;
    }
    if (!Regex.validateGSTNumber(gst)) {
      RNToasty.Error({
        title: 'Please enter a valid GST number.',
        position: 'bottom',
        duration: 1,
      });
      return;
    }

    if (isEmpty(businessName)) {
      RNToasty.Error({
        title: 'Please enter a name of business.',
        position: 'bottom',
        duration: 1,
      });

      return;
    }

    if (isEmpty(category)) {
      RNToasty.Error({
        title: 'Select Business category.',
        position: 'bottom',
        duration: 1,
      });

      return;
    }

    if (isEmpty(city)) {
      RNToasty.Error({
        title: 'Please enter a city.',
        position: 'bottom',
        duration: 1,
      });

      return;
    }

    if (isEmpty(address)) {
      RNToasty.Error({
        title: 'Please enter a address.',
        position: 'bottom',
        duration: 1,
      });
      return;
    }

    if (isEmpty(password)) {
      RNToasty.Error({
        title: 'Please enter password .',
        position: 'bottom',
        duration: 1,
      });
      return;
    }

    if (!Regex.validPassword(password)) {
      RNToasty.Error({
        title:
          'Invalid password. Password must contain at least 8 characters including one lowercase letter, one uppercase letter, one digit, and one special character.',
        position: 'bottom',
        duration: 3,
      });
      return;
    }

    if (password !== confirmPassword) {
      RNToasty.Error({
        title: 'Passwords do not match .',
        position: 'bottom',
        duration: 1,
      });
      return;
    }
    const payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      mobile_no: mobile,
      name_of_business: businessName,
      business_category: categoryID,
      city: city,
      address: address,
      gst: gst,
      location: `{lat: ${bussinessLat}, long: ${bussinessLong}}`,
    };

    // reactotron.log('Payload---', payload);
    dispatch(registerUser(payload, navigation));

    // try {
    //   await axios.post(
    //     'https://ibf.instantbusinesslistings.com/public/api/register',
    //     payload,
    //   );

    //   // Handle successful response here
    // } catch (error) {
    //   RNToasty.Error({
    //     title: error.response.data.error,
    //     position: 'bottom',
    //   });
    //   RNToasty.Error({
    //     title: error.response.data.errors.email[0],
    //     position: 'bottom',
    //   });
    //   RNToasty.Error({
    //     title: error.response.data.errors.mobile_no[0],
    //     position: 'bottom',
    //   });
    //   reactotron.log('ressss--11111', error.response.data.errors);
    // }

    // if(errorToast?.error_message){
    //   Toast.show(errorToast.error_message, Toast.LONG);
    // }
    // navigation.navigate('Login');
  };

  // const handleInputChange = (text) => {
  //   setName(text);
  // };

  const handleInputChange = text => {
    const trimmedText = text.trimStart();

    setName(trimmedText);

    if (trimmedText === '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleEmail = text => {
    const trimmedText = text.trimStart();

    setEmail(trimmedText);

    if (trimmedText === '') {
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
  };

  const handleMobileNumber = text => {
    const trimmedText = text.trimStart();
    setMobile(trimmedText);
    if (trimmedText === '') {
      setIsErrorM(true);
    } else {
      setIsErrorM(false);
    }
  };

  const handleBusiness = text => {
    const trimmedText = text.trimStart();

    setBusinessName(trimmedText);
    if (trimmedText === '') {
      setIsErrorB(true);
    } else {
      setIsErrorB(false);
    }
  };

  const handleChangeCity = text => {
    const trimmedText = text.trimStart();

    setCity(trimmedText);
    if (trimmedText === '') {
      setIsErrorC(true);
    } else {
      setIsErrorC(false);
    }
  };

  const handleChangeAddress = text => {
    const trimmedText = text.trimStart();

    setAddress(trimmedText);
    if (trimmedText === '') {
      setIsErrorA(true);
    } else {
      setIsErrorA(false);
    }
  };

  const handlePassword = text => {
    setPassword(text);
    if (text === '') {
      setIsErrorP(true);
    } else {
      setIsErrorP(false);
    }
  };

  const handleConfirmPass = text => {
    setConfirmPassword(text);
    if (text === '') {
      setIsErrorCP(true);
    } else {
      setIsErrorCP(false);
    }
  };

  const handleDropdown = item => {
    setCategory(item.value);
    setCategoryId(item.value);
    if (item === '') {
      setIsErrorBC(true);
    } else {
      setIsErrorBC(false);
    }
  };

  const handleChangeGSTNo = text => {
    const trimmedText = text.trimStart();

    setGst(trimmedText);
    if (trimmedText === '') {
      setIsErrorGst(true);
    } else {
      setIsErrorGst(false);
    }
  };
  useEffect(() => {
    const convertAddressToLatLng = async address => {
      try {
        const response = await Geocoder.from(address);
        const {results} = response;
        if (results.length > 0) {
          const {geometry} = results[0];
          const {lat, lng} = geometry.location;
          setBussinessLat(lat);
          setBussinessLong(lng);
        }
      } catch (error) {
        console.log('Error converting address to latlng:', error);
      }
    };

    convertAddressToLatLng(address);
  }, [address]);

  // return (
  //   // Trigger the sendNotification function wherever needed in your app
  //   // For example, you can trigger it on a button press
  //   <Button title="Send Notification" onPress={sendNotification} />
  // );

  return (
    <>
      <ScrollView style={{backgroundColor: globalColors.white}}>
        <Header title="Sign Up" navProps={props} backEnable />
        <View style={styles.container}>
          <StatusBar style="auto" />

          <View style={[styles.inputView, {marginTop: 18}]}>
            <TextInput
              // style={styles.TextInput}
              style={[styles.TextInput, isError && styles.redTextInput]}
              // style={{ borderColor: name ? 'black' : 'red', borderWidth: 1 }}
              placeholder="Name"
              value={name}
              placeholderTextColor={globalColors.grey}
              // onChangeText={name => setName(name)}
              onChangeText={handleInputChange}
            />
            {/* <Text style={{color: 'red'}}>
              {isError ? <Text>Name is required</Text> : ''}
            </Text> */}
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              // style={styles.TextInput}
              style={[styles.TextInput, isErrorEmail && styles.redTextInput]}
              // style={{ borderColor: name ? 'black' : 'red', borderWidth: 1 }}
              keyboardType="email-address"
              placeholder="Email"
              value={email}
              placeholderTextColor={globalColors.grey}
              // onChangeText={name => setName(name)}
              onChangeText={handleEmail}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, isErrorM && styles.redTextInput]}
              placeholder="Mobile Number"
              value={mobile}
              placeholderTextColor={globalColors.grey}
              // onChangeText={text => setMobile(text)}
              onChangeText={handleMobileNumber}
              maxLength={10}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, isErrorB && styles.redTextInput]}
              placeholder="Name of Business"
              value={businessName}
              placeholderTextColor={globalColors.grey}
              // onChangeText={name => setBusinessName(name)}
              onChangeText={handleBusiness}
            />
          </View>
          <View style={styles.inputViewDropdown}>
            <Dropdown
              style={[styles.dropdown, isErrorBC && styles.redTextInput]}
              // style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={asycData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Business category"
              searchPlaceholder="Search..."
              value={category}
              // onChange={item => {
              //   setCategory(item.value);
              // }}
              onChange={handleDropdown}
            />
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              style={[styles.TextInput, isErrorGst && styles.redTextInput]}
              value={gst}
              placeholder="GST number"
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeGSTNo}
              // onChangeText={address => setAddress(address)}
              maxLength={15}
            />
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              style={[styles.TextInput, isErrorC && styles.redTextInput]}
              value={city}
              placeholder="City"
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeCity}
              // onChangeText={city => setCity(city)}
            />
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              style={[styles.TextInput, isErrorA && styles.redTextInput]}
              value={address}
              placeholder="Business address"
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeAddress}
            />
          </View>

          <View style={[styles.inputView]}>
            <TextInput
              style={[styles.TextInput, isErrorP && styles.redTextInput]}
              value={password}
              placeholder="Password"
              placeholderTextColor={globalColors.grey}
              secureTextEntry={true}
              onChangeText={handlePassword}
              // onChangeText={password => setPassword(password)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput, isErrorCP && styles.redTextInput]}
              value={confirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor={globalColors.grey}
              secureTextEntry={true}
              // onChangeText={password => setConfirmPassword(password)}
              onChangeText={handleConfirmPass}
            />
          </View>

          <Text style={styles.errorMessage}>{errorMessage}</Text>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              paddingVertical: 10,
            }}>
            <Text style={{color: globalColors.grey}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: globalColors.card}}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
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
    width: '85%',
    marginBottom: 10,
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: '#505050',
    marginVertical: 5,
  },

  inputViewDropdown: {
    borderRadius: 8,
    width: '85%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#505050',
    marginVertical: 5,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  registerButton: {
    width: '80%',
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
  // textInput: {
  //   height: 40,
  //   width: '80%',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   paddingHorizontal: 10,
  // },
  redTextInput: {
    borderColor: 'red',
  },
  //   icon: {
  //     marginRight: 5,
  //   },
  //   placeholderStyle: {
  //     fontSize: 16,
  //   },
  //   selectedTextStyle: {
  //     fontSize: 16,
  //   },
  //   iconStyle: {
  //     width: 20,
  //     height: 20,
  //   },
  //   inputSearchStyle: {
  //     height: 40,
  //     fontSize: 16,
  //   },
});
