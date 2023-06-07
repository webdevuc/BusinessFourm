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
import {RNToasty} from 'react-native-toasty';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../actions/ForgotPassword';
import Spinner from 'react-native-loading-spinner-overlay';

export default function ForgotPassword(props) {
  const forgotLoading = useSelector(state => state.forgotPassword.loading);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [mobile_no, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtp, setIsOpt] = useState(false);

  const resendOTP = () => {
    if (!Regex.validateMobile(mobile_no)) {
      RNToasty.Error({
        title: 'Please enter a valid mobile number.',
        position: 'bottom',
      });
      setIsOpt(false);
      return;
    }
    setIsOpt(true);
  };
  const handleSubmit = async () => {
    if (!Regex.validateMobile(mobile_no)) {
      RNToasty.Error({
        title: 'Please enter a valid mobile number.',
        position: 'bottom',
      });
      return;
    }

    dispatch(forgotPassword(mobile_no, setIsOpt));

    // try {
    //   const response = await axios.post(
    //     'https://ibf.instantbusinesslistings.com/api/forgot-password',
    //     {mobile_no},
    //   );
    //   if (response.data.message == 'Given Mobile Number was invalid') {
    //     RNToasty.Error({
    //       title: response.data.message,
    //       position: 'bottom',
    //     });
    //   } else {
    //     setIsOpt(true);
    //     RNToasty.Success({
    //       title: response.data.message,
    //       position: 'bottom',
    //     });
    //   }

    //   reactotron.log('Response:', response.data.message);
    // } catch (error) {
    //   reactotron.error('Error:', error);
    // }
  };
  const validateOtp = async () => {
    if (!Regex.validateOTP(otp)) {
      RNToasty.Error({
        title: 'Please enter a valid OTP',
        position: 'bottom',
      });
      return;
    }
    const payload = {
      mobile_no: mobile_no,
      otp: otp,
    };

    try {
      const res = await axios.post(
        'https://ibf.instantbusinesslistings.com/api/confirm-otp',
        payload,
      );
      if (res.data.status == 422) {
        RNToasty.Error({
          title: 'incorrect OTP',
          position: 'bottom',
        });
      }
      if (res.data.status == 200) {
        RNToasty.Success({
          title: 'OTP Confirmed',
          position: 'bottom',
        });
        navigation.navigate('resetpassword', {mobile_no: mobile_no, otp: otp});
      }
    } catch (error) {
      reactotron.error('Error:', error);
    }
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
            value={mobile_no}
            placeholderTextColor={globalColors.grey}
            onChangeText={mobile => setMobile(mobile)}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        <TouchableOpacity style={styles.otp} onPress={handleSubmit}>
          <Text style={styles.otpText}>Resend OTP?</Text>
        </TouchableOpacity>
        {forgotLoading ? (
          <Spinner visible={forgotLoading} color={globalColors.card} />
        ) : (
          isOtp && (
            <View>
              <OTPTextInput
                tintColor={globalColors.card}
                color={globalColors.card}
                handleTextChange={text => setOtp(text)}
              />
            </View>
          )
        )}

        {!isOtp ? (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={validateOtp}>
            <Text style={styles.submitText}>validate OTP</Text>
          </TouchableOpacity>
        )}
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
