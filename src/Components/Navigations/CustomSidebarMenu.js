import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LogOut from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import {userLogout} from '../../actions/UserActions';
import SocialIcon from 'react-native-vector-icons/Entypo';
import {fb} from '../../utils/constan';

// const CustomSidebarMenu = ({navigation,...props}) => {
const CustomSidebarMenu = props => {
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const userRes = useSelector(state => state?.user?.data?.data?.token);
  const data1 = useSelector(state => state);

  const userRole = useSelector(state => state?.user?.data?.data?.user.role);
  const [token, setToken] = useState(userRes);

  const apiLogout = async () => {
    setLoader(true);
    const data = await axios.post(
      'https://ibf.instantbusinesslistings.com/api/logout',
      null,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userRes}`, // notice the Bearer before your token
        },
      },
    );

    dispatch(userLogout());

    reactotron.log('data--------------------', data1);

    setLoader(false);
    navigateToOtherPage();
  };

  // const handleLogout = async () =>{
  //   // apiLogout();
  //   ()=>navigation.navigate('Login')

  // }

  const navigateToOtherPage = () => {
    // const navigation = useNavigation();
    navigation.navigate('Login');
  };

  // const logOut = () => {};

  const openLink = async url => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      reactotron.log('Error opening the link:', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {loader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000FF" />
        </View>
      )}

      <Image
        style={styles.sideMenuProfileIcon}
        source={require('../../assets/drawerLogo.png')}
      />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => openLink(fb)}>
          <View style={[{alignItems: 'center'}]}>
            <SocialIcon name="facebook" size={30} color="#1773ea" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[{alignItems: 'center'}]}>
            <SocialIcon name="instagram" size={30} color="#d62976" />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: '#f0f0f0',
          borderBottomWidth: 2,
        }}
      />

      <TouchableOpacity
        style={styles.customItem}
        // onPress={() => navigation.navigate('Login')}
        onPress={apiLogout}>
        <LogOut name="logout" size={20} color="red" />
        <Text style={{color: 'red', marginLeft: 4}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    marginVertical: 20,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcons: {
    // display: 'flex',
    flexDirection: 'row',
    // flex: 1,
    // flexWrap: 'wrap',
    gap: 30,
    marginVertical: 10,
    justifyContent: 'center',
  },
});

export default CustomSidebarMenu;
