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
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/UserActions';
import Toast from 'react-native-simple-toast';
import { isEmpty } from '../../utils/isEmpty';
import Regex from '../../utils/validation';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import { RNToasty } from 'react-native-toasty';




export default function Register(props) {



  

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [gst, setGst] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');



  const [asycData, setAsycData] = useState([]);

  const getData = async () => {
    const response = await axios.get('https://ibf.instantbusinesslistings.com/api/business-category-registration');
  

    reactotron.log("RESPONSE->"+JSON.stringify(response.data?.business_category))

    const data = response.data.business_category.map((item) => ({
      label: item.business_category_name,
      value: item.id,

    }))
  reactotron.log("DAATATATAT------>"+ JSON.stringify(data))
    setAsycData(data);
  };



  useEffect(() => {
    getData();
  }, []);



const handleRegister = () => {




  if (isEmpty(name)) {
    // Toast.show('Please enter a Name.', Toast.LONG);
    RNToasty.Error({
      title: "Please enter a Name",
      position: 'bottom',
      duration:1
    });
    return;
  }

  if (!Regex.validateEmail(email)) {
    // Toast.show('Please enter a valid email.', Toast.LONG);
    RNToasty.Error({
      title: "Please enter a valid email.",
      position: 'bottom',
      duration:1
    });
    return;
  }

  if (!Regex.validateMobile(mobile)) {
    // Toast.show('Please enter a valid mobile number.', Toast.LONG);
    RNToasty.Error({
      title: "Please enter a valid mobile number.",
      position: 'bottom',
      duration:1
    });
    return;
  }

  if (isEmpty(businessName)) {
    // Toast.show('Please enter a name of business.', Toast.LONG);
    RNToasty.Error({
      title: "Please enter a name of business.",
      position: 'bottom',
      duration:1
    });

    return;
  }

  if (isEmpty(category)) {
    // Toast.show('Select Business category.', Toast.LONG);
    RNToasty.Error({
      title: "Select Business category.",
      position: 'bottom',
      duration:1
    });
  
    return;
  }

  if (isEmpty(city)) {
    // Toast.show('Please enter a city.', Toast.LONG);
    RNToasty.Error({
      title: "Please enter a city.",
      position: 'bottom',
      duration:1
    });
  
    return;
  }

  if (isEmpty(address)) {
    // Toast.show('Please enter a address.', Toast.LONG);
    RNToasty.Error({
      title: "Please enter a address.",
      position: 'bottom',
      duration:1
    });
    return;
  }


  if (isEmpty(password)) {
    // Toast.show('Please enter password .', Toast.LONG);
    RNToasty.Error({
      title: "Please enter password .",
      position: 'bottom',
      duration:1
    });
    return
  }

  if (password !== confirmPassword) {
    // Toast.show('Passwords do not match .', Toast.LONG);

    RNToasty.Error({
      title: "Passwords do not match .",
      position: 'bottom',
      duration:1
    });
    return
    
  } 

  dispatch(registerUser({


    name:name,
    email:email,
    password:password,
    password_confirmation:confirmPassword,
    mobile_no:mobile,
    name_of_business:businessName,
    business_category:category,
    city:city,
    address:address,
    gst:gst

  }))


  // if(errorToast?.error_message){
  //   Toast.show(errorToast.error_message, Toast.LONG);
  // }
  navigation.navigate("Login")
}

// const handleInputChange = (text) => {
//   setName(text);
// };

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

const handleInputChange = (text) => {
  setName(text);

  // Perform your validation logic here
  if (text === '') {
    setIsError(true);
  } else {
    setIsError(false);
  }
};


const handleEmail = (text) =>{
  setEmail(text)
  if(text === ''){
    setIsErrorEmail(true)
  }else{
    setIsErrorEmail(false)
  }
}

const handleMobileNumber = (text) =>{
  setMobile(text)
  if (text === '') {
    setIsErrorM(true);
  } else {
    setIsErrorM(false);
  }
}

const handleBusiness = (text) =>{
  setBusinessName(text)
  if (text === '') {
    setIsErrorB(true);
  } else {
    setIsErrorB(false);
  }
}

const handleChangeCity = (text) =>{
  setCity(text)
  if (text === '') {
    setIsErrorC(true);
  } else {
    setIsErrorC(false);
  }
}

const handleChangeAddress = (text) =>{
  setAddress(text)
  if (text === '') {
    setIsErrorA(true);
  } else {
    setIsErrorA(false);
  }
}

const handlePassword = (text) =>{
  setPassword(text)
  if (text === '') {
    setIsErrorP(true);
  } else {
    setIsErrorP(false);
  }
}

const handleConfirmPass = (text) =>{
  setConfirmPassword(text)
  if (text === '') {
    setIsErrorCP(true);
  } else {
    setIsErrorCP(false);
  }
}

const handleDropdown = (item) =>{
  setCategory(item.value);
  if (item === '') {
    setIsErrorBC(true);
  } else {
    setIsErrorBC(false);
  }
}

const handleChangeGSTNo = (text) =>{
  setGst(text)
  if (text === '') {
    setIsErrorGst(true);
  } else {
    setIsErrorGst(false);
  }
}

 
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
            <Text style={{color:'red'}}>{isError ? <Text>Name is required</Text>: ''}</Text>
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
            <Text style={{color:'red'}}>{isErrorEmail ? <Text>Email is required</Text>: ''}</Text>
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
             <Text style={{color:'red'}}>{isErrorM ? <Text>Mobile no is required</Text>: ''}</Text>
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
             <Text style={{color:'red'}}>{isErrorB ? <Text>Business is required</Text>: ''}</Text>
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
          
          <Text style={{color:'red'}}>{isErrorBC ? <Text>required</Text>: ''}</Text>


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
            <Text style={{color:'red'}}>{isErrorGst ? <Text>GST no. is required</Text>: ''}</Text>
          </View>


          <View style={[styles.inputView, ]}>
            <TextInput
               style={[styles.TextInput, isErrorC && styles.redTextInput]}
              value={city}
              placeholder="City"
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeCity}
              // onChangeText={city => setCity(city)}
            />
             <Text style={{color:'red'}}>{isErrorC ? <Text>City is required</Text>: ''}</Text>
          </View>

          <View style={[styles.inputView]}>
            <TextInput
               style={[styles.TextInput, isErrorA && styles.redTextInput]}
              value={address}
              placeholder="Address"
              placeholderTextColor={globalColors.grey}
              onChangeText={handleChangeAddress}
              // onChangeText={address => setAddress(address)}
            />
            <Text style={{color:'red'}}>{isErrorA ? <Text>Address is required</Text>: ''}</Text>
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
            <Text style={{color:'red'}}>{isErrorP ? <Text>Password is required</Text>: ''}</Text>
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
            <Text style={{color:'red'}}>{isErrorCP ? <Text>Confirm Password is required</Text>: ''}</Text>
          </View>

          <Text style={styles.errorMessage}>{errorMessage}</Text>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
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
        {/* <View style={{height: 130, justifyContent: 'flex-end'}}>
          <ImageBackground
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'flex-end',
              backgroundColor: '#fff',
              marginTop: 0,
            }}
            source={require('../../assets/Bottom-Design.png')}
            resizeMode="stretch"></ImageBackground>
        </View> */}
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
