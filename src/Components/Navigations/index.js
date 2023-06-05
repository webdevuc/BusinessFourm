import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator';
import UserNavigator from './UserNavigator';
import {useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigator} from './AllStack/AllStack';
import Login from '../../Screens/Authentication/Login';

export function RootNavigator() {
  const userRes = useSelector(state => state?.user?.data?.data?.token);
  const userRole = useSelector(state => state?.user?.data?.data?.user.role);

  const [isLogged, setIsLogged] = useState(false);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
