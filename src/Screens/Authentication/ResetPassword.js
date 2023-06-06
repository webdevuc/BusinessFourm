import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Header} from '../../Components/Common/Header';
import Toast from 'react-native-simple-toast';
import {globalColors} from '../../theme/globalColors';
import Icons from 'react-native-vector-icons/MaterialIcons';
import reactotron from 'reactotron-react-native';
import {RNToasty} from 'react-native-toasty';
import axios from 'axios';

export default function ResetPassword(props) {
  const mobile_no = props?.route?.params?.mobile_no;
  const otp = props?.route?.params?.otp;
  reactotron.log('mobile--', mobile_no);
  reactotron.log('otp--', otp);

  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setComfirmPassword] = useState('');
  const resetPassword = async () => {
    if (password.length < 6) {
      RNToasty.Error({
        title: 'Password must be of 6 or more characters',
        position: 'bottom',
      });
    } else if (confirmPassword.length < 6) {
      RNToasty.Error({
        title: 'Confirm password must be of 6 or more characters',
        position: 'bottom',
      });
    } else if (confirmPassword != password) {
      RNToasty.Error({
        title: 'Password & confirm password does not match',
        position: 'bottom',
      });
    } else {
      const payload = {
        mobile_no: mobile_no,
        otp: otp,
        password: password,
        password_confirmation: confirmPassword,
      };

      try {
        const resopnse = await axios.post(
          'https://ibf.instantbusinesslistings.com/api/change-password',
          payload,
        );

        RNToasty.Success({
          title: resopnse.data.message,
          position: 'bottom',
        });
        navigation.navigate('Login');
      } catch (error) {
        reactotron.error('Error:============', error);
      }
      // navigation.navigate('Login');
    }
  };
  return (
    <>
      <Header title="Reset Password" navProps={props} backEnable />
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.inputView}>
          <Icons
            style={{marginTop: 13, paddingLeft: 5}}
            name="lock"
            size={22}
            color={globalColors.card}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="New Password"
            value={password}
            placeholderTextColor={globalColors.textGrey}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            maxLength={20}
          />
        </View>
        <View style={styles.inputView}>
          <Icons
            style={{marginTop: 13, paddingLeft: 5}}
            name="lock"
            size={22}
            color={globalColors.card}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm New Password"
            value={confirmPassword}
            placeholderTextColor={globalColors.textGrey}
            secureTextEntry={true}
            onChangeText={password => setComfirmPassword(password)}
            maxLength={20}
          />
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
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
    marginVertical: 5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
  },

  resetButton: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: globalColors.card,
  },
  resetButtonText: {
    color: globalColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
