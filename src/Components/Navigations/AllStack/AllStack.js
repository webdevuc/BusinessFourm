import {TouchableOpacity} from 'react-native';

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../../Screens/Authentication/Login';
import Register from '../../../Screens/Authentication/Register';
import ForgotPassword from '../../../Screens/Authentication/ForgotPassword';
import ResetPassword from '../../../Screens/Authentication/ResetPassword';

import AdminNavigator from '../AdminNavigator';
import Menu from 'react-native-vector-icons/MaterialIcons';
import UserNavigator from '../UserNavigator';

import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import AuthNavigator from '../AuthNavigator';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();

export const StackNavigator = ({navigation}) => {
  const userRes = useSelector(state => state?.user?.data?.data?.token);
  const userRole = useSelector(state => state?.user?.data?.data?.user.role);

  return (
    <Stack.Navigator>
       {!userRes ? (
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Menu
                  name="menu"
                  color="#fff"
                  size={30}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            ),
          }}
        />
      ) : userRole === 'admin' ? ( // Check if the user's role is 'admin'
        <Stack.Screen
          name="DashboardAdmin"
          component={AdminNavigator}
          options={{
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Menu
                  name="menu"
                  color="#fff"
                  size={30}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            ),
          }}
        />
      ) : (
        // User role is not 'admin', so it is assumed to be a regular user
        <Stack.Screen
          name="UserNavigator"
          component={UserNavigator}
          options={{
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Menu
                  name="menu"
                  color="#fff"
                  size={30}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            ),
          }}
        />
      )}
    </Stack.Navigator>
  );
};
