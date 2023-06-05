import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import {globalColors} from '../../theme/globalColors';
import {Header} from '../../Components/Common/Header';
import Regex from '../../utils/validation';
import Toast from 'react-native-simple-toast';

import Icons from 'react-native-vector-icons/MaterialIcons';

export default function ForgotPassword(props) {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtp, setIsOpt] = useState(false);

  const resendOTP = () => {
    if (!Regex.validateMobile(mobile)) {
      Toast.show('Please enter a valid mobile number.', Toast.LONG);
      setIsOpt(false);
      return;
    }
    setIsOpt(true);
  };
  const handleSubmit = () => {
    if (!Regex.validateMobile(mobile)) {
      Toast.show('Please enter a valid mobile number.', Toast.LONG);
      return;
    }

    setIsOpt(true);
  };
  const validateOtp = () => {
    if (!Regex.validateOTP(otp)) {
      Toast.show('Please enter a valid OTP.', Toast.LONG);
      return;
    }
    navigation.navigate('resetpassword');
  };

  return (
    <>
      <Header backEnable title="Forgot Password" navProps={props} />
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Icons
            style={{marginTop: 13, paddingLeft: 5}}
            name="phone-android"
            size={22}
            color={globalColors.card}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Mobile Number"
            value={mobile}
            placeholderTextColor={globalColors.grey}
            onChangeText={mobile => setMobile(mobile)}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        <TouchableOpacity style={styles.otp} onPress={resendOTP}>
          <Text style={styles.otpText}>Resend OTP?</Text>
        </TouchableOpacity>
        {isOtp && (
          <View>
            <OTPTextInput
              tintColor={globalColors.primaryTheme}
              color={globalColors.primaryTheme}
              handleTextChange={text => setOtp(text)}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={isOtp ? validateOtp : handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

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
    width: '80%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#505050',
    display: 'flex',
    flexDirection: 'row',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
  },
  otpText: {
    height: 30,
    color: globalColors.card,
  },
  otp: {
    alignSelf: 'flex-end',
    marginHorizontal: 40,
  },
  submitButton: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: globalColors.card,
  },
  submitText: {
    color: globalColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
