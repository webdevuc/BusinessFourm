import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../Screens/Authentication/Login';
import Register from '../../Screens/Authentication/Register';
import ForgotPassword from '../../Screens/Authentication/ForgotPassword';
import ResetPassword from '../../Screens/Authentication/ResetPassword';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        drawerActiveTintColor: '#108484',
        itemStyle: {marginVertical: 5},
        headerShadowVisible: false,
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: '#006666',
      })}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name="resetpassword"
        component={ResetPassword}
        options={{headerShown: false, title: ''}}
      />
      {/* <Stack.Screen
        name="addLeads"
        component={ResetPassword}
        options={{headerShown: false, title: ''}}
      /> */}
    </Stack.Navigator>
  );
}

export {AuthNavigator};
