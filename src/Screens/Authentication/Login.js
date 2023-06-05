import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../../theme/globalColors';
import Toast from 'react-native-simple-toast';
import Regex from '../../utils/validation';
import { loginUser } from '../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import reactotron from 'reactotron-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { RNToasty } from 'react-native-toasty';

// IonIcon.loadFont();
export default function Login() {
  const errorToast = useSelector(state => state?.user?.data?.data?.user?.role);

  reactotron.log("role--------role-->", errorToast)

  const navigation = useNavigation();
  const [mobile, setMobile] = useState('9372524455');
  const [password, setPassword] = useState('9372524455');
  const [show, setShow] = useState(false);

  const [errorNumber, setErrorNumber] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false);


  const handleRegister = () =>{
    navigation.navigate('register')
  }


  const handleMobileNumber = (text) =>{
    setMobile(text)

    if(text === ''){
      setErrorNumber(true)
    }else{
      setErrorNumber(false)
    }
  }

  const handlePassword = (text) =>{
    setPassword(text)
    if(text === ''){
      setErrorPassword(true)
    }else{
      setErrorPassword(false)
    }
  }

  const dispatch = useDispatch();

  const handleLogin = async () => {
    
    if (!Regex.validateMobile(mobile)) {
      // Toast.show('Please enter a valid mobile number.', Toast.LONG);
      RNToasty.Error({
        title: "Please enter a valid mobile number",
        position: 'bottom',
        duration:1
      });
    } else if (password.length < 6) {
      // Toast.show('Password must be of 6 or more characters.', Toast.LONG);
      RNToasty.Error({
        title: "Password must be of 6 or more characters.",
        position: 'bottom',
        duration:1
      });
    } else {
      dispatch(
        loginUser({
          mobile_no: mobile,
          password: password,
        },navigation)
        );
        // navigation.navigate('DashboardAdmin')

       

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);



      if(errorToast?.error_message){
        Toast.show(errorToast.error_message, Toast.LONG);
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.authCard}>
          <Text style={styles.signText}>Sign In</Text>
          <StatusBar style="auto" />
          <View style={{alignItems:'center'}}>
          <View style={styles.inputView}>
            <Icons
              style={styles.searchIcon}
              name="phone-android"
              size={22}
              color={globalColors.card}
            />
            <TextInput
              // style={styles.TextInput}
              style={[styles.TextInput, errorNumber && styles.redTextInput]}
              placeholder="Mobile Number"
              value={mobile}
              placeholderTextColor={globalColors.grey}
              // onChangeText={mobile => setMobile(mobile)}
              onChangeText={handleMobileNumber}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          </View>
          <Text style={{color:'red',paddingLeft:35}}>{errorNumber ? <Text>Number is required</Text>: ''}</Text>
          
          <View style={{alignItems:'center'}}>
          <View style={styles.inputView}>
            <Icons
              style={styles.searchIcon}
              name="lock"
              size={22}
              color={globalColors.card}
            />
            <TextInput
              style={[styles.TextInput, errorPassword && styles.redTextInput]}
              placeholder="Password"
              value={password}
              secureTextEntry={show ? false : true}
              // onChangeText={password => setPassword(password)}
              onChangeText={handlePassword}
              placeholderTextColor={globalColors.grey}
              
            />
            <IonIcon
              name={show ? 'eye' : 'eye-off'}
              size={22}
              color={globalColors.card}
              onPress={() => setShow(!show)}
            />
          </View>
          </View>

 
          <Text style={{color:'red',paddingLeft:35}}>{errorPassword ? <Text>Password is required</Text>: ''}</Text>
        
          {/* <View style={styles.loginBtn}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}

          {/* <View
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
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={{color: globalColors.primaryTheme}}>Sign In</Text>
            </TouchableOpacity>
          </View> */}
   <View style={{alignItems:'center'}}>

          <TouchableOpacity
            onPress={() => navigation.navigate('forgotpassword')}
            style={{
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>

          <Spinner visible={isLoading} />


          <View style={{marginTop: 15, display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: globalColors.grey}}>Not a member?</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text
                style={{color: globalColors.card, marginHorizontal: 5}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          </View>
          </View>

        </View>


      {/* <View style={{height: 130}}>
        <ImageBackground
          style={{
            height: '100%',
            width: '100%',
            marginTop: 0,
            backgroundColor: '#fff',
          }}
          source={require('../../assets/Bottom-Design.png')}
          resizeMode="stretch"></ImageBackground>
      </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: globalColors.card,
    justifyContent: 'center',
  },
  authCard: {
    backgroundColor: globalColors.white,
    height: 440,
    width: '88%',
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  signText: {
    color: globalColors.card,
    fontSize: RFValue(25),
    padding: RFValue(25),
    fontWeight: 'bold',
  },
  image: {
    marginBottom: 40,
    width: 120,
    height: 120,
    borderRadius: 70,
  },
  inputView: {
    backgroundColor: globalColors.white,
    width: '80%',
    // height: 50,
    justifyContent: 'center',
    borderWidth: 0,
    border: 'none',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,   
  },
  redTextInput: {
    borderColor: 'red',
  },
  forgotPassword: {
    height: 30,
    color: globalColors.card,
    marginHorizontal: 40,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
   
    backgroundColor: globalColors.card,
  },
  loginText: {
    color: globalColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
