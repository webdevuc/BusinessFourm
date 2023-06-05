import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LogOut from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import { userLogout } from '../../actions/UserActions';




// const CustomSidebarMenu = ({navigation,...props}) => {
  const CustomSidebarMenu = (props) => {

    const dispatch = useDispatch();

  const navigation = useNavigation();
  const userRes = useSelector(state => state?.user?.data?.data?.token);
  const data1 = useSelector(state => state);

  const userRole = useSelector(state => state?.user?.data?.data?.user.role);
  const [token, setToken] = useState(userRes);



  const apiLogout=async()=>{
    const data = await axios.post(
      'https://ibf.instantbusinesslistings.com/api/logout',
      null,
      {
        headers: 
        {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${userRes}`, // notice the Bearer before your token
        },
      }
      );

      dispatch(userLogout())

      reactotron.log("data--------------------",data1)
   
      navigateToOtherPage()
     
  }

// const handleLogout = async () =>{
//   // apiLogout();
//   ()=>navigation.navigate('Login')
  
// }


const navigateToOtherPage = () => {
  // const navigation = useNavigation();
  navigation.navigate('Login');
};
 
  // const logOut = () => {};
  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        style={styles.sideMenuProfileIcon}
        source={require('../../assets/mainLogo.jpg')}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          borderBottomColor: '#f0f0f0',
          borderBottomWidth: 2,
        }}
      />
      <TouchableOpacity
        style={styles.customItem}
        // onPress={() => navigation.navigate('Login')}
        onPress={apiLogout}
        >
        <LogOut name="logout" size={20} color="red" />
        <Text style={{color: 'red', marginLeft: 4}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    marginVertical: 20,
    resizeMode: 'center',
    width: 120,
    height: 120,
    borderRadius: 70,
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
});

export default CustomSidebarMenu;
